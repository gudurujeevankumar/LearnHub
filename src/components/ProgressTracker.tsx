
import { Trophy, Target, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  courses: Array<{
    id: number;
    title: string;
    progress: number;
  }>;
}

const ProgressTracker = ({ courses }: ProgressTrackerProps) => {
  const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).length;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-12 text-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Your Learning Progress</h3>
        <Trophy className="w-8 h-8 text-yellow-300" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{Math.round(totalProgress)}%</div>
          <div className="text-indigo-200">Overall Progress</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{completedCourses}</div>
          <div className="text-indigo-200">Completed Courses</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{inProgressCourses}</div>
          <div className="text-indigo-200">In Progress</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-indigo-200">Overall Completion</span>
          <span className="font-medium">{Math.round(totalProgress)}%</span>
        </div>
        <Progress value={totalProgress} className="h-3 bg-indigo-500/30" />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>Keep going! You're doing great!</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>7 days streak</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
