export type AnswerType = {
  id: number | string
  label: string
  value: number | string
}

export type QuestionType = {
  id: number | string
  question: string
  answers: AnswerType[]
  correctAnswer?: number | string
  userAnswer?: number | string
  description?: string
}
