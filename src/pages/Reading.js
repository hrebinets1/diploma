import React, { useState } from 'react';
import '../css/main.css';

const quizzes = {
  general: {
    title: "General Knowledge",
    readingText: "This quiz covers general topics. Answer each question carefully.",
    questions: [
      {
        question: "What is the capital of France?",
        answers: ["Paris", "Madrid", "Berlin", "Rome"],
        correct: 0,
      },
      {
        question: "Which planet is the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1,
      },
    ],
  },
  literature: {
    title: "Literature",
    readingText: "This quiz focuses on literature. Choose the correct author or work.",
    questions: [
      {
        question: "Who wrote '1984'?",
        answers: ["Orwell", "Huxley", "Shakespeare", "Tolkien"],
        correct: 0,
      },
      {
        question: "Which genre is 'Hamlet'?",
        answers: ["Comedy", "Romance", "Tragedy", "Sci-Fi"],
        correct: 2,
      },
    ],
  },
};

const Reading = () => {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleQuizSelect = (key) => {
    setSelected(quizzes[key]);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (index) => {
    if (index === selected.questions[current].correct) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < selected.questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setSelected(null);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div>
      <main className="main-text">
        {!selected && (
          <div className="center-text">
            <h2>Choose a Quiz</h2>
            {Object.entries(quizzes).map(([key, quiz]) => (
              <button
                key={key}
                onClick={() => handleQuizSelect(key)}
                style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        )}

        {selected && !showResult && (
          <div>
            <h3>Reading Text</h3>
            <p>{selected.readingText}</p>

            <hr style={{ margin: '20px 0' }} />

            <h3>{selected.questions[current].question}</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {selected.questions[current].answers.map((a, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <button onClick={() => handleAnswer(i)}>{a}</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showResult && (
          <div className="center-text">
            <h3>Quiz Complete!</h3>
            <p>You scored {score} out of {selected.questions.length}</p>
            <button onClick={reset} style={{ marginTop: '10px' }}>← Back to Selection</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reading;
