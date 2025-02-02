import { Button } from "@/components/ui/button"

interface QuestionNavigationProps {
  totalQuestions: number
  currentQuestion: number
  onQuestionChange: (index: number) => void
  userAnswers: (string | null)[]
}

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  onQuestionChange,
  userAnswers,
}: QuestionNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <Button
          key={i}
          variant={i === currentQuestion ? "default" : "outline"}
          className={`w-10 h-10 text-lg font-semibold ${i === currentQuestion ? "bg-green-600 text-white" : "bg-white/10 text-white"} 
          ${userAnswers[i] !== null ? "bg-green-500 hover:bg-green-600" : "hover:bg-white/20"} 
          rounded-lg transition-all`}
          onClick={() => onQuestionChange(i)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  )
}
