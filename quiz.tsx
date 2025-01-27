import React, { useState } from 'react';

const Quiz = () => {
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris'],
            answer: 'Paris'
        },
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5'],
            answer: '4'
        }
    ];

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name='q${index + 1}']:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setSubmitted(true);
    };

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {questions.map((q, index) => (
                <div className="question" key={index}>
                    <p>{index + 1}. {q.question}</p>
                    {q.options.map((option, i) => (
                        <label key={i}><input type="radio" name={`q${index + 1}`} value={option} /> {option}</label><br />
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {submitted && <div className="result">Your score: {score}/{questions.length}</div>}
        </div>
    );
};

export default Quiz;
