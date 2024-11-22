"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUp, Eye, Download } from "lucide-react";

// Sample data for study materials
const initialMaterials = [
  {
    id: 1,
    name: "Mathematics Textbook",
    grade: "9th",
    subject: "Mathematics",
    type: "Textbook",
    format: "PDF",
  },
  {
    id: 2,
    name: "History Study Guide",
    grade: "10th",
    subject: "History",
    type: "Study Guide",
    format: "PDF",
  },
  {
    id: 3,
    name: "Science Lab Manual",
    grade: "11th",
    subject: "Science",
    type: "Lab Manual",
    format: "PDF",
  },
  {
    id: 4,
    name: "English Literature Anthology",
    grade: "12th",
    subject: "English",
    type: "Textbook",
    format: "PDF",
  },
  {
    id: 5,
    name: "Geography Workbook",
    grade: "9th",
    subject: "Geography",
    type: "Workbook",
    format: "PDF",
  },
  {
    id: 6,
    name: "Chemistry Formula Sheet",
    grade: "11th",
    subject: "Chemistry",
    type: "Reference",
    format: "PDF",
  },
];

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

const materialTypes = [
  "Textbook",
  "Study Guide",
  "Lab Manual",
  "Workbook",
  "Reference",
  "Practice Test",
  "Lecture Notes",
];

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    grade: "",
    subject: "",
    type: "",
    file: null,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterAndSortMaterials(term, gradeFilter, sortBy, sortOrder);
  };

  const handleGradeFilter = (grade: string) => {
    setGradeFilter(grade);
    filterAndSortMaterials(searchTerm, grade, sortBy, sortOrder);
  };

  const handleSort = (column: string) => {
    const newSortOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
    filterAndSortMaterials(searchTerm, gradeFilter, column, newSortOrder);
  };

  const filterAndSortMaterials = (
    term: string,
    grade: string,
    sort: string,
    order: string
  ) => {
    let filtered = materials.filter(
      (material) =>
        material.name.toLowerCase().includes(term.toLowerCase()) &&
        (grade === "all" || material.grade === grade)
    );

    filtered.sort((a, b) => {
      if (a[sort] < b[sort]) return order === "asc" ? -1 : 1;
      if (a[sort] > b[sort]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredMaterials(filtered);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newMaterial.name &&
      newMaterial.grade &&
      newMaterial.subject &&
      newMaterial.type &&
      newMaterial.file
    ) {
      const updatedMaterials = [
        ...materials,
        {
          id: materials.length + 1,
          ...newMaterial,
          format: "PDF",
        },
      ];
      setMaterials(updatedMaterials);
      filterAndSortMaterials(searchTerm, gradeFilter, sortBy, sortOrder);
      setIsDialogOpen(false);
      setNewMaterial({
        name: "",
        grade: "",
        subject: "",
        type: "",
        file: null,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMaterial((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleViewPDF = (materialId: number) => {
    // In a real application, this would open the PDF viewer
    console.log(`Viewing PDF for material with ID: ${materialId}`);
  };

  const handleDownloadPDF = (materialId: number) => {
    // In a real application, this would trigger the PDF download
    console.log(`Downloading PDF for material with ID: ${materialId}`);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Study Materials</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              type="search"
              placeholder="Search materials..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Select value={gradeFilter} onValueChange={handleGradeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
                <SelectItem value="11th">11th Grade</SelectItem>
                <SelectItem value="12th">12th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Add New Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Study Material</DialogTitle>
                <DialogDescription>
                  Upload a new study material in PDF format. Fill out all the
                  details below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMaterial}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newMaterial.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Select
                      name="grade"
                      value={newMaterial.grade}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "grade", value },
                        } as any)
                      }
                      required
                    >
                      <SelectTrigger className="w-[180px] col-span-3">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9th">9th Grade</SelectItem>
                        <SelectItem value="10th">10th Grade</SelectItem>
                        <SelectItem value="11th">11th Grade</SelectItem>
                        <SelectItem value="12th">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Select
                      name="subject"
                      value={newMaterial.subject}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "subject", value },
                        } as any)
                      }
                      required
                    >
                      <SelectTrigger className="w-[180px] col-span-3">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      name="type"
                      value={newMaterial.type}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "type", value },
                        } as any)
                      }
                      required
                    >
                      <SelectTrigger className="w-[180px] col-span-3">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pdf" className="text-right">
                      PDF File
                    </Label>
                    <Input
                      id="pdf"
                      name="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Material</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[200px] cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("grade")}
                  >
                    Grade{" "}
                    {sortBy === "grade" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("subject")}
                  >
                    Subject{" "}
                    {sortBy === "subject" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">
                      {material.name}
                    </TableCell>
                    <TableCell>{material.grade}</TableCell>
                    <TableCell>{material.subject}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{material.format}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPDF(material.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View PDF</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(material.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredMaterials.length} of {materials.length} materials
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-muted py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2023 EduPlatform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
