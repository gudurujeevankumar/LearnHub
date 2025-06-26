
import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface QuizProps {
  lesson: any;
  onComplete: () => void;
}

const Quiz = ({ lesson, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var myVariable = 'Hello';",
        "variable myVariable = 'Hello';",
        "v myVariable = 'Hello';",
        "declare myVariable = 'Hello';"
      ],
      correct: 0,
      explanation: "The 'var' keyword is used to declare variables in JavaScript. You can also use 'let' or 'const' in modern JavaScript."
    },
    {
      id: 2,
      question: "Which of these is NOT a valid JavaScript data type?",
      options: [
        "string",
        "number",
        "boolean",
        "character"
      ],
      correct: 3,
      explanation: "JavaScript has string, number, boolean, object, undefined, and null data types, but not a specific 'character' type."
    },
    {
      id: 3,
      question: "What will console.log(typeof 42) output?",
      options: [
        "integer",
        "number",
        "float",
        "numeric"
      ],
      correct: 1,
      explanation: "In JavaScript, all numbers are of type 'number', whether they are integers or floating-point numbers."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {percentage >= 70 ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
            
            <h2 className="text-3xl font-bold mb-2">
              {percentage >= 70 ? 'Congratulations!' : 'Good Effort!'}
            </h2>
            <p className="text-gray-600 text-lg">
              You scored {score} out of {questions.length} questions correctly
            </p>
          </div>
          
          <div className="mb-8">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{percentage}%</div>
            <Progress value={percentage} className="h-4 max-w-md mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-green-700">Correct Answers</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
              <div className="text-red-700">Incorrect Answers</div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {questions.map((question, index) => (
              <div key={question.id} className="text-left bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {selectedAnswers[index] === question.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{question.question}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {selectedAnswers[index] !== question.correct && (
                      <p className="text-sm text-green-700 mb-2">
                        Correct answer: {question.options[question.correct]}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border-l-4 border-blue-400">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4 justify-center">
            <Button
              onClick={handleRetry}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </Button>
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center space-x-2"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quiz: {lesson.title}</h1>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">Progress</div>
            <div className="text-lg font-semibold text-indigo-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </div>
          </div>
        </div>
        
        <Progress 
          value={((currentQuestion + 1) / questions.length) * 100} 
          className="h-2"
        />
      </div>
      
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          {currentQ.question}
        </h2>
        
        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Select an answer to continue
          </div>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
