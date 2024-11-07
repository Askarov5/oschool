// components/ChapterForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IChapter } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
interface ChapterFormProps {
  onSave: (chapter: IChapter) => void;
  onClose: () => void;
  chapter?: IChapter;
}

export const ChapterForm = ({ onSave, onClose, chapter }: ChapterFormProps) => {
  const [title, setTitle] = useState(chapter?.title || "");
  const [videoLink, setVideoLink] = useState(chapter?.video.link || "");
  const [bookContent, setBookContent] = useState(
    chapter?.bookContent.content || "",
  );

  const handleSubmit = () => {
    const newChapter: IChapter = {
      id: chapter?.id || Date.now().toString(),
      title,
      video: { id: "video_id", link: videoLink, title: "Video Title" },
      bookContent: {
        id: "book_id",
        title: "Book Content Title",
        content: bookContent,
      },
      test: {
        id: "test_id",
        title: "Sample Test",
        grade: "",
        passRate: 80,
        level: "",
        subject: title,
        questions: [],
      },
    };

    onSave(newChapter);
    onClose();
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-2"></CardHeader>
      <CardContent className=" flex flex-col gap-2 px-0">
        <Input
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <Textarea
          placeholder="Book Content"
          value={bookContent}
          onChange={(e) => setBookContent(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2 px-0">
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};
