import { useEffect } from 'react';
import React, { useState } from 'react';
import '../css/main.css';
import reading from '../images/reading.png';
import listening from '../images/listening.png';

const quizzes = {
  general: {
    title: "A Reading",
    preview: "Прочитайте текст та дайте відповіді на запитання. Якщо інформації недостатньо для позитивної чи негативної відповіді, оберіть `Doesn't say`",
    questions: [
      {
        question: "Timberland employees do not receive a salary for the 40 hours they work on community and social projects",
        answers: ["Right", "Wrong", "Doesn't say"],
        correct: 1,
        errorText: "Right is answer 1",
      },
      {
        question: "Employees at Danone are allowed to spend twelve months working on a project in a developing country",
        answers: ["Right", "Wrong", "Doesn't say"],
        correct: 2,
        errorText: "Right is answer 'Doesn't say'",
      },
    ],
    imageSrc: reading,
  },
  literature: {
    title: "B Reading",
    preview: "Прочитайте текст та дайте відповіді на запитання.",
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
    imageSrc: listening,
  },
};

const Grammar = () => {


  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);

  const handleQuizSelect = (key) => {
    setSelected(quizzes[key]);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsConfirmed(false);
    setAnswersHistory([]);
  };

  const handleConfirm = () => {
    const correct = selected.questions[current].correct;
    if (selectedAnswer === correct) {
      setScore(score + 1);
    }
    setAnswersHistory([
      ...answersHistory,
      {
        question: selected.questions[current].question,
        selected: selectedAnswer,
        correct: correct,
        answers: selected.questions[current].answers,
      },
    ]);
    setIsConfirmed(true);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < selected.questions.length) {
      setCurrent(next);
      setSelectedAnswer(null);
      setIsConfirmed(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setSelected(null);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsConfirmed(false);
    setAnswersHistory([]);
  };

  useEffect(() => {
    document.title = "Reading skills";
  }, [] );

  return (
    <div>
      <main className="main-text">
        {!selected && (
            <div className="center-text">
                <h2>Оберіть розділ, який бажаєте пройти</h2>
                {Object.entries(quizzes).map(([key, quiz]) => (
                <div
                    key={key}
                    onClick={() => handleQuizSelect(key)}
                    style={{
                    display: 'inline-block',
                    margin: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    }}
                >
                    <img
                    src={quiz.imageSrc}
                    alt={quiz.title}
                    style={{height: "200px", width: "600px", display: 'flex', direction: 'column'}}
                    />
                    <div>{quiz.title}</div>
                </div>
                ))}
            </div>
        )}


        {selected && !showResult && (
          <div>
            <h3>{selected.title}</h3>
            <p>{selected.preview}</p>
            <hr style={{ margin: '20px 0' }} />

            <h3>{selected.questions[current].question}</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {selected.questions[current].answers.map((a, i) => {
                let backgroundColor = '';
                if (isConfirmed) {
                  if (i === selected.questions[current].correct) {
                    backgroundColor = '#c8e6c9'; // green
                  } else if (i === selectedAnswer) {
                    backgroundColor = '#ffcdd2'; // red
                  }
                } else if (i === selectedAnswer) {
                  backgroundColor = '#d3eaff'; // selected
                }

                return (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    <button
                      disabled={isConfirmed}
                      onClick={() => setSelectedAnswer(i)}
                      style={{
                        padding: '10px',
                        width: '100%',
                        textAlign: 'left',
                        cursor: isConfirmed ? 'default' : 'pointer',
                        backgroundColor,
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }}
                    >
                      {a}
                    </button>
                  </li>
                );
              })}
            </ul>

            {!isConfirmed && selectedAnswer !== null && (
            <button onClick={handleConfirm} className="confirm-btn">
                Підтвердити відповідь
            </button>
            )}

            {isConfirmed && selectedAnswer !== selected.questions[current].correct && (
            <div style={{ color: 'red', marginTop: '10px', marginBottom: '10px' }}>
                {selected.questions[current].errorText}
            </div>
            )}

            {isConfirmed && (
            <button onClick={handleNext} className="next-btn">
                Наступне питання →
            </button>
            )}

          </div>
        )}

        {showResult && (
          <div className="center-text">
            <h3>Результати тесту</h3>
            <p>Ви набрали {score} з {selected.questions.length} балів</p>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Питання</th>
                  <th>Ваша відповідь</th>
                  <th>Правильна відповідь</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
                {answersHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.question}</td>
                    <td>{entry.answers[entry.selected]}</td>
                    <td>{entry.answers[entry.correct]}</td>
                    <td>{entry.selected === entry.correct ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={reset} style={{ marginTop: '20px' }}>
              ← До вибору розділу
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Grammar;
