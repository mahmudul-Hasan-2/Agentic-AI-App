"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

export default function AIChatPage() {
  const [messages, setMessages] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsgText = inputMessage;
    // জেমিনি মাল্টি-টার্ন চ্যাট হিস্ট্রি ফরম্যাট অনুযায়ী ইউজারের মেসেজ যোগ করা
    const newHistory = [
      ...messages,
      { role: "user", parts: [{ text: userMsgText }] },
    ];

    setMessages(newHistory);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            history: messages, // আগের চ্যাট হিস্ট্রি ব্যাকএন্ডে পাঠানো হচ্ছে
            message: userMsgText, // বর্তমান মেসেজ
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // এআই-এর রিপ্লাই হিস্টরিতে যুক্ত করা
        setMessages([
          ...newHistory,
          { role: "model", parts: [{ text: data.reply }] },
        ]);
      } else {
        toast.error("Failed to get response from AI");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      toast.error("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10 transition-colors duration-300 flex flex-col h-[600px]">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
        AI Co-Pilot Chat
      </h2>

      {/* চ্যাট মেসেজ বক্স */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-gray-50 dark:bg-gray-950">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Start a conversation with your AI assistant.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 text-sm ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`p-3 rounded-lg max-w-[75%] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-mono">
            <Bot className="w-4 h-4 animate-spin text-purple-600" />
            <span>AI is typing...</span>
          </div>
        )}
      </div>

      {/* মেসেজ ইনপুট ফর্ম */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask anything about your projects..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-none focus:border-blue-600"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
