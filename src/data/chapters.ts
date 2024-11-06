import { IChapter, IVideo, IBookContent, ITest, IQuestion, TQuestionType } from "../lib/types";

// Mock Video Data
const videos: IVideo[] = [
    { id: "vid1", link: "https://example.com/video1", title: "Introduction to Computers" },
    { id: "vid2", link: "https://example.com/video2", title: "Basic Math Operations" },
    { id: "vid3", link: "https://example.com/video3", title: "Plant Biology Basics" },
    { id: "vid4", link: "https://example.com/video4", title: "Introduction to Geography" },
    { id: "vid5", link: "https://example.com/video5", title: "Laws of Motion in Physics" },
];

// Mock Book Content
const bookContents: IBookContent[] = [
    { id: "book1", title: "Computer Basics Chapter", content: "Learn about the basics of computers, including hardware and software." },
    { id: "book2", title: "Arithmetic Chapter", content: "An introduction to arithmetic operations, fractions, and decimals." },
    { id: "book3", title: "Plants and Ecosystems", content: "Study of plants, ecosystems, and their roles in the environment." },
    { id: "book4", title: "World Continents", content: "Overview of continents, countries, and cultures across the globe." },
    { id: "book5", title: "Forces and Motion", content: "Understanding forces, motion, and the basic principles of physics." },
];

// Mock Questions
const questions: IQuestion[] = [
    {
        id: 1,
        type: "multipleChoice" as TQuestionType,
        questionText: "What is the main component of a computer that processes data?",
        options: ["CPU", "RAM", "Hard Drive", "Motherboard"],
        answer: "CPU",
        explanation: "The CPU is the primary component that processes instructions in a computer.",
    },
    {
        id: 2,
        type: "trueFalse" as TQuestionType,
        questionText: "Addition is a type of arithmetic operation.",
        answer: true,
        explanation: "Addition is one of the four basic arithmetic operations.",
    },
    {
        id: 3,
        type: "shortAnswer" as TQuestionType,
        questionText: "Name the process plants use to convert sunlight into energy.",
        answer: "Photosynthesis",
        explanation: "Plants use photosynthesis to convert sunlight into chemical energy.",
    },
];

// Mock Tests
const tests: ITest[] = [
    {
        id: "test1",
        title: "Computer Basics Test",
        grade: "5",
        level: "beginner",
        subject: "ComputerScience",
        passRate: 60,
        questions: questions,
    },
    {
        id: "test2",
        title: "Basic Math Test",
        grade: "5",
        level: "beginner",
        subject: "Mathematics",
        passRate: 70,
        questions: questions,
    },
    {
        id: "test3",
        title: "Biology Test",
        grade: "6",
        level: "beginner",
        subject: "Biology",
        passRate: 65,
        questions: questions,
    },
];

// Mock Chapters
const chapters: IChapter[] = [
    {
        id: "ch1",
        title: "Introduction to Computers",
        video: videos[0],
        bookContent: bookContents[0],
        test: tests[0],
    },
    {
        id: "ch2",
        title: "Basic Math Operations",
        video: videos[1],
        bookContent: bookContents[1],
        test: tests[1],
    },
    {
        id: "ch3",
        title: "Plant Biology Basics",
        video: videos[2],
        bookContent: bookContents[2],
        test: tests[2],
    },
    {
        id: "ch4",
        title: "Introduction to World Geography",
        video: videos[3],
        bookContent: bookContents[3],
        test: tests[0],  // Reusing ComputerScience test for simplicity
    },
    {
        id: "ch5",
        title: "Forces and Motion in Physics",
        video: videos[4],
        bookContent: bookContents[4],
        test: tests[2],  // Reusing Biology test for simplicity
    },
];

export default chapters;
