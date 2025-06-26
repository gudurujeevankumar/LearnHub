
import { useState } from 'react';
import PersonalizedDashboard from '@/components/PersonalizedDashboard';
import VideoPlayer from '@/components/VideoPlayer';
import Quiz from '@/components/Quiz';
import Navigation from '@/components/Navigation';
import AuthGuard from '@/components/AuthGuard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'video' | 'quiz'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('video');
  };

  const handleQuizStart = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentView('quiz');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation 
          currentView={currentView} 
          onBackToDashboard={handleBackToDashboard}
          courseName={selectedCourse?.title}
        />
        
        <main className="pt-20">
          {currentView === 'dashboard' && (
            <PersonalizedDashboard onCourseSelect={handleCourseSelect} />
          )}
          
          {currentView === 'video' && selectedCourse && (
            <VideoPlayer 
              course={selectedCourse} 
              onQuizStart={handleQuizStart}
              onBackToDashboard={handleBackToDashboard}
            />
          )}
          
          {currentView === 'quiz' && selectedLesson && (
            <Quiz 
              lesson={selectedLesson} 
              onComplete={() => setCurrentView('video')}
            />
          )}
        </main>
      </div>
    </AuthGuard>
  );
};

export default Index;
