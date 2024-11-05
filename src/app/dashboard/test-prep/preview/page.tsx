import PreviewTest from '@/components/tests/testPreview';
import { ITest } from '@/lib/types';

export default function TestPage() {
  // Example test data
  const test: ITest = {
    title: 'Math Quiz',
    grade: '3',
    level: 'beginner',
    subject: 'Mathematics',
    passRate: 80,
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
