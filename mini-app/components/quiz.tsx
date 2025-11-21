"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";

type Question = {
  text: string;
  options: string[];
  animal: string;
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: ["Meat", "Fish", "Plants", "Anything"],
    animal: "cat",
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: ["Sleeping", "Running", "Exploring", "Playing with toys"],
    animal: "dog",
  },
  {
    text: "What is your favorite activity?",
    options: ["Hunting", "Chasing", "Running", "Playing"],
    animal: "fox",
  },
  {
    text: "What is your favorite type of environment?",
    options: ["Cage", "Field", "Forest", "Stall"],
    animal: "hamster",
  },
  {
    text: "What is your favorite type of transport?",
    options: ["Horseback", "Car", "Bike", "Walk"],
    animal: "horse",
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string>("");

  const handleSelect = (qIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = option;
    setAnswers(newAnswers);
  };

  const shuffle = (arr: string[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    };
    answers.forEach((answer, idx) => {
      const q = questions[idx];
      if (answer === q.options[0]) scores[q.animal] += 1;
    });
    const best = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
    setResultAnimal(best);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(""));
    setShowResult(false);
    setResultAnimal("");
  };

  if (showResult) {
    return <QuizResult animal={resultAnimal} onRetake={resetQuiz} />;
  }

  return (
    <div className="w-full max-w-2xl">
      {questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{q.text}</h3>
          <div className="grid grid-cols-2 gap-2">
            {shuffle(q.options).map((opt) => (
              <button
                key={opt}
                className={`p-2 rounded border ${
                  answers[idx] === opt
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                }`}
                onClick={() => handleSelect(idx, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="w-full py-3 rounded bg-primary text-primary-foreground disabled:opacity-50"
        disabled={answers.includes("")}
        onClick={calculateResult}
      >
        Submit
      </button>
    </div>
  );
}
