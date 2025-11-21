"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Props = {
  animal: string;
  onRetake: () => void;
};

export default function QuizResult({ animal, onRetake }: Props) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        You are most like a {animalNames[animal]}!
      </h2>
      <img
        src={imageMap[animal]}
        alt={animalNames[animal]}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={`I just took the Animal Quiz and I'm a ${animalNames[animal]}! ${url}`} />
      <button
        className="mt-4 py-2 px-4 rounded bg-secondary text-secondary-foreground"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
