'use client'
import { useState } from "react";
import axios from "axios";

// Define types for messages and API response
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ApiResponse {
  choices: { message: { content: string } }[]; // Extracted from response format
}

export default function ai() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post<ApiResponse>(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          model: "mistralai/Mistral-7B-Instruct-v0.2", // Using the Mistral model
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 256,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIML_API_KEY}`,
          },
        }
      );

      // Extract AI response
      const botMessage = response.data.choices[0].message.content;

      setChatHistory([
        ...chatHistory,
        { role: "user", content: userMessage },
        { role: "assistant", content: botMessage },
      ]);
      setUserMessage("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory([
        ...chatHistory,
        { role: "assistant", content: "Sorry, I couldn't process that request." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <div className="h-64 overflow-y-auto border border-gray-700 p-2">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`p-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask me something..."
          />
          <button
            className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
