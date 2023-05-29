import { Typography } from 'antd'
import Button from '@/components/Button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RadioGroup from '@/components/RadioGroup'
import './style.scss'
import { twMerge } from 'tailwind-merge'
const lessonInfo = { title: ' [1 ~ 10] Cách đọc Kanji N4' }
const LessonDetail = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const currentAnswer = userAnswers[currentQuestionIndex]
  const questions = [
    {
      id: '1',
      question: '[01]. Nội dung đề bài câu 1',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '2',
      question: '[02]. Nội dung đề bài câu 2',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '3',
      question: '[03]. Nội dung đề bài câu 3',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '4',
      question: '[04]. Nội dung đề bài câu 4',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '5',
      question: '[05]. Nội dung đề bài câu 5',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '6',
      question: '[06]. Nội dung đề bài câu 6',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '7',
      question: '[07]. Nội dung đề bài câu 7',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '8',
      question: '[08]. Nội dung đề bài câu 8',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '9',
      question: '[09]. Nội dung đề bài câu 9',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '10',
      question: '[10]. Nội dung đề bài câu 10',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
  ]
  const handleMoveScore = () => {
    navigate('/exercise/score')
  }
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => {
      if (prevIndex >= questions.length - 1) return questions.length - 1
      return prevIndex + 1
    })
  }
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(prevIndex => {
      if (prevIndex <= 0) return 0
      return prevIndex - 1
    })
  }

  const handleSelectAnswer = (userAnswer: string) => {
    const newUserAnswers = userAnswers.slice()
    newUserAnswers[currentQuestionIndex] = userAnswer
    setUserAnswers(newUserAnswers)
  }

  return (
    <div className="w-full">
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          {lessonInfo.title}
        </Typography>
      </div>
      <div className="py-7 xl:px-32 sm:px-20 max-sm:px-5">
        <div className="shadow rounded-3xl p-7 h-96 max-[350px]:h-80 text-black font-normal">
          <div className="mb-8">
            {questions[currentQuestionIndex]?.question}
          </div>
          <div className="text-black">
            <RadioGroup
              value={currentAnswer || ''}
              options={questions[currentQuestionIndex].answers}
              onChange={value => handleSelectAnswer(value.toString())}
            />
          </div>
        </div>
        <div className="flex gap-5 max-[400px]:gap-2 justify-end max-md:justify-center py-6">
          <Button
            onClick={handlePrevQuestion}
            type="outline"
            label="Quay lại"
            className="hover:bg-primary hover:text-white"
          />
          <Button
            onClick={handleNextQuestion}
            type="primary"
            label="Lưu và tiếp tục"
            className="hover:opacity-80"
          />
          <Button
            onClick={handleMoveScore}
            type="secondary"
            label="Nộp bài"
            className="hover:opacity-80"
          />
        </div>
        <div className="bg-[#F5F5F5] pt-7 pb-10 px-5 flex justify-center sm:gap-5 max-sm:gap-5 max-[415px]:grid max-[415px]:grid-cols-5 max-[415px]:gap-2">
          {questions.map((item, quesIndex) => {
            const isAnswered = userAnswers[quesIndex] !== undefined
            const isActive = currentQuestionIndex === quesIndex

            return (
              <div
                onClick={() => setCurrentQuestionIndex(quesIndex)}
                key={item.id}
                className={twMerge(
                  'w-7 h-7 rounded-[50%] border border-solid border-aquaGreen text-aquaGreen flex items-center justify-center cursor-pointer',
                  isAnswered ? 'bg-aquaGreen text-white' : 'bg-white',
                  isActive ? 'active' : '',
                )}
              >
                {quesIndex + 1}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LessonDetail
