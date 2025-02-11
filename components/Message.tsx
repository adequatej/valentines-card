"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"

export default function Message({ onSuccess }: { onSuccess: () => void }) {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [canClickNo, setCanClickNo] = useState(false)
  const [noMoveCount, setNoMoveCount] = useState(0)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const noControls = useAnimation()
  const [imageZoomed, setImageZoomed] = useState(false)

  const phrases = [
    "Yes",
    "Are you sure you want to say yes?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely yes?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
  ]

  const handleYesClick = () => {
    setYesPressed(true)
    onSuccess()
  }

  const handleNoClick = () => {
    if (canClickNo) {
      setNoCount(prev => prev + 1)
    } else {
      moveNoButton()
    }
  }

  const handleNoHover = () => {
    if (!canClickNo) {
      moveNoButton()
    }
  }

  const moveNoButton = () => {
    if (containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = noButtonRef.current.getBoundingClientRect()
      
      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height
      
      const randomX = Math.random() * maxX - maxX / 2
      const randomY = Math.random() * maxY - maxY / 2
      
      noControls.start({
        x: randomX,
        y: randomY,
        transition: { type: "spring", duration: 0.5 }
      })

      setNoMoveCount(prev => {
        const newCount = prev + 1
        if (newCount >= 10) {
          setCanClickNo(true)
        }
        return newCount
      })
    }
  }

  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth - window.innerWidth/2,
    y: Math.random() * window.innerHeight - window.innerHeight/2,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
  })

  const getNewRandomPosition = () => ({
    x: Math.random() * window.innerWidth - window.innerWidth/2,
    y: Math.random() * window.innerHeight - window.innerHeight/2,
    rotate: Math.random() * 720 - 360,
    scale: 0.5 + Math.random() * 0.5,
  })

  const handleImageClick = () => {
    setImageZoomed(!imageZoomed)
  }

  const handleGifClick = (index: number) => {
    const element = document.getElementById(`gif-${index}`)
    if (element) {
      element.style.display = 'none'
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {yesPressed ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center"
              style={{ zIndex: 40 }}
            >
              <motion.div
                className="flex flex-col items-center gap-4 bg-white/80 p-6 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <motion.p 
                  className="text-4xl font-bold text-valentine-red text-center"
                >
                  Happy Valentines Bub! ❤️
                </motion.p>
                <motion.div
                  className="relative cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    width: imageZoomed ? 'calc(90vw)' : '256px',
                    height: imageZoomed ? 'calc(90vh)' : '256px',
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={handleImageClick}
                  style={{ zIndex: imageZoomed ? 60 : 50 }}
                >
                  <Image 
                    src="/IMG_9891.JPG"
                    alt="Valentine hearts"
                    fill
                    className="object-cover rounded-lg"
                    style={{ transform: 'scaleY(-1)' }}
                  />
                </motion.div>
              </motion.div>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  id={`gif-${i}`}
                  key={i}
                  className="fixed w-32 h-32 cursor-pointer"
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={getRandomPosition()}
                  animate={getNewRandomPosition()}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                    delay: i * 0.1,
                  }}
                  onClick={() => handleGifClick(i)}
                  whileHover={{ scale: 1.2 }}
                >
                  <img 
                    src="https://i.pinimg.com/originals/1a/e9/e1/1ae9e10616913bea51c7f2468c42cb46.gif" 
                    alt="Love hearts gif" 
                    className="w-full h-full object-contain pointer-events-auto"
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-valentine-red">Will you be my Valentine?</h1>
            <div className="space-y-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:scale-110 transition-transform"
                onClick={handleYesClick}
              >
                Yes
              </button>
              <br />
              <motion.button
                ref={noButtonRef}
                className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ${
                  canClickNo ? '' : 'cursor-pointer'
                }`}
                animate={noControls}
                onHoverStart={handleNoHover}
                onClick={handleNoClick}
              >
                No
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
