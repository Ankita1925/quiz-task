"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Question from "./Question";
import Timer from "./Timer";
import Results from "./Result";
import QuestionNavigation from "./QuestionNavigation";
import type { Quiz as QuizType } from "@/types/data-types";

interface QuizProps {
  quiz: QuizType;
}

export default function Quiz({ quiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null));
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswers[currentQuestionIndex]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.duration * 60);

  useEffect(() => {
    setSelectedOption(userAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, userAnswers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFinishQuiz = () => {
    const unanswered = userAnswers.includes(null);
    if (unanswered) {
      const confirmFinish = window.confirm("You have unanswered questions. Are you sure you want to finish?");
      if (confirmFinish) {
        setShowResults(true);
      }
    } else {
      setShowResults(true);
    }
  };

  const handleSaveAnswer = () => {
    if (selectedOption !== null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      setUserAnswers(updatedAnswers);
    }
  };

  if (showResults) {
    return <Results questions={quiz.questions} userAnswers={userAnswers} />;
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-black to-gray-700
">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat"></div>

      <Card className="w-full max-w-3xl mx-auto mt-5 fade-in bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl text-white">
        <img src="/images/icon.png" alt="Quiz Icon" className="w-100 h-60 mx-auto" />
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold ">{quiz.title}</CardTitle>
            <div className="text-lg text-red-500">
              <Timer timeRemaining={timeRemaining} />
            </div>
          </div>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={handleFinishQuiz}
          >
            Finish Quiz
          </Button>
        </CardHeader>

        <CardContent>
          <QuestionNavigation
            totalQuestions={quiz.questions.length}
            currentQuestion={currentQuestionIndex}
            onQuestionChange={setCurrentQuestionIndex}
            userAnswers={userAnswers}
          />
          <Question
            question={quiz.questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="text-lg">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
          <div className="space-x-2">
            {currentQuestionIndex > 0 && (
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                Previous
              </Button>
            )}
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
              onClick={handleSaveAnswer}
              disabled={selectedOption === null}
            >
              Save
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 && (
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
