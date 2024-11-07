"use client";
// components/SubjectDashboard.tsx
import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SubjectForm } from "@/components/subjects/subjectForm";
import { ISubject, TGrade, Subject } from "@/lib/types";
import { FilePlus, LayoutList, Pen, Trash } from "lucide-react";
import { ChapterManagement } from "@/app/(publicGroup)/subjects/chapterMgmt";
import subjectsData from "@/data/subjects";

const SubjectDashboard = () => {
  const [subjects, setSubjects] = useState<ISubject[]>(subjectsData);
  const [selectedSubject, setSelectedSubject] = useState<ISubject | undefined>(
    undefined,
  );
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);

  const handleAddSubject = (newSubject: ISubject) => {
    setSubjects([...subjects, newSubject]);
    setIsSubjectDialogOpen(false);
  };

  const handleEditSubject = (subject: ISubject) => {
    setSelectedSubject(subject);
    setIsSubjectDialogOpen(true);
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== subjectId));
  };

  const handleViewChapters = (subject: ISubject) => {
    setSelectedSubject(subject);
    setIsChapterDialogOpen(true);
  };

  return (
    <div className="container p-4 flex flex-col gap-4">
      <div className="flex gap-1 justify-between py-2">
        <h1 className="text-2xl font-bold">Subjects Management</h1>
        <Button onClick={() => setIsSubjectDialogOpen(true)}>
          Add New Subject
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-left font-semibold">
              Grade
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold">
              Subject
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold">
              Description
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.grade}</TableCell>
              <TableCell>{subject.title}</TableCell>
              <TableCell>{subject.description || "No description"}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleEditSubject(subject)}
                          variant="default"
                          className="p-2 px-3"
                        >
                          <Pen />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Subject</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleDeleteSubject(subject.id)}
                          variant="destructive"
                          className="p-2 px-3"
                        >
                          <Trash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Subject</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleViewChapters(subject)}
                          variant="outline"
                          className="p-2 px-3"
                        >
                          <LayoutList />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Chapters</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Subject Dialog */}
      <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
        <DialogContent>
          <DialogTitle>
            {selectedSubject ? "Edit Subject" : "Add New Subject"}
          </DialogTitle>
          <SubjectForm
            onSave={handleAddSubject}
            subject={selectedSubject}
            onClose={() => setIsSubjectDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Chapter Management Dialog */}
      <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
        <DialogContent>
          <DialogTitle>
            Manage Chapters for {selectedSubject?.title}
          </DialogTitle>
          {selectedSubject && (
            <ChapterManagement
              subjectId={selectedSubject.id}
              onClose={() => setIsChapterDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectDashboard;
