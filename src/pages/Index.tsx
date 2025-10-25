import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Trophy, BookOpen, Globe, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Powered by Gamification & AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              RuralXplorar
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Gamified Learning Platform for Rural Education
            </p>
            
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80">
              Offline-first PWA with interactive quizzes, leaderboards, and multilingual support. 
              Learn STEM subjects anytime, anywhere - even without internet!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-elegant"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                {user ? 'Go to Dashboard' : 'Get Started'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why RuralXplorar?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for rural areas with limited connectivity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-elegant transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-gradient-hero rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Offline-First</h3>
              <p className="text-muted-foreground">
                Works perfectly without internet. All content cached locally for uninterrupted learning.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-gradient-success rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="h-10 w-10 text-success-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Gamified Learning</h3>
              <p className="text-muted-foreground">
                Earn points, compete on leaderboards, and unlock achievements as you learn.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-secondary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-10 w-10 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multilingual</h3>
              <p className="text-muted-foreground">
                Support for multiple languages with voice-based lessons for better accessibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Three Ways to Engage</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a student, teacher, or admin - we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-card hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Students</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access courses and lessons</li>
                  <li>• Take interactive quizzes</li>
                  <li>• Track your progress</li>
                  <li>• Compete on leaderboards</li>
                  <li>• Earn points and badges</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="bg-secondary/10 p-3 rounded-xl w-fit mb-4">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Teachers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Monitor student progress</li>
                  <li>• View detailed analytics</li>
                  <li>• Identify weak topics</li>
                  <li>• Create personalized support</li>
                  <li>• Track quiz performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="bg-accent/10 p-3 rounded-xl w-fit mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Admins</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full platform control</li>
                  <li>• Manage users and roles</li>
                  <li>• Create/edit courses</li>
                  <li>• Configure settings</li>
                  <li>• System-wide analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-hero text-primary-foreground rounded-3xl p-12 shadow-elegant">
          <h2 className="text-4xl font-bold mb-6">Start Your Learning Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students transforming rural education through gamified learning
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 RuralXplorar. Built for Smart India Hackathon 2025.</p>
          <p className="mt-2 text-sm">Bridging the digital divide through innovative education technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
