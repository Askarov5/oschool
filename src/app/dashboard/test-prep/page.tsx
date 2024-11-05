'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components//ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type QuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer';

interface Question {
    id: number;
    type: QuestionType;
    questionText: string;
    options?: string[];
    answer?: string;
    explanation?: string;
}

export default function CreateTest() {
    const [testTitle, setTestTitle] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [passRate, setPassRate] = useState<number | ''>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<QuestionType>('multipleChoice');
    const [options, setOptions] = useState<string[]>(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [answerExplanation, setAnswerExplanation] = useState('');

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: questions.length + 1,
            type: questionType,
            questionText,
            options: questionType === 'multipleChoice' ? options : undefined,
            answer: correctAnswer,
            explanation: answerExplanation,
        };
        setQuestions([...questions, newQuestion]);
        resetQuestionFields();
    };

    const resetQuestionFields = () => {
        setQuestionText('');
        setOptions(['', '']);
        setCorrectAnswer('');
        setAnswerExplanation('');
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveQuestion = (id: number) => {
        setQuestions(questions.filter((question) => question.id !== id));
    };

    const handleMoveQuestion = (id: number, direction: 'up' | 'down') => {
        const index = questions.findIndex((q) => q.id === id);
        if (direction === 'up' && index > 0) {
            const newQuestions = [...questions];
            [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
            setQuestions(newQuestions);
        } else if (direction === 'down' && index < questions.length - 1) {
            const newQuestions = [...questions];
            [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
            setQuestions(newQuestions);
        }
    };

    const handleSaveTest = () => {
        const test = {
            title: testTitle,
            grade: selectedGrade,
            level: selectedLevel,
            subject: selectedSubject,
            questions,
        };
        console.log('Test saved:', test);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8 bg-gray-50 rounded-lg shadow-md">
            <Card className='p-4'>
                <h1 className="text-3xl font-bold mb-6 text-center">Create a New Test</h1>

                {/* Test Title */}
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="testTitle">Test Title</Label>
                        <Input
                            id="testTitle"
                            placeholder="Enter test title"
                            value={testTitle}
                            onChange={(e) => setTestTitle(e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    {/* Select Grade */}
                    <div>
                        <Label htmlFor="grade">Grade</Label>
                        <Select onValueChange={(value) => setSelectedGrade(value)}>
                            <SelectTrigger id="grade" className="mt-1">
                                <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1st Grade</SelectItem>
                                <SelectItem value="2">2nd Grade</SelectItem>
                                <SelectItem value="3">3rd Grade</SelectItem>
                                {/* Add more grades as needed */}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Select Level */}
                    <div>
                        <Label htmlFor="level">Level</Label>
                        <Select onValueChange={(value) => setSelectedLevel(value)}>
                            <SelectTrigger id="level" className="mt-1">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Select Subject */}
                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select onValueChange={(value) => setSelectedSubject(value)}>
                            <SelectTrigger id="subject" className="mt-1">
                                <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="math">Mathematics</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="literature">Literature</SelectItem>
                                {/* Add more subjects as needed */}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Pass Rate Input */}
                    <div>
                        <Label htmlFor="passRate">Pass Rate (%)</Label>
                        <Input
                            id="passRate"
                            type="number"
                            placeholder="Enter pass rate percentage"
                            value={passRate}
                            onChange={(e) => setPassRate(e.target.value ? Number(e.target.value) : '')}
                            className="mt-1"
                        />
                    </div>
                </div>
            </Card>

            {/* Add Questions */}
            <Card className="mt-6 p-4">
                <h2 className="text-2xl font-semibold mb-4">Add Questions</h2>

                <div className="space-y-6">
                    {/* Select Question Type */}
                    <div>
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select onValueChange={(value) => setQuestionType(value as QuestionType)}>
                            <SelectTrigger id="questionType" className="mt-1">
                                <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                                <SelectItem value="trueFalse">True/False</SelectItem>
                                <SelectItem value="shortAnswer">Short Answer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Question Text */}
                    <div>
                        <Label htmlFor="questionText">Question Text</Label>
                        <Textarea
                            id="questionText"
                            placeholder="Enter question text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            rows={3}
                            className="mt-1"
                        />
                    </div>

                    {/* Options for Multiple Choice */}
                    {questionType === 'multipleChoice' && (
                        <div>
                            <Label>Options</Label>
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <Input
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="mr-2"
                                    />
                                    {index === options.length - 1 && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {/* Use a div or span instead of a button here */}
                                                <div
                                                    className="cursor-pointer text-blue-500 hover:underline"
                                                    onClick={() => setOptions([...options, ''])}
                                                >
                                                    +
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>Add another option</TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Correct Answer */}
                    <div>
                        <Label htmlFor="correctAnswer">Correct Answer</Label>
                        {questionType === 'multipleChoice' || questionType === 'shortAnswer' ? (
                            <Input
                                id="correctAnswer"
                                placeholder="Enter correct answer"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                className="mt-1"
                            />
                        ) : (
                            <Select onValueChange={(value) => setCorrectAnswer(value)}>
                                <SelectTrigger id="correctAnswer" className="mt-1">
                                    <SelectValue placeholder="Select correct answer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">True</SelectItem>
                                    <SelectItem value="false">False</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Answer Explanation */}
                    <div>
                        <Label htmlFor="answerExplanation">Answer Explanation</Label>
                        <Textarea
                            id="answerExplanation"
                            placeholder="Provide explanation for the correct answer"
                            value={answerExplanation}
                            onChange={(e) => setAnswerExplanation(e.target.value)}
                            rows={3}
                            className="mt-1"
                        />
                    </div>

                    {/* Add Question Button */}
                    <Button variant="default" className="w-full mt-4" onClick={handleAddQuestion}>
                        Save & Add Another Question
                    </Button>
                </div>
            </Card>

            {/* Display Added Questions */}
            <Card className='mt-8 p-4'>
                <div className="">
                    <h2 className="text-2xl font-semibold mb-4">Questions</h2>
                    <ul className="space-y-4">
                        {questions.map((question) => (
                            <li key={question.id} className="bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium">{question.questionText}</p>
                                    <p className="text-sm text-gray-600">Type: {question.type}</p>
                                    <p className="text-sm text-gray-600">Answer: {question.answer}</p>
                                    <p className="text-sm text-gray-500">Explanation: {question.explanation}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" onClick={() => handleMoveQuestion(question.id, 'up')} disabled={questions.indexOf(question) === 0}>
                                        Up
                                    </Button>
                                    <Button variant="outline" onClick={() => handleMoveQuestion(question.id, 'down')} disabled={questions.indexOf(question) === questions.length - 1}>
                                        Down
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleRemoveQuestion(question.id)}>Remove</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Save Test Button */}
                <Button variant="default" className="w-full mt-6" onClick={handleSaveTest}>
                    Save Test
                </Button>
            </Card>

        </div>
    );
}