export type TQuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer';

export interface IQuestion {
    id: number;
    type: TQuestionType;
    questionText: string;
    options?: string[];
    answer: string | boolean;
    explanation?: string;
}

export interface ITest {
    id: string;
    title: string;
    grade: string;
    level: string;
    subject: string;
    passRate: number;
    questions: IQuestion[];
}

export interface ICurriculum {
    id: string
    name: string
    description: string
    subjects: string[]
    chapters: { id: string; name: string; completed: boolean }[]
    progress: number
    shared: boolean
}

export interface IMessage {
    id: number
    text: string
    sender: "user" | "bot"
}

// Subject

export enum Subject {
    //Science
    Mathematics = 'Mathematics',
    Algebra = 'Algebra',
    Geometry = 'Geometry', 
    PreCalculus = 'Pre-Calculus',
    Calculus = 'Calculus',
    Trigonometry = 'Trigonometry',
    Science = 'Science',
    Biology = 'Biology',
    Chemistry = 'Chemistry',
   
    ComputerScience = 'Computer Science',
    Physics = 'Physics',
    Astronomy = 'Astronomy',

    // Languages
    English = 'English',
    Literature = 'Literature',
    KyrgyzLanguage = 'Kyrgyz Language',
    KyrgyzLiterature = 'Kyrgyz Literature',
    RussianLanguage = 'Russian Language',
    RussianLiterature = 'Russian Literature',

    // Social Studies
    WorldHistory = 'World History',
    History = 'History',
    HistoryOfKyrgyzstan = 'History of Kyrgyzstan',

    Geography = 'Geography',

    SocialStudies = 'Social Studies',
    Arts = 'Arts', // изобразительное искусство (изо)
    Music = 'Music',
    LifeSafetyBasics = 'Life Safety Basics', // основы безопасности жизнедеятельности (ОБЖ)
    LaborStudies = 'Labor Studies', // труд

    Economics = 'Economics',
    GovernmentAndLaw = 'Government and Law',
}

export interface IVideo {
    id: string;
    link: string;
    title: string;
    // additional metadata, like title or duration
}

export interface IBookContent {
    id: string;
    title: string;
    content: string;
    // potential additional metadata, like page numbers or chapter name
}

export interface IChapter {
    id: string;
    title: string;
    video: IVideo;
    bookContent: IBookContent;
    test: ITest;
    // additional teaching materials could be added here if needed
}

export type TGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 ;

export interface ISubject {
    id: string;
    title: Subject;
    description?: string;
    grade: TGrade;
    nativeLanguage?: 'Kyrgyz' | 'Russian'; 
    chapters: string[]; // id of IChapter
}