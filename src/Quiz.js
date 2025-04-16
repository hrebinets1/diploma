import React, { useState } from 'react';

const questions = [
  {
    question: "A, B, or C??",
    options: [
      "A",
      "B",
      "C",
    ],
    answer: "B",
  },
  {
    question: "Что такое state в React?",
    options: [
      "Объект для хранения локальных данных компонента",
      "Механизм маршрутизации",
      "Компонент для отображения пользовательского интерфейса",
    ],
    answer: "Объект для хранения локальных данных компонента",
  },
  {
    question: "Какая функция используется для обновления состояния компонента?",
    options: [
      "setState",
      "useState",
      "renderState",
    ],
    answer: "setState",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleNext = () => {
    if (userAnswer === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setUserAnswer("");
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Тест по React</h1>
      {!isFinished ? (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <form>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={handleAnswerChange}
                  />{' '}
                  {option}
                </label>
              </div>
            ))}
          </form>
          <button onClick={handleNext} disabled={!userAnswer}>
            {currentQuestionIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Ваш результат: {score} из {questions.length}</h2>
          <button onClick={restartQuiz}>Пройти снова</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
