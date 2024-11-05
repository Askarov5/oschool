'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

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

export default function PreviewTest({ test }: PreviewTestProps) {
  const [answers, setAnswers] = useState<string[]>(Array(test.questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = test.questions.filter(
      (question, index) => question.answer === answers[index]
    ).length;
    setScore(correctAnswers);
    setSubmitted(true);
  };

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{test.title}</h1>
        <p className="text-lg mb-2">Grade: {test.grade}</p>
        <p className="text-lg mb-4">Level: {test.level}</p>
        <p className="text-lg mb-6">Subject: {test.subject}</p>

        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Results</h2>
            <p className="text-lg mt-2">
              You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{test.questions.length}</span>
            </p>
            <Button variant="outline" onClick={toggleReviewMode} className="mt-4">
              {reviewMode ? 'Hide Explanations' : 'Review Answers'}
            </Button>

            {reviewMode && (
              <div className="mt-6 space-y-4">
                {test.questions.map((question, index) => (
                  <div key={index} className={`border p-4 rounded-md ${answers[index] === question.answer ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-lg font-medium">{question.questionText}</p>
                    {question.type === 'multipleChoice' && question.options && (
                      <RadioGroup value={answers[index]} onValueChange={(value) => handleAnswerChange(index, value)} className="mt-2">
                        {question.options.map((option, idx) => (
                          <div key={idx} className="flex items-center mb-2">
                            <RadioGroupItem value={option} id={`review-question-${index}-option-${idx}`} className="mr-2" />
                            <label htmlFor={`review-question-${index}-option-${idx}`} className="cursor-pointer">{option}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    <p className="mt-2 text-sm">
                      Your answer: <strong>{answers[index]}</strong>
                    </p>
                    <p className="mt-2 text-sm">
                      Correct answer: <strong>{question.answer}</strong>
                    </p>
                    {question.explanation && (
                      <p className="mt-2 text-sm text-gray-600">
                        Explanation: {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {test.questions.map((question, index) => (
              <div key={index} className="border p-4 rounded-md bg-white shadow-sm">
                <p className="text-lg font-medium">{question.questionText}</p>

                {question.type === 'multipleChoice' && question.options && (
                  <RadioGroup value={answers[index]} onValueChange={(value) => handleAnswerChange(index, value)} className="mt-2">
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center mb-2">
                        <RadioGroupItem value={option} id={`question-${index}-option-${idx}`} className="mr-2" />
                        <label htmlFor={`question-${index}-option-${idx}`} className="cursor-pointer">{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'trueFalse' && (
                  <div className="mt-2">
                    <div className="flex mt-2 space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleAnswerChange(index, 'true')} 
                        className={`w-full ${answers[index] === 'true' ? 'bg-blue-100' : ''}`}>
                        True
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleAnswerChange(index, 'false')} 
                        className={`w-full ${answers[index] === 'false' ? 'bg-blue-100' : ''}`}>
                        False
                      </Button>
                    </div>
                  </div>
                )}

                {question.type === 'shortAnswer' && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="Your answer"
                      className="border rounded-md w-full p-2"
                    />
                  </div>
                )}
              </div>
            ))}

            <Button variant="default" onClick={handleSubmit} className="w-full mt-6">
              Submit Answers
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}