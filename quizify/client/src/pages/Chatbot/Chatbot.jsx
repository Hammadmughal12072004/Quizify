import "./chatbot.css";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDRi2rhZ--yCVOkPnyjo2ojABr4FX5cM6M"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([{ isMine: false, content: "Welcome to Quizify, how may I help you?" }]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowBodyRef = useRef(null);

  const aiResponse = async (user_prompt) => {
    const prompt = user_prompt;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { isMine: true, content: newMessage },
    ]);

    setNewMessage("");

    setIsLoading(true);
    const responseMessage = await aiResponse(newMessage);
    setIsLoading(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { isMine: false, content: responseMessage },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatWindowBodyRef.current) {
      chatWindowBodyRef.current.scrollTop =
        chatWindowBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="chatbot">
        <h3>Chatbot</h3>
        <div className="chat-window">
          <div className="chat-container" ref={chatWindowBodyRef}>
            {messages.length > 0
              ? messages.map((message, index) => (
                  <div
                    key={index}
                    className="message-container"
                    style={{
                      backgroundColor: message.isMine ? "#DCF8C6" : "white",
                      float: message.isMine ? "right" : "left",
                      clear: "both",
                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      maxWidth: "70%",
                    }}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ))
              : "Hello, how may I help you?"}
            {isLoading && <div
              className="message-container"
              style={{
                backgroundColor: "white",
                float: "left",
                clear: "both",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
                maxWidth: "70%",
              }}
            >
              Typing...
            </div>}
          </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="prompt-input"
            placeholder="Message here.."
          />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
