"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ValentinesQuiz() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const text = ['You’re stuck with me forever. No refunds.','Welcome to my personal list of ‘people I tolerate.’','You’re officially my favorite mistake.','You just got rizz-handcuffed. Sorry, not sorry.']
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const randomValue = Math.floor(Math.random() * 4);

  const moveNoButton = () => {
    const randomOffset = () => (Math.random() - 0.5) * 200 // Small jitter movement
    setNoButtonPosition((prev) => ({ x: prev.x + randomOffset(), y: prev.y + randomOffset() }))
  }

  const handleYesClick = () => {
    setShowConfetti(true)
    
    setShowPopup(true)
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#C30E59] via-[#E82561] to-[#F2AE66]">
      <div ref={containerRef} className="relative w-full max-w-lg p-4 overflow-hidden">
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-2 border-pink-300 relative">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-purple-600">Will you be my pookie?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-[200px]">
              <Image
                src="/pookie1.jpg"
                alt="Cute Valentine's Image"
                width={200}
                height={200}
                className="w-full h-auto rounded-full border-4 border-pink-300 shadow-lg"
              />
            </div>
            <div className="space-y-2 w-full">
              {["Yes, obviously!", "Absolutely, no doubt!", "100% yes!", "Did you even need to ask?"].map(
                (text, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="w-full text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md"
                      onClick={handleYesClick}
                    >
                      {text}
                    </Button>
                  </motion.div>
                ),
              )}
            </div>
            <motion.div
              animate={noButtonPosition}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <Button
                variant="outline"
                className="text-xs border-pink-300 text-pink-500 hover:bg-pink-100"
                onMouseEnter={moveNoButton}
                onClick={(e) => e.preventDefault()}
              >
                No (but why tho?)
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
      {showConfetti && <Confetti />}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-pink-600">Congratulations! 🎉</DialogTitle>
          </DialogHeader>
          <p className="text-center text-lg text-gray-700">{text[randomValue]}</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-pink-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}