import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types/data-types"; // Import the Question type

interface QuestionProps {
  question: Question;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
}

export default function Question({
  question,
  selectedOption,
  setSelectedOption,
}: QuestionProps) {
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold">{question.description}</h2>

      <RadioGroup
        value={selectedOption || ""}
        onValueChange={(value) => {
          setSelectedOption(value);
        }}
      >
        {question.options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem
              value={index.toString()}
              id={`option-${option.id}`}
            />
            <Label htmlFor={`option-${option.id}`}>{option.description}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}