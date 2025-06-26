import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '@/components/CourseCard';
import ProgressTracker from '@/components/ProgressTracker';
import { Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      instructor: 'Sarah Johnson',
      duration: '8 hours',
      lessons: 24,
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400',
      description: 'Master the basics of JavaScript programming with hands-on exercises.',
      students: 1250,
      rating: 4.8,
      category: 'Programming'
    },
    {
      id: 2,
      title: 'React Development',
      instructor: 'Mike Chen',
      duration: '12 hours',
      lessons: 36,
      progress: 30,
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=400',
      description: 'Build modern web applications with React and its ecosystem.',
      students: 890,
      rating: 4.9,
      category: 'Programming'
    },
    {
      id: 3,
      title: 'Data Science Basics',
      instructor: 'Dr. Emily Rodriguez',
      duration: '15 hours',
      lessons: 45,
      progress: 10,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
      description: 'Introduction to data analysis, visualization, and machine learning.',
      students: 2100,
      rating: 4.7,
      category: 'Data Science'
    },
    {
      id: 4,
      title: 'Digital Marketing',
      instructor: 'Alex Thompson',
      duration: '10 hours',
      lessons: 28,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400',
      description: 'Learn modern digital marketing strategies and tools.',
      students: 1560,
      rating: 4.6,
      category: 'Marketing'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Courses Enrolled', value: '4', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Hours Learned', value: '28', icon: Clock, color: 'text-blue-600' },
    { label: 'Certificates', value: '2', icon: Users, color: 'text-purple-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, Student!
        </h2>
        <p className="text-gray-600 text-lg">
          Continue your learning journey and explore new courses
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracker */}
      <ProgressTracker courses={courses} />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => navigate(`/course/${course.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;