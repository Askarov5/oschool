import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calculator, Atom, Globe, Palette, Rocket } from "lucide-react"
import Link from "next/link"

const subjects = [
  {
    title: "Mathematics",
    description: "Explore numbers, algebra, geometry, and more.",
    icon: Calculator,
    href: "/subjects/chapter"
  },
  {
    title: "Science",
    description: "Discover the wonders of the natural world.",
    icon: Atom,
    href: "/subjects/science"
  },
  {
    title: "History",
    description: "Journey through time and human civilization.",
    icon: Globe,
    href: "/subjects/history"
  },
  {
    title: "Literature",
    description: "Dive into stories, poetry, and literary analysis.",
    icon: BookOpen,
    href: "/subjects/literature"
  },
  {
    title: "Art",
    description: "Express yourself through various artistic mediums.",
    icon: Palette,
    href: "/subjects/art"
  },
  {
    title: "Technology",
    description: "Learn about computers, coding, and digital innovation.",
    icon: Rocket,
    href: "/subjects/technology"
  }
]

export default function SubjectOverview() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <subject.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>{subject.title}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Link href={subject.href} passHref>
                <Button className="w-full">View Chapters</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}