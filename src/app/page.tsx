"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Book, MessageSquare, ArrowRight, GraduationCap, Clock } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts"

const featuredSubjects = [
  { name: "Mathematics", icon: "π", color: "bg-blue-100 text-blue-600" },
  { name: "Science", icon: "π", color: "bg-green-100 text-green-600" },
  { name: "History", icon: "π", color: "bg-yellow-100 text-yellow-600" },
  { name: "Literature", icon: "π", color: "bg-purple-100 text-purple-600" },
]

const testimonials = [
  { name: "Sarah L.", role: "Student", content: "This platform has transformed my learning experience. The interactive lessons and AI tutor are incredible!" },
  { name: "John D.", role: "Teacher", content: "As an educator, I find the curriculum management tools invaluable. It's made lesson planning so much easier." },
  { name: "Emma W.", role: "Parent", content: "I love being able to track my child's progress and see their achievements. It's very motivating for them." },
]

// Mock data for student progress
const weeklyProgressData = [
  { week: "Week 1", Mathematics: 65, Science: 70, History: 55, Literature: 60 },
  { week: "Week 2", Mathematics: 68, Science: 72, History: 58, Literature: 62 },
  { week: "Week 3", Mathematics: 72, Science: 75, History: 60, Literature: 65 },
  { week: "Week 4", Mathematics: 75, Science: 78, History: 63, Literature: 68 },
  { week: "Week 5", Mathematics: 78, Science: 80, History: 65, Literature: 70 },
  { week: "Week 6", Mathematics: 80, Science: 82, History: 68, Literature: 73 },
]

const subjectDistribution = [
  { subject: "Mathematics", hours: 25 },
  { subject: "Science", hours: 22 },
  { subject: "History", hours: 18 },
  { subject: "Literature", hours: 20 },
]

const testScores = [
  { subject: "Mathematics", score: 85 },
  { subject: "Science", score: 88 },
  { subject: "History", score: 78 },
  { subject: "Literature", score: 82 },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EduPlatform</h1>
          <p className="text-xl mb-8">Discover a personalized learning experience with 
            interactive lessons, digital textbooks, and AI-powered tutoring for students 
            from Grade 1 to 12. Learn at your own pace, track your progress, and unlock 
            achievements as you master new subjects!</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild variant="secondary">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="ghost">Learn More</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Subjects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredSubjects.map((subject) => (
              <Card key={subject.name} className={`${subject.color} border-none`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-3xl mr-2">{subject.icon}</span>
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explore our comprehensive {subject.name} curriculum.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">Start Learning</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Never Miss a Lesson Again!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Did you miss your class because you're sick, but you don't want to fail your exams? Don't worry, we've got you covered!
              </p>
              <p className="mb-4">
                Our online school contains all the materials you need to learn. Simply select your grade and start learning any subject, anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-6 w-6" />
                  <span>All grades available</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-6 w-6" />
                  <span>24/7 access to materials</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full sm:w-auto">Explore Our Courses</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-6 w-6" />
                  Interactive Video Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Engage with our high-quality video lessons, complete with interactive elements to enhance your learning experience.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-6 w-6" />
                  Comprehensive Textbooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access a wide range of digital textbooks, complete with highlighting and note-taking features.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  AI Tutor Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get personalized help from our AI tutor, available 24/7 to answer your questions and provide guidance.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Track Your Progress</h2>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
              <TabsTrigger value="distribution">Study Time Distribution</TabsTrigger>
              <TabsTrigger value="scores">Test Scores</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress Across Subjects</CardTitle>
                  <CardDescription>Track your improvement over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyProgressData}>
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Mathematics" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="Science" stroke="#22c55e" />
                        <Line type="monotone" dataKey="History" stroke="#eab308" />
                        <Line type="monotone" dataKey="Literature" stroke="#a855f7" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="distribution">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Time Distribution</CardTitle>
                  <CardDescription>See how you allocate your study time (in hours)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectDistribution}
                          dataKey="hours"
                          nameKey="subject"
                          cx="50%"
                          cy="50%"
                          outerRadius={150}
                          fill="#8884d8"
                          label
                        >
                          {subjectDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#22c55e', '#eab308', '#a855f7'][index % 4]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scores">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Test Scores</CardTitle>
                  <CardDescription>Your performance in recent subject tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={testScores}>
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>

        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to start your learning journey?</CardTitle>
              <CardDescription className="text-primary-foreground/70">Sign up now and get access to all our features!</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Enter your email" className="flex-grow bg-primary-foreground text-primary" />
                <Button type="submit" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}