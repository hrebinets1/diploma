import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Сторінка профілю";

        // Получаем токен из localStorage или другого места
        const token = localStorage.getItem('access_token');

        if (token) {
            fetch('http://127.0.0.1:8000/api/my-results/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(data => {
                    setTestResults(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            console.log("Нет токена авторизации.");
        }
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Головна сторінка профілю</h2>

            {loading ? (
                <p>Завантаження...</p>
            ) : (
                <div>
                    <h3>Результати тестів:</h3>
                    {testResults.length > 0 ? (
                        <ul>
                            {testResults.map((result, index) => (
                                <li key={index}>
                                    <strong>{result.section.name}</strong>: {result.score} балів
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Немає результатів тестів.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
