'use client'

import { useState } from 'react';
import { Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, Calculator, FlaskConical, Globe, PenTool } from 'lucide-react'; 

// Define subjects with appropriate Lucide icons
const subjectsByGrade = {
    1: [
      { name: "Mathematics", icon: <Calculator /> },
      { name: "Science", icon: <FlaskConical /> },
      { name: "Reading", icon: <Book /> }
    ],
    2: [
      { name: "Mathematics", icon: <Calculator /> },
      { name: "Science", icon: <FlaskConical /> },
      { name: "History", icon: <Globe /> },
      { name: "Writing", icon: <PenTool /> }
    ],
    // Add more subjects per grade
  };
  


const ChooseClassesPage = () => {
    const [selectedGrade, setSelectedGrade] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredSubjects = subjectsByGrade[selectedGrade]?.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="p-6">
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
            filteredSubjects.map((subject:any, index:number) => (
              <Card key={index} className="p-4 border">
                <div className="flex items-center space-x-4">
                  <div className="text-blue-500">{subject.icon}</div>
                  <CardTitle>{subject.name}</CardTitle>
                </div>
                <CardDescription>
                  Brief overview of {subject.name} content.
                </CardDescription>
                <CardFooter>
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
  