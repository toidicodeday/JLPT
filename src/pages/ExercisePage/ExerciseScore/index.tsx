import { Divider } from 'antd'
import React from 'react'
import './style.scss'
import CardAnswer from '@/components/CardAnswer'
import PageTitle from '@/components/PageTitle'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const exerciseInfo = { title: '[1 ~ 10] Cách đọc Kanji N4' }

const questions = [
  {
    id: '1',
    question: '[01]. Nội dung đề bài câu 1',
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '2',
    description,
    userAnswer: '1',
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
    correctAnswer: '3',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
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
    correctAnswer: '1',
    description,
    userAnswer: '1',
    answers: [
      { id: 1, label: 'Đáp án A', value: '1' },
      { id: 2, label: 'Đáp án B', value: '2' },
      { id: 3, label: 'Đáp án C', value: '3' },
      { id: 4, label: 'Đáp án D', value: '4' },
    ],
  },
]

const ExerciseScore = () => {
  const handleScrollToContent = (quesId: string) => {
    const element = document.getElementById(quesId)
    if (element) {
      const heightTop = element.getBoundingClientRect().top
      console.log('heightTop', heightTop)

      window.scrollTo({
        left: 0,
        top: heightTop - 100,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full">
      <PageTitle label={exerciseInfo.title} />
      <div className="py-7 xl:px-32 sm:px-20 max-sm:px-5 ">
        <div className="flex items-center max-[500px]:flex-col p-7 mb-7 lg:gap-10 max-lg:gap-5">
          <span className="bg-secondPrimary py-2 px-5 rounded-xl font-bold lg:text-3xl max-lg:text-xl text-primary">
            8/10
          </span>
          <div className="flex items-center max-[500px]:grid max-[500px]:grid-cols-5 lg:gap-5 max-lg:gap-2 overflow-hidden">
            {questions?.map((item, index) => {
              const isCorrect = item.userAnswer === item.correctAnswer

              return (
                <div
                  key={item.id}
                  onClick={() => handleScrollToContent(item.id)}
                  className={`w-7 h-7   rounded-full flex items-center justify-center text-white cursor-pointer ${
                    isCorrect ? 'bg-aquaGreen' : 'bg-selectiveYellow'
                  }`}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
        </div>
        <div className="test-answer p-8 rounded-3xl text-black">
          {questions?.map((item, index) => (
            <div key={item.id} id={item.id} className="py-3">
              {index !== 0 && <Divider />}
              <CardAnswer question={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExerciseScore
