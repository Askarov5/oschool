"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Book, Clock, Trophy, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

const subjects = [
    { name: "Math", progress: 75, chapters: 8, completed: 6, time: 120, color: "#FF6384" },
    { name: "Science", progress: 60, chapters: 10, completed: 6, time: 90, color: "#36A2EB" },
    { name: "History", progress: 40, chapters: 12, completed: 5, time: 60, color: "#FFCE56" },
    { name: "Literature", progress: 80, chapters: 6, completed: 5, time: 80, color: "#4BC0C0" },
]

const recentTests = [
    { subject: "Math", score: 85, date: "2023-06-01" },
    { subject: "Science", score: 92, date: "2023-05-28" },
    { subject: "History", score: 78, date: "2023-05-25" },
]

const upcomingDeadlines = [
    { subject: "Math", task: "Chapter 9 Quiz", date: "2023-06-10" },
    { subject: "Science", task: "Lab Report Submission", date: "2023-06-12" },
    { subject: "Literature", task: "Essay Due", date: "2023-06-15" },
]

const aiNotes = [
    "Great progress in Math! Keep up the good work.",
    "Consider reviewing the latest Science chapter.",
    "Your History essays show improvement. Let's work on dates recall.",
]

export default function Dashboard() {
    const [isStudent, setIsStudent] = useState(true)
    const [weeklyGoal, setWeeklyGoal] = useState(600) // 10 hours in minutes
    const [studyTime, setStudyTime] = useState(0)

    useEffect(() => {
        // Simulate study time progress
        const timer = setInterval(() => {
            setStudyTime(prevTime => {
                const newTime = prevTime + 1
                return newTime > weeklyGoal ? weeklyGoal : newTime
            })
        }, 1000) // Update every second for demonstration purposes

        return () => clearInterval(timer)
    }, [weeklyGoal])

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGoal = parseInt(e.target.value) * 60 // Convert hours to minutes
        setWeeklyGoal(newGoal)
        setStudyTime(prevTime => prevTime > newGoal ? newGoal : prevTime)
    }

    return (
        <div className="flex-1 overflow-auto">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Student Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        <span>Teacher View</span>
                        <Switch checked={isStudent} onCheckedChange={setIsStudent} />
                        <span>Student View</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Weekly Goal */}
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle>Weekly Study Goal</CardTitle>
                            <CardDescription>Set your weekly study goal in hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    type="number"
                                    value={weeklyGoal / 60}
                                    onChange={handleGoalChange}
                                    min={1}
                                    max={168}
                                    className="w-20"
                                />
                                <span>hours</span>
                            </div>
                            <Progress value={(studyTime / weeklyGoal) * 100} className="h-2 mb-2" />
                            <div className="text-sm text-muted-foreground">
                                {Math.floor(studyTime / 60)}h {studyTime % 60}m / {weeklyGoal / 60}h
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subject Progress */}
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle>Subject Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {subjects.map((subject) => (
                                    <div key={subject.name} className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{subject.name}</span>
                                            <span>{subject.progress}%</span>
                                        </div>
                                        <Progress value={subject.progress} className="h-2" />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{subject.completed}/{subject.chapters} Chapters</span>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{Math.floor(subject.time / 60)}h {subject.time % 60}m</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time Spent */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Spent</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ChartContainer config={{}} className="h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={subjects}
                                            dataKey="time"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {subjects.map((subject, index) => (
                                                <Cell key={`cell-${index}`} fill={subject.color} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Test Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Test Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[250px]">
                                <div className="space-y-4">
                                    {recentTests.map((test, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{test.subject}</div>
                                                <div className="text-sm text-muted-foreground">{test.date}</div>
                                            </div>
                                            <Badge variant={test.score >= 80 ? "default" : "secondary"}>
                                                {test.score}%
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {subjects.map((subject) => (
                                    <Badge key={subject.name} variant="outline" className="text-lg p-2">
                                        <Trophy className="w-4 h-4 mr-1" />
                                        {subject.name}: {subject.completed}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Deadlines */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Deadlines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[250px]">
                                <div className="space-y-4">
                                    {upcomingDeadlines.map((deadline, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <div className="font-medium">{deadline.subject}: {deadline.task}</div>
                                                <div className="text-sm text-muted-foreground">{deadline.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* AI Tutor Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Tutor Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[250px]">
                                <div className="space-y-4">
                                    {aiNotes.map((note, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <Book className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <p>{note}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}