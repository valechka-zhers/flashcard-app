import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function FlashCard({ card, onKnow, onDontKnow }) {
  const [flipped, setFlipped] = useState(false)
  const x = useMotionValue(0)

  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const greenOpacity = useTransform(x, [0, 120], [0, 1])
  const redOpacity = useTransform(x, [-120, 0], [1, 0])

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onKnow()
      setFlipped(false)
    } else if (info.offset.x < -100) {
      onDontKnow()
      setFlipped(false)
    }
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      className="relative w-full cursor-grab active:cursor-grabbing select-none"
      style={{ x, rotate, touchAction: 'none' }}
    >
      <div
        className="relative w-full"
        style={{ perspective: '1000px', height: 'clamp(280px, 55vw, 440px)' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-face flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Вопрос</span>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center leading-snug">
              {card.front}
            </p>
            <span className="mt-6 text-sm text-gray-400">нажми, чтобы перевернуть</span>
          </div>
          {/* Back */}
          <div className="card-face card-face-back flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-950 rounded-3xl shadow-xl border border-indigo-100 dark:border-indigo-800 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Ответ</span>
            <p className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-200 text-center leading-snug">
              {card.back}
            </p>
          </div>
        </div>

        {/* Green overlay */}
        <motion.div
          style={{ opacity: greenOpacity }}
          className="absolute inset-0 rounded-3xl bg-green-400/30 border-4 border-green-400 pointer-events-none flex items-center justify-start pl-6"
        >
          <span className="text-green-600 dark:text-green-300 font-bold text-xl">✓ Знаю</span>
        </motion.div>

        {/* Red overlay */}
        <motion.div
          style={{ opacity: redOpacity }}
          className="absolute inset-0 rounded-3xl bg-red-400/30 border-4 border-red-400 pointer-events-none flex items-center justify-end pr-6"
        >
          <span className="text-red-600 dark:text-red-300 font-bold text-xl">✗ Не знаю</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
