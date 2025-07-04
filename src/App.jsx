import { useState, useEffect } from 'react'
import './App.css'

const questions = [
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
    answer: "Ankara",
    point: 10,
  },
  {
    question: "Dünyanın en büyük okyanusu hangisidir?",
    options: ["Atlantik", "Pasifik", "Hint", "Arktik"],
    answer: "Pasifik",
    point: 10,
  },
  {
    question: "Güneş sisteminde kaç gezegen vardır?",
    options: ["7", "8", "9", "10"],
    answer: "8",
    point: 10,
  },
  {
    question: "Hangi element su molekülünde bulunmaz?",
    options: ["Hidrojen", "Oksijen", "Karbon", "Hiçbiri"],
    answer: "Karbon",
    point: 10,
  },
  {
    question: "Türkiye hangi kıtada yer alır?",
    options: ["Avrupa", "Asya", "Afrika", "Asya ve Avrupa"],
    answer: "Asya ve Avrupa",
    point: 10,
  },
];

function App() {
  const [current, setCurrent] = useState(-1);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    let timer;
    if (current >= 0 && !finished) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        handleAnswer(null); // Süre bitince cevap verilmemiş say
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, current, finished]);

  function startQuiz() {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
    setTimeLeft(10);
  }

  function handleAnswer(option) {
    const currentQuestion = questions[current];

    if (option === currentQuestion.answer) {
      setScore(prev => prev + currentQuestion.point);
    } else {
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        yourAnswer: option || "(Cevap verilmedi)",
        correctAnswer: currentQuestion.answer
      }]);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setTimeLeft(10);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="app">
      <h1>🧠 Genel Kültür Quiz</h1>

      {current === -1 && (
        <button className="start-btn" onClick={startQuiz}>Quize Başla</button>
      )}

      {current >= 0 && !finished && (
        <div className="question-box">
          <div className="score">Puan: {score}</div>
          <div className="timer">⏳ {timeLeft} saniye</div>
          <h2>{questions[current].question}</h2>
          <div className="options">
            {questions[current].options.map((option, i) => (
              <button
                className="option-btn"
                key={i}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {finished && (
        <div className="result">
          <h2>Quiz Bitti 🎉</h2>
          <p>Toplam Puanınız: {score}</p>
          {wrongAnswers.length > 0 && (
            <div className="review">
              <h3>Yanlış Yaptığınız Sorular</h3>
              <ul>
                {wrongAnswers.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.question}</strong><br />
                    ❌ Sizin cevabınız: {item.yourAnswer}<br />
                    ✅ Doğru cevap: {item.correctAnswer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={startQuiz}>Tekrar Başla</button>
        </div>
      )}
    </div>
  );
}

export default App;
