import React, { useRef, useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  hasQuiz: boolean;
  videoUrl: string;
}

interface VideoPlayerProps {
  course?: any;
  onQuizStart?: (lesson: Lesson) => void;
  onBackToDashboard?: () => void;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Introduction to Variables',
    duration: '8:32',
    completed: true,
    hasQuiz: true,
    videoUrl: 'https://youtu.be/7xStNKTM3bE?si=3Mzmo2X5bL7Hf2OW', 
  },
  {
    id: 2,
    title: 'Functions and Scope',
    duration: '12:45',
    completed: true,
    hasQuiz: true,
    videoUrl: 'https://youtu.be/9ae4-qniqZk?si=iFBkY6YX-u5NJ9oM', 
  },
  {
    id: 3,
    title: 'Arrays and Objects',
    duration: '15:20',
    completed: false,
    hasQuiz: true,
    videoUrl: 'https://youtu.be/w9078dAjcrY?si=Y-cujoa1HMexPa7g', // Placeholder
  },
  {
    id: 4,
    title: 'DOM Manipulation',
    duration: '18:15',
    completed: false,
    hasQuiz: true,
    videoUrl: 'https://youtu.be/WjxQRfZfZnw?si=ZH0WcKopt2EeCesU', // Placeholder
  },
];

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onQuizStart = () => {},
  onBackToDashboard = () => {},
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentLesson = lessons[selectedLessonIndex];

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleLessonChange = (index: number) => {
    setSelectedLessonIndex(index);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const isYouTubeUrl =
    currentLesson.videoUrl.includes('youtube.com') || currentLesson.videoUrl.includes('youtu.be');

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{currentLesson.title}</h2>
        <p className="text-sm text-gray-500">
          Lesson {selectedLessonIndex + 1} of {lessons.length} • {currentLesson.duration}
        </p>
      </div>

      <div className="aspect-video bg-black rounded overflow-hidden">
        {isYouTubeUrl ? (
          <iframe
            src={getYouTubeEmbedUrl(currentLesson.videoUrl)}
            title={currentLesson.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={currentLesson.videoUrl}
            controls
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}
      </div>

      {!isYouTubeUrl && (
        <div className="mt-4 text-sm text-gray-600">
          {Math.floor(currentTime / 60)}:
          {String(Math.floor(currentTime % 60)).padStart(2, '0')} / {currentLesson.duration}
        </div>
      )}

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold">Lessons</h3>
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => handleLessonChange(index)}
            className={`block w-full text-left px-4 py-2 rounded ${
              index === selectedLessonIndex
                ? 'bg-indigo-100 text-indigo-800 font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            {index + 1}. {lesson.title}
          </button>
        ))}
      </div>

      {currentLesson.hasQuiz && (
        <div className="mt-6">
          <button
            onClick={() => onQuizStart(currentLesson)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Take Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;