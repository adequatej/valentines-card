import { motion } from "framer-motion"

export default function Envelope({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="bg-red-500 w-full aspect-[4/3] rounded-lg shadow-lg cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="h-full flex items-center justify-center">
        <motion.div
          className="text-white text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Click to Open
        </motion.div>
      </div>
    </motion.div>
  )
}

