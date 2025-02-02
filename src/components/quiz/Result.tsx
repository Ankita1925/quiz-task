import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Question {
  description: string;
  options: { description: string; is_correct: boolean }[];
  detailed_solution?: string;
  reading_material?: {
    practice_material?: { content: string[] };
    content_sections?: string[];
  };
}

interface ResultsProps {
  questions: Question[];
  userAnswers: (string | null)[];
}

const ResultsPage: React.FC<ResultsProps> = ({ questions, userAnswers }) => {
  const totalQuestions = questions.length;
  const [showDetails, setShowDetails] = useState(false);

  // Calculate the score
  const score = userAnswers.reduce((total, answer, index) => {
    const correctAnswerIndex = questions[index].options.findIndex(
      (opt) => opt.is_correct
    );
    const userAnswerIndex = answer ? parseInt(answer) : null;

    if (userAnswerIndex !== null) {
      return userAnswerIndex === correctAnswerIndex ? total + 4 : total - 1;
    }

    return total;
  }, 0);

  const percentage = Math.round((score / (totalQuestions * 4)) * 100);

  const decodeHtmlEntities = (str: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  return (
    <div
      className={`flex items-center justify-center w-screen bg-gradient-to-br from-black to-gray-700

 ${showDetails ? "h-auto" : "h-screen"
        }`} // Dynamic height class
    >
      <div
        className={`absolute inset-0 ${showDetails ? "bg-transparent" : "bg-black/40 backdrop-blur-lg bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat"
          }`}
      ></div>
      <Card className="w-full max-w-3xl mx-auto mt-10 fade-in bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="text-4xl font-bold text-green-600 animate-bounce">
            {percentage >= 80 ? "🏆 Congratulations! You Won!" : "Better Luck Next Time!"}
          </div>
          <CardTitle className="text-2xl font-bold text-orange-500 animate-fade-in-up">
            Congratulations! Quiz Complete!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center text-white animate-fade-in">
          <p className="text-lg font-semibold">Score: {score} / {totalQuestions * 4}</p>
          <p className="text-lg">You scored {percentage}%</p>
          <div className="mt-4 space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded animate-pulse" onClick={() => window.location.reload()}>
              Restart Quiz
            </Button>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-transform duration-300 hover:scale-105" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </CardContent>


        {showDetails && (
          <CardFooter className="mt-6">
            <div className="space-y-4 w-full">
              {questions.map((question, index) => {
                const userAnswerIndex = userAnswers[index]
                  ? parseInt(userAnswers[index] as string)
                  : null;
                const correctAnswerIndex = question.options.findIndex(
                  (opt) => opt.is_correct
                );

                const hasPracticeMaterial =
                  question.reading_material?.practice_material?.content?.length >
                  0;
                const hasReadingMaterial =
                  question.reading_material?.content_sections?.length > 0;

                return (
                  <div key={index} className="p-4 bg-white text-black rounded-lg">
                    <p className="font-semibold">
                      {index + 1}. {question.description}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {question.options.map((option, oIndex) => {
                        const isUserSelected = userAnswerIndex === oIndex;
                        const isCorrect = option.is_correct;
                        let optionClass = "p-2 rounded";

                        if (isUserSelected) {
                          optionClass += isCorrect
                            ? " bg-green-300"
                            : " bg-red-300";
                        } else if (isCorrect) {
                          optionClass += " bg-green-200";
                        }

                        return (
                          <li key={oIndex} className={optionClass}>
                            {option.description}
                          </li>
                        );
                      })}
                    </ul>

                    {question.detailed_solution && (
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value={`solution-${index}`}>
                          <AccordionTrigger className="font-semibold text-blue-500">
                            Explanation
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm">
                              {question.detailed_solution}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {hasPracticeMaterial && (
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value={`practice-${index}`}>
                          <AccordionTrigger className="font-semibold text-yellow-500">
                            Practice Material
                          </AccordionTrigger>
                          <AccordionContent>
                            {question.reading_material.practice_material.content.map(
                              (content, pIndex) => (
                                <p
                                  key={pIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: decodeHtmlEntities(content),
                                  }}
                                  className="text-sm mb-3"
                                />
                              )
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {hasReadingMaterial && (
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value={`reading-${index}`}>
                          <AccordionTrigger className="font-semibold text-green-500">
                            Reading Material
                          </AccordionTrigger>
                          <AccordionContent>
                            {question.reading_material.content_sections.map(
                              (section, rIndex) => (
                                <p
                                  key={rIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: decodeHtmlEntities(section),
                                  }}
                                  className="text-sm mb-3"
                                />
                              )
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                );
              })}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ResultsPage;
