import React, { useState, useEffect } from 'react';
import '../css/main.css';

const quizzes = {
  general: {
    title: "A Listening",
    preview: "Перегляньте відео та дайте відповіді на запитання.",
    readingText: (
        <div className="video-wrapper">
        <iframe
          width="560"
          height="315"
          position="absolute"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      
    ),
    questions: [
      {
        question: "Timberland employees do not receive a salary for the 40 hours they work on community and social projects",
        answers: ["Right", "Wrong", "Doesn't say"],
        correct: 1,
      },
      {
        question: "Employees at Danone are allowed to spend twelve months working on a project in a developing country",
        answers: ["Right", "Wrong", "Doesn't say"],
        correct: 2,
      },
    ],
  },
  literature: {
    title: "B Listening",
    preview: "Прочитайте текст та дайте відповіді на запитання.",
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

const Listening = () => {
  useEffect(() => {
    document.title = "Listening page";
  }, [] );

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
            <h2>Оберіть розділ, який бажаєте пройти</h2>
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
            <h3>{selected.title}</h3>
            <p>{selected.preview}</p>

            <div style={{ marginBottom: '20px' }}>
              {typeof selected.readingText === 'string'
                ? selected.readingText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)
                : selected.readingText}
            </div>

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

export default Listening;
