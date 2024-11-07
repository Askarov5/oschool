"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, ThumbsUp, MessageSquare } from "lucide-react"
import Image from "next/image"

const featuredArticles = [
  {
    title: "The Future of AI in Education",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we learn and teach...",
    author: "Dr. Emily Chen",
    date: "June 15, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "Technology",
  },
  {
    title: "5 Effective Study Techniques for Better Retention",
    excerpt: "Discover scientifically-proven methods to improve your learning and memory...",
    author: "Prof. Michael Johnson",
    date: "June 10, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "Study Tips",
  },
]

const blogPosts = [
  {
    title: "The Importance of Critical Thinking in the Digital Age",
    excerpt: "In an era of information overload, critical thinking skills are more crucial than ever...",
    author: "Sarah Thompson",
    date: "June 5, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "21st Century Skills",
    likes: 127,
    comments: 23,
  },
  {
    title: "Bridging the Gap: Integrating Arts into STEM Education",
    excerpt: "Discover how incorporating arts into STEM subjects can foster creativity and innovation...",
    author: "David Rodriguez",
    date: "May 30, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "Curriculum",
    likes: 95,
    comments: 18,
  },
  {
    title: "The Rise of Microlearning: Bite-sized Education for the Modern Learner",
    excerpt: "Explore the growing trend of microlearning and its benefits for busy professionals...",
    author: "Lisa Chen",
    date: "May 25, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "E-Learning",
    likes: 112,
    comments: 31,
  },
  {
    title: "Gamification in Education: Making Learning Fun and Engaging",
    excerpt: "Learn how game-based elements can increase student motivation and participation...",
    author: "Alex Patel",
    date: "May 20, 2023",
    image: "https://fakeimg.pl/300x200/cccccc/595959",
    category: "Educational Technology",
    likes: 143,
    comments: 27,
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">EduPlatform Blog</h1>
        
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Articles</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Submit Your Article</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Your Article</DialogTitle>
                  <DialogDescription>
                    Share your knowledge with the EduPlatform community. Fill out the form below to submit your article for review.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input id="category" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Content
                    </Label>
                    <Textarea id="content" className="col-span-3" />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit">Submit Article</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="flex flex-col">
                <Image src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </div>
                    <Badge>{article.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://i.pravatar.cc/32?u=${article.author}`} />
                      <AvatarFallback>{article.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                  <Button variant="outline">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">All Articles</h2>
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search articles..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="study-tips">Study Tips</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((post, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </div>
                      <Badge>{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <Image src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`https://i.pravatar.cc/32?u=${post.author}`} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      <Button variant="outline">Read More</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}