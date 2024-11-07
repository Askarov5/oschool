// components/SubjectForm.tsx
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISubject, Subject, TGrade } from "@/lib/types";

interface SubjectFormProps {
  onSave: (subject: ISubject) => void;
  subject?: ISubject;
  onClose: () => void;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({
  onSave,
  subject,
  onClose,
}) => {
  const [title, setTitle] = useState<Subject>(
    subject?.title || Subject.Mathematics,
  );
  const [grade, setGrade] = useState<TGrade>(subject?.grade || 1);
  const [description, setDescription] = useState(subject?.description || "");

  const handleSubmit = () => {
    const newSubject: ISubject = {
      id: Date.now().toString(),
      title,
      grade,
      description,
      chapters: [],
    };
    onSave(newSubject);
    onClose();
    console.log(newSubject);
  };

  return (
    <div className="space-y-4">
      <Select
        value={title}
        onValueChange={(value) => setTitle(value as Subject)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(Subject).map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={String(grade)}
        onValueChange={(value) => setGrade(Number(value) as TGrade)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Grade" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <SelectItem key={g} value={g.toString()}>{`Grade ${g}`}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
};
