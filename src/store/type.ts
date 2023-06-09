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

export type CategoryItem = {
  id: number | string
  name: string
  path: string
}

export type CategoryType = {
  id: number | string
  imgSrc: string
  name: string
  listItem: CategoryItem[]
  path: string
}
