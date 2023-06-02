import { Tag, Typography } from 'antd'
import Button from '../../../../components/Button'
import React, { useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import RadioGroup from '@/components/RadioGroup'
import { twMerge } from 'tailwind-merge'

const Exam = () => {
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
    {
      id: '11',
      question: '[11]. Nội dung đề bài câu 11',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '12',
      question: '[12]. Nội dung đề bài câu 12',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '13',
      question: '[13]. Nội dung đề bài câu 13',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '14',
      question: '[14]. Nội dung đề bài câu 14',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '15',
      question: '[15]. Nội dung đề bài câu 15',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '16',
      question: '[16]. Nội dung đề bài câu 16',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '17',
      question: '[17]. Nội dung đề bài câu 17',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '18',
      question: '[18]. Nội dung đề bài câu 18',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '19',
      question: '[19]. Nội dung đề bài câu 19',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '20',
      question: '[20]. Nội dung đề bài câu 20',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '21',
      question: '[21]. Nội dung đề bài câu 21',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '22',
      question: '[22]. Nội dung đề bài câu 22',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '23',
      question: '[23]. Nội dung đề bài câu 23',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '24',
      question: '[24]. Nội dung đề bài câu 24',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
    {
      id: '25',
      question: '[25]. Nội dung đề bài câu 25',
      answers: [
        { id: 1, label: 'Đáp án A', value: '1' },
        { id: 2, label: 'Đáp án B', value: '2' },
        { id: 3, label: 'Đáp án C', value: '3' },
        { id: 4, label: 'Đáp án D', value: '4' },
      ],
    },
  ]

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
  const handleGoToScore = () => {
    navigate('/test/score')
  }
  return (
    <div className="w-full">
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="py-7 xl:px-32 sm:px-20 max-sm:px-5">
        <div className="shadow rounded-[20px] text-black h-[537px]">
          <div className="bg-[#F5F5F5] flex items-center justify-end rounded-t-[20px] py-3 px-6">
            <Tag className="font-bold md:text-2xl max-md:text-lg rounded-xl text-black bg-[#D9D9D9] lg:py-3 max-lg:py-2 lg:px-7 max-lg:px-4">
              119:59
            </Tag>
          </div>
          <div className="p-8">
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
        </div>
        <div className="flex gap-5 max-[400px]:gap-2 justify-end max-md:justify-center py-6">
          <Button
            onClick={handlePrevQuestion}
            type="outline"
            label="Quay lại"
            className="hover:bg-[#FB3357] hover:text-white"
          />
          <Button
            onClick={handleNextQuestion}
            type="primary"
            label="Lưu và tiếp tục"
            className="hover:opacity-80"
          />
          <Button
            onClick={handleGoToScore}
            type="secondary"
            label="Nộp bài"
            className="hover:opacity-80"
          />
        </div>
        <div className="bg-[#F5F5F5] pt-7 pb-10 px-8 flex flex-wrap gap-4 justify-center">
          {questions.map((item, quesIndex) => {
            const isAnswered = userAnswers[quesIndex] !== undefined
            const isActive = currentQuestionIndex === quesIndex

            return (
              <div
                key={item.id}
                onClick={() => setCurrentQuestionIndex(quesIndex)}
                className={twMerge(
                  'relative w-7 h-7',
                  'text-aquaGreen flex items-center justify-center cursor-pointer',
                  'rounded-full border border-solid border-aquaGreen',
                  isAnswered ? 'bg-aquaGreen text-white' : 'bg-white',
                )}
              >
                {quesIndex + 1}
                {isActive && (
                  <span className="w-2 h-2 rounded-full border bg-red-500 absolute -bottom-3" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Exam
