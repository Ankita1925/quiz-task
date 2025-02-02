"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Quiz from "./Quiz"
import { Quiz as QuizType } from "@/types/data-types"

interface QuizLandingProps {
  quiz: QuizType
}

export default function QuizLanding({ quiz }: QuizLandingProps) {
  const [quizStarted, setQuizStarted] = useState(false)

  if (quizStarted) {
    return <Quiz quiz={quiz} />
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-black to-gray-700 animate-slide-in">
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat " />

      <Card className="relative z-10 w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-lg p-6 animate-float">
        <CardHeader className="text-center">
          <h2 className="text-3xl font-bold text-white animate-wiggle">{quiz.title}</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <img src="/images/icon.png" alt="Quiz Icon" className="w-100 h-60 mb-4 " />
            <p className="text-lg font-semibold text-gray-300">{quiz.topic}</p>
            <ul className="mt-4 space-y-2 text-gray-300 animate-fade-in">
              <li>⏳ Duration: {quiz.duration} min</li>
              <li>❓ Questions: {quiz.questions_count}</li>
              <li>✅ Marks per correct answer: {quiz.correct_answer_marks}</li>
              <li>❌ Negative marks: {quiz.negative_marks}</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="mt-6">
          <Button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-3 rounded-xl transition-transform  animate-pulse"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}