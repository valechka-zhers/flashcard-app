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
          <div className="card-face flex flex-col items-center justify-center bg-white dark:bg-flipo-navy-2 rounded-3xl shadow-xl border border-flipo-silver dark:border-white/5 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-flipo-blue/60 mb-4">Вопрос</span>
            <p className="text-2xl md:text-3xl font-bold text-flipo-navy dark:text-white text-center leading-snug">
              {card.front}
            </p>
            <span className="mt-6 text-sm text-flipo-navy/30 dark:text-white/30">нажми, чтобы перевернуть</span>
          </div>
          {/* Back */}
          <div className="card-face card-face-back flex flex-col items-center justify-center bg-flipo-card-back rounded-3xl shadow-xl border border-white/5 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-flipo-pink-p/70 mb-4">Ответ</span>
            <p className="text-2xl md:text-3xl font-bold text-white text-center leading-snug">
              {card.back}
            </p>
          </div>
        </div>

        {/* Green overlay */}
        <motion.div
          style={{ opacity: greenOpacity }}
          className="absolute inset-0 rounded-3xl bg-flipo-blue/20 border-4 border-flipo-blue pointer-events-none flex items-center justify-start pl-6"
        >
          <span className="text-flipo-blue font-bold text-xl">✓ Знаю</span>
        </motion.div>

        {/* Red overlay */}
        <motion.div
          style={{ opacity: redOpacity }}
          className="absolute inset-0 rounded-3xl bg-flipo-pink/20 border-4 border-flipo-pink pointer-events-none flex items-center justify-end pr-6"
        >
          <span className="text-flipo-pink font-bold text-xl">✗ Не знаю</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
