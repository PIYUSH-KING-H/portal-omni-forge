import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Target, LogOut, TrendingDown, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [weakTopics, setWeakTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes, attemptsRes] = await Promise.all([
        supabase.from('profiles').select('*, leaderboard(*)').eq('role', 'student').order('created_at', { ascending: false }).limit(10),
        supabase.from('courses').select('*').eq('is_active', true),
        supabase.from('quiz_attempts').select('*, quizzes(title), profiles(full_name)').order('created_at', { ascending: false }).limit(20),
      ]);

      if (studentsRes.data) setStudents(studentsRes.data);
      if (coursesRes.data) setCourses(coursesRes.data);
      if (attemptsRes.data) {
        setQuizAttempts(attemptsRes.data);
        analyzeWeakTopics(attemptsRes.data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeWeakTopics = (attempts: any[]) => {
    const topicScores: { [key: string]: { total: number; count: number } } = {};
    
    attempts.forEach((attempt) => {
      const topic = attempt.quizzes?.title || 'Unknown';
      const scorePercentage = (attempt.score / attempt.total_points) * 100;
      
      if (!topicScores[topic]) {
        topicScores[topic] = { total: 0, count: 0 };
      }
      topicScores[topic].total += scorePercentage;
      topicScores[topic].count += 1;
    });

    const weak = Object.entries(topicScores)
      .map(([topic, data]) => ({
        topic,
        avgScore: data.total / data.count,
        attempts: data.count,
      }))
      .filter((item) => item.avgScore < 70)
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 5);

    setWeakTopics(weak);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalStudents = students.length;
  const totalCourses = courses.length;
  const avgScore = quizAttempts.length > 0 
    ? (quizAttempts.reduce((sum, a) => sum + (a.score / a.total_points * 100), 0) / quizAttempts.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
              <p className="opacity-90 mt-1">Welcome, {profile?.full_name}</p>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Active learners</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently running</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{avgScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">Across all quizzes</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
              <BarChart3 className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{quizAttempts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Recent attempts</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  Weak Topic Clustering
                </CardTitle>
                <CardDescription>Topics where students need more support</CardDescription>
              </CardHeader>
              <CardContent>
                {weakTopics.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No weak topics identified yet. More data needed for analysis.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {weakTopics.map((topic, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{topic.topic}</span>
                          <span className="text-sm text-muted-foreground">
                            {topic.attempts} attempts • {topic.avgScore.toFixed(1)}% avg
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-destructive transition-all"
                            style={{ width: `${topic.avgScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Student Overview</CardTitle>
                <CardDescription>Monitor student progress and performance</CardDescription>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No students enrolled yet.</p>
                ) : (
                  <div className="space-y-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/5 transition-colors">
                        <div>
                          <p className="font-semibold">{student.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.leaderboard?.[0]?.total_points || 0} points • 
                            {student.leaderboard?.[0]?.total_courses_completed || 0} courses completed
                          </p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Quiz Attempts</CardTitle>
                <CardDescription>Latest student quiz submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {quizAttempts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No recent quiz attempts.</p>
                ) : (
                  <div className="space-y-2">
                    {quizAttempts.slice(0, 10).map((attempt) => {
                      const scorePercentage = (attempt.score / attempt.total_points * 100).toFixed(0);
                      const passed = attempt.passed;
                      
                      return (
                        <div key={attempt.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/5 transition-colors">
                          <div className="flex-1">
                            <p className="font-semibold">{attempt.profiles?.full_name}</p>
                            <p className="text-sm text-muted-foreground">{attempt.quizzes?.title}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                              {scorePercentage}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {attempt.score}/{attempt.total_points} points
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
