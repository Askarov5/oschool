'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ITest } from '@/lib/types';
import Link from 'next/link';

import { testData } from '@/data/tests';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
const tempData = [testData]
import { GRADE_SUBJECT_MAP } from '@/lib/constants';

export default function TestManagementPage() {
    // Add search term state
    const [searchTerm, setSearchTerm] = useState('');
    const [gradeFilter, setGradeFilter] = useState('1'); // Default grade
    const [subjectFilter, setSubjectFilter] = useState('');
    const [subjectOptions, setSubjectOptions] = useState(GRADE_SUBJECT_MAP[gradeFilter]);

    useEffect(() => {
        // Update subject options based on the selected grade
        setSubjectOptions(GRADE_SUBJECT_MAP[gradeFilter] || []);
        setSubjectFilter(''); // Reset subject filter when grade changes
    }, [gradeFilter]);
    // State to manage the list of tests
    const [tests, setTests] = useState<ITest[]>(tempData);

    // Function to delete a test
    const handleDeleteTest = (testId: string) => {
        setTests((prevTests) => prevTests.filter(test => test.id !== testId));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Implement search filtering logic here
    };

    return (
        <div className="flex flex-col p-6 gap-2">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold">Test Management</h1>
                <Link href={'/dashboard/test-prep/add'} className="p-1 px-2 bg-slate-900 text-white rounded-sm"> Create New Test</Link>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-grow"
                />
                {/* Grade Filter */}
                <Select
                    value={gradeFilter}
                    onValueChange={(value) => setGradeFilter(value)}
                >
                    <SelectTrigger className="w-1/3">Grade</SelectTrigger>
                    <SelectContent>
                        {Object.keys(GRADE_SUBJECT_MAP).map((grade) => (
                            <SelectItem key={grade} value={grade}>
                                Grade {grade}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Subject Filter */}
                <Select
                    value={subjectFilter}
                    onValueChange={(value) => setSubjectFilter(value)}
                    disabled={!subjectOptions.length} // Disable if no subjects are available
                >
                    <SelectTrigger className="w-1/3">Subject</SelectTrigger>
                    <SelectContent>
                        {subjectOptions.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                                {subject}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {tests.length === 0 ? (
                <Card className='p-4'>
                    <h2 className="text-lg">No tests available.</h2>
                    <p>You can create a new test using the button above.</p>
                </Card>
            ) : (
                <Table aria-label="Test Management Table" className="shadow-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tests.map((test) => (
                            <TableRow key={test.id}>
                                <TableCell>{test.title}</TableCell>
                                <TableCell>{test.grade}</TableCell>
                                <TableCell>{test.level}</TableCell>
                                <TableCell>{test.subject}</TableCell>
                                <TableCell className="flex space-x-2">
                                    <Button variant="outline" onClick={() => console.log(`Edit test: ${test.id}`)}>
                                        Edit
                                    </Button>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="destructive" onClick={() => handleDeleteTest(test.id)}>
                                                Delete
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete this test</TooltipContent>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};