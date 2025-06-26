
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Clock, Trophy, Target, TrendingUp, User } from 'lucide-react';

interface UserProfile {
  username: string;
  full_name: string;
  avatar_url: string;
}

interface UserProgress {
  course_id: string;
  lesson_id: string;
  completed: boolean;
  quiz_score: number;
  completed_at: string;
}

const PersonalizedDashboard = ({ onCourseSelect }: { onCourseSelect: (course: any) => void }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    averageScore: 0,
    streakDays: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    // Fetch progress
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    if (progressData) {
      setProgress(progressData);
      
      // Calculate stats
      const completedLessons = progressData.filter(p => p.completed).length;
      const quizScores = progressData.filter(p => p.quiz_score !== null).map(p => p.quiz_score);
      const averageScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
      const uniqueCourses = new Set(progressData.map(p => p.course_id)).size;

      setStats({
        totalCourses: uniqueCourses,
        completedLessons,
        averageScore,
        streakDays: 5 // Mock streak for demo
      });
    }
  };

  const courses = [
    {
      id: 'js-fundamentals',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400',
      lessons: 8,
      duration: '4 hours',
      level: 'Beginner',
      category: 'Programming'
    },
  ];

  const getProgressForCourse = (courseId: string) => {
    const courseProgress = progress.filter(p => p.course_id === courseId);
    const completed = courseProgress.filter(p => p.completed).length;
    const total = courses.find(c => c.id === courseId)?.lessons || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile?.avatar_url} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl">
              {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name|| 'Student'} ! 👋
            </h1>
            <p className="text-gray-600">Ready to continue your learning journey?</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedLessons}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Streak</p>
                <p className="text-2xl font-bold text-purple-600">{stats.streakDays} days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseProgress = getProgressForCourse(course.id);
            
            return (
              <Card 
                key={course.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onCourseSelect(course)}
              >
                <div className="aspect-video relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{courseProgress}%</span>
                    </div>
                    <Progress value={courseProgress} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {course.lessons} lessons • {progress.filter(p => p.course_id === course.id && p.completed).length} completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
