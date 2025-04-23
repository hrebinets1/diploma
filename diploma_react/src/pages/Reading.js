import { useEffect } from 'react';
import React, { useState } from 'react';
import '../css/main.css';
import reading from '../images/reading.png';
import listening from '../images/listening.png';

const quizzes = {
  general: {
    title: "A Reading",
    preview: "Прочитайте текст та дайте відповіді на запитання. Якщо інформації недостатньо для позитивної чи негативної відповіді, оберіть `Doesn't say`",
    readingText: "A COMMITMENT TO VOLUNTEERISM\n\nVolunteerism – what does it mean?\n\n The clothing manufacturer, Timberland, is one of many large companies that are committed to volunteerism. The company encourages staff to spend up to 40 paid hours a year on community and social projects. The community benefits from the company’s resources, staff gain new skills, and teamwork improves.\n\nThe French food manufacturer, Danone, allows its employees to spend time in developing countries, working on projects in areas like conservation, teaching, caring, or in building. They live in the community and work alongside the local people. This helps them to learn new skills, so they can share their own skills and, at the same time, they gain new ideas and insights, and learn to communicate better.\n\nA team from the banking group, HBOS, volunteered to help build an extension to a school in La Esperanza in Honduras. Linda Marshall, the project leader, said, “I learnt that when the aim is compelling, it is easier to get objectives are agreed and everyone buys in to them. This created a strong team spirit. It was a big success.”\n\nWhat can volunteering do for you?\n\n For instance, Caroline Harskin, is in charge of a volunteer project to redecorate a community centre for the elderly in Chicago. Managing a project is a new experience for her. She is learning how to organize a schedule so that they are able to complete the project before its deadline. She also has to deal with the budget, which is fairly limited, so she has to spend carefully. And every few days, she gets updates from her project team to check on progress and decide if they need more resources. She finds working on this project very rewarding and is pleased to be learning new skills.",
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
    imageSrc: reading,
  },
  literature: {
    title: "B Reading",
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
    imageSrc: listening,
  },
};

const Reading = () => {


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
            {selected.readingText.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

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

export default Reading;
