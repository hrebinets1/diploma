import React, { useState } from 'react';

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "Madrid", "Berlin", "Rome"],
    correct: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: ["Leo Tolstoy", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
    correct: 1,
  }
];

const readingText = `
Welcome to the quiz! 

Before you begin, take a moment to read this short passage:

This quiz will test your general knowledge. Read each question carefully and select the best answer. Good luck!
`;

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 📚 Always-visible reading text */}
      <div className="bg-gray-100 p-4 rounded shadow text-sm whitespace-pre-wrap">
        <h2 className="text-xl font-semibold mb-2">Reading Text</h2>
        {readingText}
      </div>

      {/* 🧠 Quiz block */}
      <div className="p-4 border rounded shadow">
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg">You scored {score} out of {questions.length}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <ul>
              {questions[currentQuestion].answers.map((answer, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAnswerClick(index)}
                    className="w-full text-left p-2 mb-2 bg-blue-100 hover:bg-blue-300 rounded"
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
