import { Subject, ISubject, TGrade } from "../lib/types";

const subjectsData: ISubject[] = [
    {
        id: "sub1",
        title: Subject.ComputerScience,
        description: "An introduction to basic computer concepts, digital literacy, and programming.",
        grade: 5,
        chapters: ["ch1", "ch2", "ch3"]
    },
    {
        id: "sub2",
        title: Subject.Mathematics,
        description: "Core math concepts, including arithmetic, fractions, and basic geometry.",
        grade: 5,
        chapters: ["ch4", "ch5", "ch6"]
    },
    {
        id: "sub3",
        title: Subject.Biology,
        description: "An introduction to plant and animal biology, ecosystems, and cells.",
        grade: 6,
        chapters: ["ch7", "ch8", "ch9"]
    },
    {
        id: "sub4",
        title: Subject.Geography,
        description: "World geography, continents, oceans, and environmental studies.",
        grade: 6,
        chapters: ["ch10", "ch11", "ch12"]
    },
    {
        id: "sub5",
        title: Subject.Physics,
        description: "Fundamentals of physics, including motion, forces, and energy.",
        grade: 7,
        chapters: ["ch13", "ch14", "ch15"]
    },
    {
        id: "sub6",
        title: Subject.English,
        description: "Grammar, vocabulary, and basic literature analysis.",
        grade: 7,
        chapters: ["ch16", "ch17", "ch18"]
    },
    {
        id: "sub7",
        title: Subject.Algebra,
        description: "Introduction to algebraic concepts, equations, and problem-solving.",
        grade: 8,
        chapters: ["ch19", "ch20", "ch21"]
    },
    {
        id: "sub8",
        title: Subject.Chemistry,
        description: "Basic chemistry, including elements, compounds, and reactions.",
        grade: 8,
        chapters: ["ch22", "ch23", "ch24"]
    },
    {
        id: "sub9",
        title: Subject.History,
        description: "Study of significant historical events and civilizations.",
        grade: 9,
        chapters: ["ch25", "ch26", "ch27"]
    },
    {
        id: "sub10",
        title: Subject.Literature,
        description: "Analysis of classic and modern literature.",
        grade: 9,
        chapters: ["ch28", "ch29", "ch30"]
    }
];

export default subjectsData;
