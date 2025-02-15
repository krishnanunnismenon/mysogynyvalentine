'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card} from "@/components/ui/card";


type Question = {
    text: string;
    options: { [key: string]: string };
  };
  
  type Questions = Question[];
  
  type PointMap = { [key: string]: { [key: string]: number } };
  
  const questions: Questions = [
    {
        text: "You see your crush at a party. What’s your first move?",
        options: {
            A: "Exhale loudly, hoping they notice your ‘mysterious aura.’",
            B: "Accidentally spill your drink on yourself and whisper, ‘Oops, I’m wet now.’",
            C: "Unzip jacket to reveal a t-shirt with their face on it.",
            D: "Scream ‘NOTICE ME, SENPAI’ and run away."
        }
    },
    {
        text: "Your crush texts 'wyd?' at 2 AM. What do you reply?",
        options: {
            A: "‘Just thinking about how our kids would look.’",
            B: "‘Practicing my moans in case we ever need them 😏.’",
            C: "‘Trying to manifest us making eye contact for 0.5 sec tomorrow.’",
            D: "‘Rewatching Shrek 2 and imagining you as Fiona.’"
        }
    },
    {
        text: "You finally get to talk to your crush. What do you say first?",
        options: {
            A: "‘Did it hurt when you fell from heaven? Looks like you took some fall damage.’",
            B: "‘Wanna hear a fun fact? I once ate an entire jar of mayo to impress someone.’",
            C: "‘I’ve been stalking your Spotify playlists for months.’",
            D: "‘If I were a chair, would you sit on me?’"
        }
    },
    
    {
        text: "Your crush leaves you on read for 8 hours. What’s your move?",
        options: {
            A: "Text: ‘Hey, if you’re dead, can I have your Spotify?’",
            B: "Send a TikTok of a sad raccoon eating garbage with the caption 'Me rn.'",
            C: "Pretend you were in a coma and dramatically return.",
            D: "Change Instagram bio to ‘Emotionally unavailable because of [crush’s name]’."
        }
    },
    {
        text: "You get rejected. How do you handle it?",
        options: {
            A: "Respectfully walk away, but mail them a handwritten letter about how they’ll regret this when you’re famous.",
            B: "Cry into ice cream while blasting Taylor Swift.",
            C: "Screenshot their rejection and meme it on Twitter.",
            D: "Reply, ‘That’s okay, I’ll just date your clone in the multiverse.’"
        }
    },
    {
        text: "Your crush agrees to a date. Where do you take them?",
        options: {
            A: "A cemetery at midnight for ‘spooky romantic vibes.’",
            B: "McDonald’s drive-thru, treating it like a 5-star restaurant.",
            C: "An escape room, but you pay to be trapped together for 3 hours.",
            D: "A petting zoo so you can say, ‘Look, goats—just like me fr.’"
        }
    }
];

const pointMap: PointMap = {
    q1: { A: 1, B: 3, C: 2, D: 0 },
    q2: { A: 2, B: 3, C: 1, D: 0 },
    q3: { A: 2, B: 3, C: 1, D: 0 },
    q4: { A: 1, B: 2, C: 3, D: 0 },
    q5: { A: 2, B: 0, C: 3, D: 1 }
};

  
  const RizzMeterQuiz: React.FC = () => {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [score, setScore] = useState<number | null>(null);
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      let total = 0;
      Object.entries(answers).forEach(([key, value]) => {
        total += pointMap[key]?.[value] || 0;
      });
      setScore(total);
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-500 p-4 text-white">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔥 Ultimate Rizz Meter Quiz 🔥
        </motion.h1>
        <motion.p className="text-lg mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Are you a RIZZ GOD or a RIZZLESS NPC? Let&apos;s find out!
        </motion.p>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          {questions.map((q, index) => (
            <Card key={index} className="p-4 mb-4 bg-gray-800 text-white">
              <p className="mb-2">{q.text}</p>
              {Object.entries(q.options).map(([key, value]) => (
                <label key={key} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value={key}
                    onChange={() => setAnswers({ ...answers, [`q${index + 1}`]: key })}
                    className="mr-2"
                  />
                  {value}
                </label>
              ))}
            </Card>
          ))}
          <Button type="submit" className="w-full bg-pink-700 hover:bg-orange-500">
            Check My Rizz!
          </Button>
        </form>
        {score !== null && (
  <motion.div
    className="mt-6 text-xl p-4 rounded bg-orange-500"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {score < 5 && <p>🫠 Bro… Why are you gay.</p>}
    {score >= 5 && score < 10 && <p>😏 You got some rizz, but it’s inconsistent. You’re a wildcard—sometimes smooth, sometimes cringe.</p>}
    {score >= 10 && <p>🔥 YOU ARE A RIZZ GOD! People fall for you like dominoes. Teach us your ways!</p>}
  </motion.div>
)}
      </div>
    );
  };
  
  export default RizzMeterQuiz;
  