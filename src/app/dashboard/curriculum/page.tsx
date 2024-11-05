"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Share2, Search } from "lucide-react"


type Curriculum = {
    id: string
    name: string
    description: string
    subjects: string[]
    chapters: { id: string; name: string; completed: boolean }[]
    progress: number
    shared: boolean
}

const subjects = ["Math", "Science", "History", "Literature", "Art", "Music"]

export default function CurriculumManager() {
    const [isStudent, setIsStudent] = useState(true)
    const [curricula, setCurricula] = useState<Curriculum[]>([])
    const [newCurriculum, setNewCurriculum] = useState<Curriculum>({ id: "", name: "", description: "", subjects: [], chapters: [], progress: 0, shared: false })
    const [editingCurriculum, setEditingCurriculum] = useState<Curriculum | null>(null)
    const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null)

    const handleAddCurriculum = () => {
        if (newCurriculum.name) {
            setCurricula([...curricula, { ...newCurriculum, id: Date.now().toString() }])
            setNewCurriculum({ id: "", name: "", description: "", subjects: [], chapters: [], progress: 0, shared: false })
        }
    }

    const handleEditCurriculum = (curriculum: Curriculum) => {
        setEditingCurriculum(curriculum)
    }

    const handleUpdateCurriculum = () => {
        if (editingCurriculum) {
            setCurricula(curricula.map(c => c.id === editingCurriculum.id ? editingCurriculum : c))
            setEditingCurriculum(null)
        }
    }

    const handleDeleteCurriculum = (id: string) => {
        setCurricula(curricula.filter(c => c.id !== id))
    }

    const handleShareCurriculum = (id: string) => {
        setCurricula(curricula.map(c => c.id === id ? { ...c, shared: true } : c))
    }

    const handleAddChapter = () => {
        if (editingCurriculum) {
            const newChapter = { id: Date.now().toString(), name: "New Chapter", completed: false }
            setEditingCurriculum({
                ...editingCurriculum,
                chapters: [...editingCurriculum.chapters, newChapter]
            })
        }
    }

    return (
        <div className="flex-1 overflow-auto p-4">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Student Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        <span>Teacher View</span>
                        <Switch checked={isStudent} onCheckedChange={setIsStudent} />
                        <span>Student View</span>
                    </div>
                </div>

                <div className="grid">
                    <div className="flex-1 overflow-auto">
                        <div className="container mx-auto py-8">
                            <h1 className="text-3xl font-bold mb-8">Curriculum Manager</h1>

                            <Tabs defaultValue="my-curricula">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="my-curricula">My Curricula</TabsTrigger>
                                    <TabsTrigger value="shared-curricula">Shared Curricula</TabsTrigger>
                                </TabsList>

                                <TabsContent value="my-curricula">
                                    <div className="mb-6">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>
                                                    <Plus className="mr-2 h-4 w-4" /> Create New Curriculum
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Create New Curriculum</DialogTitle>
                                                    <DialogDescription>Add a new curriculum here. Click save when you're done.</DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={(e) => { e.preventDefault(); handleAddCurriculum(); }}>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="name">Curriculum Name</Label>
                                                            <Input
                                                                id="name"
                                                                value={newCurriculum.name}
                                                                onChange={(e) => setNewCurriculum({ ...newCurriculum, name: e.target.value })}
                                                                placeholder="Enter curriculum name"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="description">Description</Label>
                                                            <Textarea
                                                                id="description"
                                                                value={newCurriculum.description}
                                                                onChange={(e) => setNewCurriculum({ ...newCurriculum, description: e.target.value })}
                                                                placeholder="Enter curriculum description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Subjects</Label>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {subjects.map((subject) => (
                                                                    <div key={subject} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={subject}
                                                                            checked={newCurriculum.subjects.includes(subject)}
                                                                            onCheckedChange={(checked) => {
                                                                                if (checked) {
                                                                                    setNewCurriculum({ ...newCurriculum, subjects: [...newCurriculum.subjects, subject] })
                                                                                } else {
                                                                                    setNewCurriculum({ ...newCurriculum, subjects: newCurriculum.subjects.filter(s => s !== subject) })
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label htmlFor={subject}>{subject}</Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <DialogFooter>
                                                    <Button onClick={handleAddCurriculum}>Save Curriculum</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {curricula.map((curriculum) => (
                                            <Card key={curriculum.id}>
                                                <CardHeader>
                                                    <CardTitle>{curriculum.name}</CardTitle>
                                                    <CardDescription>{curriculum.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="mb-2">
                                                        <Label>Subjects:</Label>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {curriculum.subjects.map((subject) => (
                                                                <Badge key={subject} variant="secondary">{subject}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-2">
                                                        <Label>Progress:</Label>
                                                        <Progress value={curriculum.progress} className="mt-1" />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-between">
                                                    <Button variant="outline" onClick={() => setSelectedCurriculum(curriculum)}>
                                                        View Details
                                                    </Button>
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" onClick={() => handleEditCurriculum(curriculum)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" onClick={() => handleShareCurriculum(curriculum.id)}>
                                                            <Share2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="destructive" onClick={() => handleDeleteCurriculum(curriculum.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="shared-curricula">
                                    <div className="mb-6">
                                        <Input
                                            placeholder="Search shared curricula..."
                                            className="max-w-sm"
                                            startIcon={<Search className="h-4 w-4" />}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Placeholder for shared curricula */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Advanced Mathematics</CardTitle>
                                                <CardDescription>A comprehensive curriculum for advanced math topics</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="mb-2">
                                                    <Label>Subjects:</Label>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        <Badge variant="secondary">Math</Badge>
                                                        <Badge variant="secondary">Calculus</Badge>
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <Label>Shared by:</Label>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Avatar>
                                                            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                                                            <AvatarFallback>JD</AvatarFallback>
                                                        </Avatar>
                                                        <span>John Doe</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button variant="outline">Preview</Button>
                                            </CardFooter>
                                        </Card>
                                        {/* Add more shared curricula cards here */}
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {selectedCurriculum && (
                                <Dialog open={!!selectedCurriculum} onOpenChange={() => setSelectedCurriculum(null)}>
                                    <DialogContent className="max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle>{selectedCurriculum.name}</DialogTitle>
                                            <DialogDescription>{selectedCurriculum.description}</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Subjects</h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedCurriculum.subjects.map((subject) => (
                                                        <Badge key={subject} variant="secondary">{subject}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Progress</h3>
                                                <Progress value={selectedCurriculum.progress} className="mb-2" />
                                                <span>{selectedCurriculum.progress}% Complete</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Chapters</h3>
                                            <ScrollArea className="h-[200px]">
                                                {selectedCurriculum.chapters.map((chapter) => (
                                                    <div key={chapter.id} className="flex items-center justify-between py-2">
                                                        <span>{chapter.name}</span>
                                                        <Checkbox checked={chapter.completed} />
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Discussion</h3>
                                            <div className="bg-muted p-4 rounded-lg">
                                                <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setSelectedCurriculum(null)}>Close</Button>
                                            <Button onClick={() => handleEditCurriculum(selectedCurriculum)}>Edit Curriculum</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}

                            {editingCurriculum && (
                                <Dialog open={!!editingCurriculum} onOpenChange={() => setEditingCurriculum(null)}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Curriculum</DialogTitle>
                                            <DialogDescription>Make changes to your curriculum here. Click save when you're done.</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateCurriculum(); }}>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="edit-name">Curriculum Name</Label>
                                                    <Input
                                                        id="edit-name"
                                                        value={editingCurriculum.name}
                                                        onChange={(e) => setEditingCurriculum({ ...editingCurriculum, name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="edit-description">Description</Label>

                                                    <Textarea
                                                        id="edit-description"
                                                        value={editingCurriculum.description}
                                                        onChange={(e) => setEditingCurriculum({ ...editingCurriculum, description: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Subjects</Label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {subjects.map((subject) => (
                                                            <div key={subject} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`edit-${subject}`}
                                                                    checked={editingCurriculum.subjects.includes(subject)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            setEditingCurriculum({ ...editingCurriculum, subjects: [...editingCurriculum.subjects, subject] })
                                                                        } else {
                                                                            setEditingCurriculum({ ...editingCurriculum, subjects: editingCurriculum.subjects.filter(s => s !== subject) })
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={`edit-${subject}`}>{subject}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>Chapters</Label>
                                                    <ScrollArea className="h-[200px] border rounded-md p-4">
                                                        {editingCurriculum.chapters.map((chapter, index) => (
                                                            <div key={chapter.id} className="flex items-center justify-between py-2">
                                                                <Input
                                                                    value={chapter.name}
                                                                    onChange={(e) => {
                                                                        const updatedChapters = [...editingCurriculum.chapters]
                                                                        updatedChapters[index].name = e.target.value
                                                                        setEditingCurriculum({ ...editingCurriculum, chapters: updatedChapters })
                                                                    }}
                                                                    className="w-full mr-2"
                                                                />
                                                                <Checkbox
                                                                    checked={chapter.completed}
                                                                    onCheckedChange={(checked) => {
                                                                        const updatedChapters = [...editingCurriculum.chapters]
                                                                        updatedChapters[index].completed = checked as boolean
                                                                        setEditingCurriculum({ ...editingCurriculum, chapters: updatedChapters })
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </ScrollArea>
                                                    <Button type="button" onClick={handleAddChapter} className="mt-2">
                                                        Add Chapter
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                        <DialogFooter>
                                            <Button onClick={handleUpdateCurriculum}>Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}