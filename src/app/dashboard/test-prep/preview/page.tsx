import PreviewTest from '@/components/tests/testPreview';

interface Question {
    id: number;
    type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
    questionText: string;
    options?: string[];
    answer: string;
    explanation?: string;
  }
  
  interface PreviewTestProps {
    test: {
      title: string;
      grade: string;
      level: string;
      subject: string;
      passRate: number;
      questions: Question[];
    };
  }

export default function TestPage() {
  // Example test data
  const test = {
    title: 'Math Quiz',
    grade: '3',
    level: 'beginner',
    subject: 'Mathematics',
    questions: [
      {
        id: 1,
        type: 'multipleChoice',
        questionText: 'What is 2 + 2?',
        options: ['1', '2', '3', '4'],
        answer: '4',
        explanation: '2 + 2 equals 4.',
      },
      {
        id: 2,
        type: 'trueFalse',
        questionText: 'Is the sky blue?',
        options: ['True', 'False'],
        answer: 'True',
        explanation: 'The sky appears blue during the day.',
      },
      // More questions...
    ],
  };

  return <PreviewTest test={test} />;
}
