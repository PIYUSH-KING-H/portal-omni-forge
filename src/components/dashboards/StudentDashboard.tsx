import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, BookOpen, Target, LogOut, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [myStats, setMyStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, leaderboardRes, statsRes] = await Promise.all([
        supabase.from('courses').select('*').eq('is_active', true).limit(6),
        supabase.from('leaderboard').select('*, profiles(full_name)').order('total_points', { ascending: false }).limit(10),
        supabase.from('leaderboard').select('*').eq('user_id', profile?.id).single(),
      ]);

      if (coursesRes.data) setCourses(coursesRes.data);
      if (leaderboardRes.data) setLeaderboard(leaderboardRes.data);
      if (statsRes.data) setMyStats(statsRes.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name}!</h1>
              <p className="opacity-90 mt-1">Continue your learning journey</p>
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
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{myStats?.total_points || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep earning more!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <Award className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{myStats?.total_courses_completed || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Great progress!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
              <Target className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{myStats?.total_quizzes_completed || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{myStats?.streak_days || 0} days</div>
              <p className="text-xs text-muted-foreground mt-1">Don't break it!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Available Courses
              </h2>
              {courses.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No courses available yet. Check back soon!</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="shadow-card hover:shadow-elegant transition-all cursor-pointer group">
                      <CardHeader>
                        <div className="aspect-video bg-gradient-card rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{course.subject}</span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                            {course.difficulty_level}
                          </span>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-hero">Start Learning</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                Top Learners
              </h2>
              <Card className="shadow-card">
                <CardContent className="p-0">
                  {leaderboard.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No leaderboard data yet. Be the first to earn points!
                    </div>
                  ) : (
                    <div className="divide-y">
                      {leaderboard.map((entry, index) => (
                        <div key={entry.id} className="p-4 flex items-center gap-4 hover:bg-accent/5 transition-colors">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                            index === 0 ? 'bg-accent text-accent-foreground' :
                            index === 1 ? 'bg-secondary text-secondary-foreground' :
                            index === 2 ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{entry.profiles?.full_name || 'Unknown'}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.total_quizzes_completed} quizzes • {entry.total_courses_completed} courses
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{entry.total_points}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
