"use client"

import { useState } from "react"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ChapterContent() {
  const [activeTab, setActiveTab] = useState("video")
  const [currentExercise, setCurrentExercise] = useState(0)

  const exercises = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
    { question: "What is 7 x 8?", options: ["54", "56", "62", "64"], answer: 1 },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1: Introduction</h1>
        <div className="flex space-x-2">
          <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter</Button>
          <Button variant="outline">Next Chapter <ChevronRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="video">Video Lesson</TabsTrigger>
          <TabsTrigger value="textbook">Textbook Content</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                width="100%"
                height="480px"
                controls
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="textbook">
          <Card>
            <CardHeader>
              <CardTitle>Textbook Content</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
                interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel
                consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
              </p>
              <p className="mb-4">
                Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc
                euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt
                nisl nunc euismod nunc.
              </p>
              <p>
                Euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod
                nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc
                euismod nunc.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Exercise {currentExercise + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exercises[currentExercise].question}</p>
              <div className="space-y-2">
                {exercises[currentExercise].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start"
                    onClick={() => {
                      // Handle answer selection
                      if (index === exercises[currentExercise].answer) {
                        alert("Correct!")
                      } else {
                        alert("Incorrect. Try again!")
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => setCurrentExercise((prev) => Math.max(0, prev - 1))}
                  disabled={currentExercise === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentExercise((prev) => Math.min(exercises.length - 1, prev + 1))}
                  disabled={currentExercise === exercises.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}