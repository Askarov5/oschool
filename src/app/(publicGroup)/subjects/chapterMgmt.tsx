import { useState } from "react";
import {
    Button
} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableRow,
    TableCell
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { ChapterForm } from "@/components/subjects/chapterForm";
import { IChapter } from "@/lib/types";

interface ChapterManagementProps {
    subjectId: string;
    onClose: () => void;
}

export const ChapterManagement = ({ subjectId, onClose }: ChapterManagementProps) => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<IChapter | undefined>(undefined);
    const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);

    const handleAddChapter = (newChapter: IChapter) => {
        // Update the state with the new or edited chapter
        setChapters((prevChapters) => {
            const updatedChapters = selectedChapter
                ? prevChapters.map((ch) => (ch.id === newChapter.id ? newChapter : ch))
                : [...prevChapters, newChapter];
            return updatedChapters;
        });
        setIsChapterDialogOpen(false);
    };

    const handleEditChapter = (chapter: IChapter) => {
        setSelectedChapter(chapter);
        setIsChapterDialogOpen(true);
    };

    const handleDeleteChapter = (chapterId: string) => {
        setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    };

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={() => { setSelectedChapter(undefined); setIsChapterDialogOpen(true); }}>Add New Chapter</Button>
            </div>
            {
                chapters.length > 0 ?
                    (
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">Chapter Title</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <TableBody>
                                {chapters.map((chapter) => (
                                    <TableRow key={chapter.id}>
                                        <TableCell>{chapter.title}</TableCell>
                                        <TableCell className="flex gap-1">
                                            <Button onClick={() => handleEditChapter(chapter)}>Edit</Button>
                                            <Button onClick={() => handleDeleteChapter(chapter.id)} variant="destructive">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    ) : (
                        <div className="flex justify-start py-4">
                            <p>No Chapters</p>
                        </div>
                    )
            }


            {/* Chapter Dialog */}
            <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
                <DialogContent>
                    <DialogTitle>{selectedChapter ? "Edit Chapter" : "Add New Chapter"}</DialogTitle>
                    <ChapterForm
                        onSave={handleAddChapter}
                        chapter={selectedChapter}
                        onClose={() => setIsChapterDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};