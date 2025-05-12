import React, { useState, useEffect } from "react";
import "../css/main.css";
import present_times from '../images/present_times.png';
import past_times from '../images/past_times.png';
import future_times from '../images/future_times.png';

const Times = () => {
  const [presentTimes, setPresentTimes] = useState([]);
  const [pastTimes, setPastTimes] = useState([]);
  const [futureTimes, setFutureTimes] = useState([]);

  const [stage, setStage] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [presentRes, pastRes, futureRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/present-time/"),
          fetch("http://127.0.0.1:8000/api/past-time/"),
          fetch("http://127.0.0.1:8000/api/future-time/")
        ]);
        setPresentTimes(await presentRes.json());
        setPastTimes(await pastRes.json());
        setFutureTimes(await futureRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setStage("list");
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setStage("details");
  };

  const handleBack = () => {
    if (stage === "details") {
      setStage("list");
      setSelectedTime(null);
    } else if (stage === "list") {
      setStage("categories");
      setSelectedCategory(null);
    }
  };

  const getTimesByCategory = (category) => {
    if (category === "present") return presentTimes;
    if (category === "past") return pastTimes;
    if (category === "future") return futureTimes;
    return [];
  };

  return (
    <div style={{ justifyContent: "center", margin: "0 auto", width: "95%" }}>
      <h2 style={{ textAlign: "center" }}>Часи</h2>

      {stage === "categories" && (
        <div className="main-text-img" style={{ marginBottom: "10px" }}>
          <div onClick={() => handleCategoryClick("present")}>
            {present_times && <img src={present_times} alt="Present" />}
          </div>
          <div onClick={() => handleCategoryClick("past")}>
            {past_times && <img src={past_times} alt="Past" />}
          </div>
          <div onClick={() => handleCategoryClick("future")}>
            {future_times && <img src={future_times} alt="Future" />}

          </div>
        </div>
      )}

      {stage === "list" && (
        <div >
          <h3 style={{ textAlign: "center" }}>Оберіть час</h3>
          <div className="main-text-img" style={{ marginBottom: "10px" }}>
            {getTimesByCategory(selectedCategory).map((time) => (
              <div key={time.id} onClick={() => handleTimeClick(time)}>
                {time.image && <img src={time.image} alt={time.name} />}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={handleBack}>Назад до категорій</button>
          </div>
        </div>
      )}

      {stage === "details" && selectedTime && (
        <div>
          <h2 style={{ textAlign: "center" }}>{selectedTime.name}</h2>
          <div>
            <strong>Опис:</strong>
            {selectedTime.description.split(/\n/g).map((p, idx) => (
              <p key={idx}>{p.trim()}</p>
            ))}
          </div>
          <div>
            <strong>Формула:</strong>
            {selectedTime.formula.split(/\n/g).map((f, idx) => (
              <p key={idx}>{f.trim()}</p>
            ))}
          </div>
          <div>
            <strong>Приклади:</strong>
            {selectedTime.examples.split(/\n/g).map((e, idx) => (
              <p key={idx}>{e.trim()}</p>
            ))}
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={handleBack}>Назад</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Times;
