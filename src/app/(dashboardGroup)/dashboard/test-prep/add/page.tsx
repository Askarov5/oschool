'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components//ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TQuestionType, IQuestion, ITest } from '@/lib/types';
import { Trash, MoveUp, MoveDown, } from 'lucide-react';

export default function CreateTest() {
    const [test, setTest] = useState<ITest>({
        id:'',
        title: '',
        grade: '',
        level: '',
        subject: '',
        passRate: 0,
        questions: [],
    });

    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<TQuestionType>('multipleChoice');
    const [options, setOptions] = useState<string[]>(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState<string | boolean>('');
    const [answerExplanation, setAnswerExplanation] = useState('');

    const handleInputChange = (key: keyof ITest) => (value: string | number) => {
        setTest((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddQuestion = () => {
        const newQuestion: IQuestion = {
            id: test.questions.length + 1,
            type: questionType,
            questionText,
            options: questionType === 'multipleChoice' ? options : undefined,
            answer: correctAnswer,
            explanation: answerExplanation,
        };
        setTest((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
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
        setTest((prev) => ({
            ...prev,
            questions: prev.questions.filter((question) => question.id !== id),
        }));
    };

    const handleMoveQuestion = (id: number, direction: 'up' | 'down') => {
        const index = test.questions.findIndex((q) => q.id === id);
        if (direction === 'up' && index > 0) {
            const newQuestions = [...test.questions];
            [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
            setTest((prev) => ({
                ...prev,
                questions: newQuestions,
            }));
        } else if (direction === 'down' && index < test.questions.length - 1) {
            const newQuestions = [...test.questions];
            [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
            setTest((prev) => ({
                ...prev,
                questions: newQuestions,
            }));
        }
    };

    const handleSaveTest = () => {
        console.log('Test saved:', test);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8 bg-gray-50 rounded-lg shadow-md">
            <Card className='p-4'>
                <h1 className="text-3xl font-bold mb-6 text-center w-full">Create a New Test</h1>

                {/* Test Title */}
                <div className='flex flex-wrap justify-between gap-2'>
                    <div className='w-full'>
                        <Label htmlFor="testTitle">Test Title</Label>
                        <Input
                            id="testTitle"
                            placeholder="Enter test title"
                            value={test.title}
                            onChange={(e) => handleInputChange('title')(e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    {/* Select Grade */}
                    <div>
                        <Label htmlFor="grade">Grade</Label>
                        <Select onValueChange={(value) => handleInputChange('grade')(value)}>
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
                        <Select onValueChange={(value) => handleInputChange('level')(value)}>
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
                        <Select onValueChange={(value) => handleInputChange('subject')(value)}>
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
                            value={test.passRate}
                            onChange={(e) => handleInputChange('passRate')(e.target.value ? Number(e.target.value) : '')}
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
                        <Select onValueChange={(value) => setQuestionType(value as TQuestionType)}>
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
                    {questionType === 'shortAnswer' && (
                        <div>
                            <Label htmlFor="correctAnswer">Correct Answer</Label>
                            <Input
                                id="correctAnswer"
                                placeholder="Enter correct answer"
                                value={correctAnswer as string}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    )}

                    {/* Correct Answer Selection for Multiple Choice */}
                    {questionType === 'multipleChoice' && (
                        <div>
                            <Label htmlFor="correctAnswer">Correct Answer</Label>
                            <Select value={correctAnswer as string} onValueChange={(value) => setCorrectAnswer(value)}>
                                <SelectTrigger id="correctAnswer" className="mt-1">
                                    <SelectValue placeholder="Select correct answer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={null as unknown as string} disabled>
                                        Select correct answer
                                    </SelectItem> {/* Placeholder item */}
                                    {options && options.map((option, index) => (
                                        option.trim() !== '' && ( // Ensure the option is not empty
                                            <SelectItem key={index} value={option}>
                                                {option}
                                            </SelectItem>
                                        )
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* True/False Answer Selection */}
                    {questionType === 'trueFalse' && (
                        <div>
                            <Label>Correct Answer</Label>
                            <div className="flex space-x-4 mt-1">
                                <Button onClick={() => setCorrectAnswer(true)} variant={correctAnswer === true ? 'default' : 'outline'}>
                                    True
                                </Button>
                                <Button onClick={() => setCorrectAnswer(false)} variant={correctAnswer === false ? 'default' : 'outline'}>
                                    False
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Explanation for the Correct Answer */}
                    <div>
                        <Label htmlFor="answerExplanation">Explanation</Label>
                        <Textarea
                            id="answerExplanation"
                            placeholder="Enter explanation for the correct answer"
                            value={answerExplanation}
                            onChange={(e) => setAnswerExplanation(e.target.value)}
                            rows={3}
                            className="mt-1"
                        />
                    </div>

                    {/* Add Question Button */}
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                </div>
            </Card>



            {/* List of Questions */}
            {test.questions.length > 0 && (
                <Card className="mt-6 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Questions</h2>
                    <ul className="space-y-4">
                        {test.questions.map((question) => (
                            <li key={question.id} className="bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium">{question.questionText}</p>
                                    <p className="text-sm text-gray-600">Type: {question.type}</p>
                                    <p className="text-sm text-gray-600">Answer: {question.answer}</p>
                                    <p className="text-sm text-gray-500">Explanation: {question.explanation}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button onClick={() => handleMoveQuestion(question.id, 'up')} disabled={question.id === 1}>
                                        <MoveUp />
                                    </Button>
                                    <Button
                                        onClick={() => handleMoveQuestion(question.id, 'down')} disabled={question.id === test.questions.length}>
                                        <MoveDown />
                                    </Button>
                                    <Button
                                        onClick={() => handleRemoveQuestion(question.id)}
                                        variant="destructive"
                                        className="mr-2"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </Card>

            )}
            <Card className='mt-6 p-4'>
                {/* Save Test Button */}
                <Button onClick={handleSaveTest} className='w-full'>
                    Save Test
                </Button>
            </Card>
        </div>
    );
}
