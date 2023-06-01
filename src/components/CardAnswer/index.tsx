import { Radio } from 'antd'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import AnswerDescription from '../AnswerDescription'
import './style.scss'
import { QuestionType } from '@/store/type'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: QuestionType
}

const CardAnswer = ({ question }: Props) => {
  return (
    <div key={question.id}>
      <div className="mb-8 font-bold">{question.question}</div>
      {question.answers.map((answer, index) => {
        const isUserSelect = answer.value === question.userAnswer

        const isAnswerCorrect = answer.value === question.correctAnswer
        const isAnswerWrong = answer.value !== question.correctAnswer

        const isUserCorrect = isUserSelect && isAnswerCorrect
        const isUserWrong = isUserSelect && isAnswerWrong

        return (
          <div key={answer.id} className="flex gap-7 mb-5 items-center">
            <div className="w-2 grid place-items-center">
              {isUserCorrect && <MdDone className="text-base text-aquaGreen" />}
              {isUserWrong && (
                <AiOutlineClose className="text-base text-selectiveYellow" />
              )}
            </div>
            <Radio
              checked={isUserSelect || isAnswerCorrect}
              className={twMerge(
                isAnswerCorrect ? 'success' : '',
                isUserWrong ? 'wrong' : '',
              )}
              disabled
            />
            <p
              className={twMerge(
                isAnswerCorrect ? 'text-aquaGreen' : '',
                isUserWrong ? 'text-selectiveYellow' : '',
              )}
            >
              {answer.label}
            </p>
          </div>
        )
      })}
      <AnswerDescription text={question.description} />
    </div>
  )
}

export default CardAnswer
