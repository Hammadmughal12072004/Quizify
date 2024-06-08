import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        max-height: 0;
    }
    to {
        max-height: 1000px;
    }
`;

const HelpPageContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: rgba(248, 249, 250, 0.9); /* slightly transparent background for text readability */
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 1s ease-in-out;
    background-image: url('https://t3.ftcdn.net/jpg/02/66/33/90/240_F_266339022_WXAMVBMDBlGeO1cWeXOgkpzbnZR1ca4y.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    h1, h2 {
        color: #343a40;
        margin-bottom: 20px;
    }

    .search-bar {
        display: flex;
        margin-bottom: 20px;
        animation: ${fadeIn} 0.5s ease-in-out;

        input {
            flex: 1;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #dee2e6;
            border-radius: 4px 0 0 4px;
            outline: none;

            &:focus {
                border-color: #007bff;
            }
        }

        button {
            padding: 12px 20px;
            font-size: 16px;
            border: 2px solid #007bff;
            border-left: none;
            background-color: #007bff;
            color: white;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #0056b3;
            }
        }
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin-bottom: 15px;
            padding: 15px;
            border: 2px solid #dee2e6;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
            background-color: white;
            animation: ${fadeIn} 0.5s ease-in-out;
            
            &:hover {
                border-color: #007bff;
                background-color: #f1f3f5;
            }

            .answer {
                display: none;
                margin-top: 10px;
                padding-left: 20px;
                font-size: 15px;
                color: #495057;
                overflow: hidden;
                max-height: 0;
                transition: max-height 0.5s ease-in-out;
            }

            &.open .answer {
                display: block;
                animation: ${slideDown} 0.5s forwards;
            }
        }
    }

    button {
        padding: 12px 20px;
        font-size: 16px;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }

    .contact, .common-issues, .feedback {
        margin-top: 40px;
        animation: ${fadeIn} 1s ease-in-out;
    }

    form {
        display: flex;
        flex-direction: column;
        animation: ${fadeIn} 0.5s ease-in-out;

        input, textarea {
            margin-bottom: 10px;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #dee2e6;
            border-radius: 4px;
            outline: none;

            &:focus {
                border-color: #007bff;
            }
        }

        button {
            align-self: flex-start;
        }
    }

    .feedback-list {
        margin-top: 20px;

        li {
            margin-bottom: 10px;
            padding: 10px;
            border: 2px solid #dee2e6;
            border-radius: 4px;
            background-color: #fff;
        }
    }

    @media (max-width: 800px) {
        padding: 15px;

        h1, h2 {
            font-size: 1.5em;
        }
    }

    @media (max-width: 600px) {
        padding: 10px;

        h1, h2 {
            font-size: 1.2em;
        }

        .search-bar {
            flex-direction: column;

            input, button {
                width: 100%;
                border-radius: 4px;
            }

            button {
                margin-top: 10px;
            }
        }

        button {
            width: 100%;
            text-align: center;
        }

        ul li {
            padding: 10px;
            font-size: 14px;
        }

        form {
            input, textarea {
                padding: 10px;
                font-size: 14px;
            }

            button {
                padding: 10px;
                font-size: 14px;
            }
        }
    }
`;

const Help = () => {
    const [username, setUsername] = useState('');
    const [comments, setComments] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [openFAQs, setOpenFAQs] = useState({});

    // Load feedbacks from localStorage when the component mounts
    useEffect(() => {
        const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        setFeedbacks(savedFeedbacks);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFeedback = { username, comments };
        const updatedFeedbacks = [newFeedback, ...feedbacks];
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
        alert('Feedback submitted successfully!');
        setUsername('');
        setComments('');
    };

    const toggleFAQ = (index) => {
        setOpenFAQs((prevOpenFAQs) => ({
            ...prevOpenFAQs,
            [index]: !prevOpenFAQs[index],
        }));
    };

    const faqs = [
        {
            question: 'How to use model in your App?',
            answer: 'You have to upload  any pdf and text file then model will generate the quiz from that file also gives the correct answers .'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can contact customer support by emailing support@quizify.com or calling 03325550518.'
        },
        {
            question: 'Where can I find my quiz history?',
            answer: 'You can find your quiz history in the "My Quizzes" section of your dashboard.'
        },
        {
            question: 'How to create a new quiz?',
            answer: 'To create a new quiz, first you have to login and click on "Create New Quiz". Follow the instructions to set up your quiz.'
        }
    ];

    return (
        <HelpPageContainer>
            <h1>Welcome to Quizify Help Center!</h1>
            
            <div className="faq">
                <h2>Frequently Asked Questions</h2>
                <ul>
                    {faqs.map((faq, index) => (
                        <li key={index} className={openFAQs[index] ? 'open' : ''} onClick={() => toggleFAQ(index)}>
                            {faq.question}
                            <div className="answer">{faq.answer}</div>
                        </li>
                    ))}
                </ul>
            </div>
            
           
            
            <div className="contact">
                <h2>Contact Us</h2>
                <p>Email: support@quizify.com</p>
                <p>Phone: 03325550518</p>
                <p>Makers Hammad Mughal and Muhammad Aamir</p>
            </div>
            
            <div className="feedback">
                <h2>Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <textarea 
                        placeholder="Comments" 
                        rows="4" 
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit Feedback</button>
                </form>
                <ul className="feedback-list">
                    {feedbacks.map((feedback, index) => (
                        <li key={index}>
                            <strong>{feedback.username}</strong>: {feedback.comments}
                        </li>
                    ))}
                </ul>
            </div>
        </HelpPageContainer>
    );
};

export default Help;
