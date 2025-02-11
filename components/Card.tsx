"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Message from "./Message"

export default function Card({ onSuccess }: { onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  return (
    <motion.div 
      className="w-full max-w-2xl aspect-[1.618/1] relative"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Back of envelope */}
      <div className="absolute inset-0 bg-valentine-red rounded-lg shadow-lg" />

      {/* Envelope flaps - only show when closed */}
      {!isOpen && (
        <>
          {/* Side panels to cover gaps */}
          <div className="absolute left-[33%] top-0 w-[34%] h-full bg-valentine-red z-20 envelope-lines" />

          {/* Left flap */}
          <motion.div
            className="absolute left-0 top-0 w-1/3 h-full bg-valentine-red origin-right z-20"
            style={{ 
              clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)",
              transformStyle: 'preserve-3d'
            }}
            animate={isOpen ? { rotateY: -180 } : { rotateY: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Right flap */}
          <motion.div
            className="absolute right-0 top-0 w-1/3 h-full bg-valentine-red origin-left z-20"
            style={{ 
              clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)",
              transformStyle: 'preserve-3d'
            }}
            animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Center panel to cover bottom gap */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-valentine-red z-20" />

          {/* Bottom flap */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-valentine-red origin-top z-20"
            style={{ 
              clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)",
              transformStyle: 'preserve-3d'
            }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Top flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-valentine-pink origin-bottom z-30"
            style={{ 
              clipPath: "polygon(50% 100%, 100% 0, 0 0)",
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-red-700 rounded-full transform rotate-45" />
            </div>
          </motion.div>
        </>
      )}

      {/* Message/Card inside */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg shadow-lg"
        style={{ zIndex: isOpen ? 40 : 10 }}
        initial={{ scale: 0.9, y: 0 }}
        animate={isOpen ? { 
          scale: 1,
          y: -40,
          transition: { delay: 0.3, duration: 0.5 }
        } : { 
          scale: 0.9,
          y: 0
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {isOpen ? (
            <Message onSuccess={onSuccess} />
          ) : (
            <motion.div 
              className="text-valentine-red text-4xl font-bold text-center"
              initial={{ opacity: 1 }}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            >
              Click to Open ❤️
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="open-me-text">Open Me! ❤️</div>
    </motion.div>
  )
}