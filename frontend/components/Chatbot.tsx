"use client";
import { useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const dataset: Record<string, string> = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    goodbye: "Goodbye! Have a great day!",
    default: "Sorry, I didn't quite understand that. Can you rephrase?",
  };

  const sendMessage = (): void => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const lowercasedInput = input.toLowerCase();
    const botResponse = dataset[lowercasedInput] || dataset.default;
    const botMessage: Message = { sender: "bot", text: botResponse };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-2 right-2 w-96 bg-white shadow-lg rounded-lg">
      {/* Chatbot Header */}
      <div
        className="flex items-center justify-between bg-purple-600 text-white p-2 rounded-t-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <FaRobot className="text-2xl" />
          <div>
            <h2 className="text-lg font-bold">AIFin</h2>
          </div>
        </div>
        <span className="text-xl font-bold">{isOpen ? "−" : "+"}</span>
      </div>

      {/* Chatbot Body */}
      {isOpen && (
        <div className="p-2">
          {/* Messages Container */}
          <div className="h-80 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <FaRobot className="text-purple-600 text-2xl mr-2" />
                )}
                <div
                  className={`relative px-4 py-2 max-w-xs rounded-lg ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`absolute text-xs ${
                      msg.sender === "user" ? "right-2" : "left-2"
                    } bottom-0 text-gray-400`}
                  >
                    {/* {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} */}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <FaUser className="text-gray-500 text-2xl ml-2" />
                )}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
