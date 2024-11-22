"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Book,
  Video,
  FileText,
  Plus,
  Edit,
  Trash2,
  Bold,
  Italic,
  List,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TGrade } from "@/lib/types";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Chemistry",
  "Physics",
  "Biology",
  "Literature",
  "Computer Science",
];

const grades: TGrade[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

const Tiptap = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-2">
      <div className="flex gap-2 mb-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default function TeacherCurriculumCreator() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [units, setUnits] = useState([]);
  const [activeUnit, setActiveUnit] = useState(null);
  const [newUnitTitle, setNewUnitTitle] = useState("");
  const [newContentType, setNewContentType] = useState("textbook");
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentData, setNewContentData] = useState("");

  const handleAddUnit = () => {
    if (newUnitTitle) {
      setUnits([...units, { title: newUnitTitle, content: [] }]);
      setNewUnitTitle("");
    }
  };

  const handleAddContent = () => {
    if (activeUnit !== null && newContentTitle) {
      const updatedUnits = [...units];
      updatedUnits[activeUnit].content.push({
        type: newContentType,
        title: newContentTitle,
        data: newContentData,
      });
      setUnits(updatedUnits);
      setNewContentTitle("");
      setNewContentData("");
    }
  };

  const handleDeleteUnit = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
    if (activeUnit === index) {
      setActiveUnit(null);
    }
  };

  const handleDeleteContent = (unitIndex, contentIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].content = updatedUnits[unitIndex].content.filter(
      (_, i) => i !== contentIndex
    );
    setUnits(updatedUnits);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8">Curriculum Creator</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((g) => (
                <SelectItem key={g} value={String(g)}>
                  {g}th Grade
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {subject && grade && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Curriculum Units for {subject} - {grade} Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="New Unit Title"
                value={newUnitTitle}
                onChange={(e) => setNewUnitTitle(e.target.value)}
              />
              <Button onClick={handleAddUnit}>
                <Plus className="mr-2 h-4 w-4" />
                Add Unit
              </Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {units.map((unit, unitIndex) => (
                <AccordionItem value={`unit-${unitIndex}`} key={unitIndex}>
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center justify-between w-full">
                      <span>{unit.title}</span>
                      <div
                        className="flex items-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveUnit(unitIndex)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUnit(unitIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {unit.content.map((content, contentIndex) => (
                        <li
                          key={contentIndex}
                          className="flex items-center justify-between bg-secondary p-2 rounded-md"
                        >
                          <span>
                            {content.title} ({content.type})
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteContent(unitIndex, contentIndex)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {activeUnit !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Add Content to {units[activeUnit].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={newContentType} onValueChange={setNewContentType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="textbook">
                  <Book className="mr-2 h-4 w-4" />
                  Textbook Chapter
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="test">
                  <FileText className="mr-2 h-4 w-4" />
                  Test
                </TabsTrigger>
              </TabsList>
              <TabsContent value="textbook">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="chapterTitle">Chapter Title</Label>
                    <Input
                      id="chapterTitle"
                      value={newContentTitle}
                      onChange={(e) => setNewContentTitle(e.target.value)}
                      placeholder="Enter chapter title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="chapterContent">Chapter Content</Label>
                    <Tiptap
                      content={newContentData}
                      setContent={setNewContentData}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="video">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="videoTitle">Video Title</Label>
                    <Input
                      id="videoTitle"
                      value={newContentTitle}
                      onChange={(e) => setNewContentTitle(e.target.value)}
                      placeholder="Enter video title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      value={newContentData}
                      onChange={(e) => setNewContentData(e.target.value)}
                      placeholder="Enter video URL"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="test">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testTitle">Test Title</Label>
                    <Input
                      id="testTitle"
                      value={newContentTitle}
                      onChange={(e) => setNewContentTitle(e.target.value)}
                      placeholder="Enter test title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="testQuestions">Test Questions</Label>
                    <Textarea
                      id="testQuestions"
                      value={newContentData}
                      onChange={(e) => setNewContentData(e.target.value)}
                      placeholder="Enter one question per line"
                      rows={5}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={handleAddContent} className="mt-4">
              Add Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
