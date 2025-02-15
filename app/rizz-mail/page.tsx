"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Send, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function Home() {
  // Valentine Letter Generator State
  const [name, setName] = useState("");
  const [rizzLevel, setRizzLevel] = useState([3]);
  const [features, setFeatures] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");
  const [loading, setLoading] = useState(false);

  // Chat State
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const generateMail = async () => {
    setLoading(true);
    try {
      const formattedFeatures = Array.isArray(features) ? features.join(", ") : String(features);
  
      const response = await axios.post(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            
            { 
              role: "user", 
              content: `Generate a romantic email for ${name} based on the following features: ${formattedFeatures} and a rizz level of ${rizzLevel[0]} out of 5` 
            },
          ],
          temperature: 0.7,
          max_tokens: 256,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer e40b806424614feba1fef7810602a35b`,
          },
        }
      );
  
      const botGeneratedMail = response.data.choices[0].message.content;
      setGeneratedMail(botGeneratedMail);
    } catch (error) {
      console.error("Error generating mail:", error);
    }
    setLoading(false);
  };
  
  

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    setChatLoading(true);

    try {
      const response = await axios.post(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            { 
              role: "system", 
              content: "You are a romantic AI assistant helping with Valentine's Day advice. Generate a personalized romantic email in a way which is egoistic and self-centered." 
            },
            ...chatHistory,
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

    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-pink-950 dark:to-red-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
            Valentine&apos;s AI Love Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate the perfect rizz mail or chat about love ✨
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="generator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generator">Love Letter Generator</TabsTrigger>
              <TabsTrigger value="chat">Love Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Your Valentine&apos;s Name
                    </label>
                    <Input
                      placeholder="Enter their name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Rizz Level (1-5)
                    </label>
                    <Slider
                      value={rizzLevel}
                      onValueChange={setRizzLevel}
                      max={5}
                      min={1}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shy</span>
                      <span>Ultra Confident</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Their Special Features
                    </label>
                    <Textarea
                      placeholder="What makes them special? (e.g., their smile, kindness, etc.)"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>

                  <Button
                    onClick={generateMail}
                    disabled={loading || !name || !features}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    {loading ? (
                      "Generating..."
                    ) : (
                      <>
                        Generate Love Letter <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {generatedMail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                      Your Generated Love Letter
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                      {generatedMail}
                    </p>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedMail);
                      }}
                      variant="outline"
                      className="mt-4"
                    >
                      <Send className="mr-2 h-4 w-4" /> Copy to Clipboard
                    </Button>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="chat">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-red-500 text-white"
                              : "bg-pink-100 dark:bg-pink-900 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask about love, relationships, or Valentine's Day..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="border-pink-200 focus:border-pink-500"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={chatLoading || !userMessage.trim()}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {chatLoading ? (
                      "..."
                    ) : (
                      <MessageCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}