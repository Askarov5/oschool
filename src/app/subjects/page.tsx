'use client'

import { useEffect, useState } from 'react';
import { Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getSubjectIcon, { getSubjectsByGrade } from '@/lib/subjectIconMap';
import subjectData from '@/data/subjects'
import { ISubject, TGrade } from '@/lib/types';

// Define subjects with appropriate Lucide icons
const subjectsByGrade = getSubjectsByGrade(subjectData);


const ChooseClassesPage = () => {
    const [selectedGrade, setSelectedGrade] = useState<TGrade | 0>(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState(subjectData);

    useEffect(() => {
        if (selectedGrade !== 0) {
            setFilteredSubjects(subjectsByGrade[selectedGrade as TGrade]?.filter(subject =>
                subject.title.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        }
    }, [selectedGrade, searchTerm])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Choose Your Classes</h1>
            <p className="mt-2 text-gray-600">Select your grade level and pick a subject to get started.</p>

            {/* Grade Selector */}
            <div className="mt-4 flex items-center space-x-4">
                <Select onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(subjectsByGrade).map(grade => (
                            <SelectItem key={grade} value={grade}>
                                Grade {grade}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Search Bar */}
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search subjects"
                />
            </div>

            {/* Subject Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredSubjects?.length > 0 ? (
                    filteredSubjects.map((subject: any, index: number) => (
                        <Card key={index} className="p-4 border flex flex-col gap-1">
                            <div className="flex items-center space-x-4">
                                <div className="text-blue-500">{getSubjectIcon(subject.title)}</div>
                                <CardTitle>{subject.title}</CardTitle>
                            </div>
                            <CardDescription className='p-1 min-h-[80px] flex flex-col gap-1'>
                                <p>{subject.description}</p>
                                <p>Grade: {subject.grade}</p>
                            </CardDescription>
                            <CardFooter className='p-0'>
                                <Button className="w-full mt-2">View Chapters</Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>No subjects available for this grade or matching search.</p>
                )}
            </div>
        </div>
    );
};

export default ChooseClassesPage;
