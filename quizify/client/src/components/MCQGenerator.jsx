import React, { useState } from 'react';
import axios from 'axios';

const generateMCQs = async (text, numQuestions) => {
    try {
        const response = await axios.post('http://localhost:5000/mcqs/generate-mcqs', {
            text: text,
            num_questions: numQuestions
        });
        return response.data;
    } catch (error) {
        console.error('Error generating MCQs:', error);
    }
};

const MCQGenerator = () => {
    const [text, setText] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [mcqs, setMcqs] = useState([]);

    const handleGenerateMCQs = async () => {
        const mcqs = await generateMCQs(text, numQuestions);
        setMcqs(mcqs);
    };

    return (
        <div>
            <div>
                {mcqs.map((mcq, index) => (
                    <div key={index}>
                        <h3>Question {index + 1}</h3>
                        <p>{mcq[0]}</p>
                        <ul>
                            {mcq[1].map((choice, i) => (
                                <li key={i}>{choice}</li>
                            ))}
                        </ul>
                        <p>Correct Answer: {mcq[2]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MCQGenerator;
