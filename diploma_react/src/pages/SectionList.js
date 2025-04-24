import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Замените URL на адрес вашего API
    axios.get('http://127.0.0.1:8000/api/section/1/')  // или '/api/section/1/'
      .then((response) => {
        setSections([response.data]); // Преобразуем полученные данные в массив, если нужен один элемент
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Section: {sections[0].name}</h2>
      <p>{sections[0].description}</p>
      <h3>Questions:</h3>
      <ul>
        {sections[0].questions.map((question, index) => (
          <li key={index}>
            <strong>{question.text}</strong>
            <ul>
              {question.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p><em>Correct answer: {question.correct_answer}</em></p>
            <p>{question.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
