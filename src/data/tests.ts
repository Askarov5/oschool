import { ITest } from "@/lib/types";

export const testData: ITest = {
  id: "test-0001",
  title: "Math Quiz",
  grade: "3",
  level: "beginner",
  subject: "Mathematics",
  passRate: 80,
  questions: [
    {
      id: 1,
      type: "multipleChoice",
      questionText: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      answer: "4",
      explanation: "2 + 2 equals 4.",
    },
    {
      id: 2,
      type: "trueFalse",
      questionText: "Is the sky blue?",
      options: ["True", "False"],
      answer: "True",
      explanation: "The sky appears blue during the day.",
    },
    {
      id: 3,
      type: "multipleChoice",
      questionText: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
      explanation: "The capital of France is Paris.",
    },
    {
      id: 4,
      type: "trueFalse",
      questionText: "Is 5 greater than 10?",
      options: ["True", "False"],
      answer: "False",
      explanation: "5 is less than 10.",
    },
    {
      id: 5,
      type: "multipleChoice",
      questionText: "What is the result of 10 - 6?",
      options: ["4", "6", "5", "3"],
      answer: "4",
      explanation: "10 - 6 equals 4.",
    },
  ],
};
