export interface IQuestion {
    id: number;
    type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
    questionText: string;
    options?: string[];
    answer: string;
    explanation?: string;
}

export interface ITest {
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