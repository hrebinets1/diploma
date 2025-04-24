import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/main.css';

const Listening = () => {
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/section/?category=listening')
      .then((response) => {
        setSections(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Не вдалося завантажити дані.');
      });
  }, []);

  const handleConfirm = () => {
    if (!selected || !selected.questions) return;

    const correct = selected.questions[current].answers.indexOf(selected.questions[current].correct);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="center-text"><h2>{error}</h2></div>;

  return (
    <div>
      <main className="main-text">
        {!selected && sections.length > 0 && (
          <div className="center-text">
            <h2>Оберіть розділ для прослуховування</h2>
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setSelected(section)}
                style={{
                  display: 'inline-block',
                  margin: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>{section.name}</div>
              </div>
            ))}
          </div>
        )}

        {selected && !showResult && selected.questions && (
          <div>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <hr style={{ margin: '20px 0' }} />

            <div className="video-container" style={{ marginBottom: '20px' }}>
              <iframe
                width="100%"
                height="315"
                src={selected.questions[current].videoSrc.replace("watch?v=", "embed/")}
                title="Listening video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p>{selected.questions[current].question}</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {selected.questions[current].answers.map((a, i) => {
                let backgroundColor = '';
                if (isConfirmed) {
                  if (i === selected.questions[current].answers.indexOf(selected.questions[current].correct)) {
                    backgroundColor = '#c8e6c9';
                  } else if (i === selectedAnswer) {
                    backgroundColor = '#ffcdd2';
                  }
                } else if (i === selectedAnswer) {
                  backgroundColor = '#d3eaff';
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

            {isConfirmed && selectedAnswer !== selected.questions[current].answers.indexOf(selected.questions[current].correct) && (
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
            <h3>Результати</h3>
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

export default Listening;
