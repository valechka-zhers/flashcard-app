import { AnimatePresence, motion } from 'framer-motion'
import FlashCard from './FlashCard'
import ProgressBar from './ProgressBar'
import ResultsScreen from './ResultsScreen'
import { useStudySession } from '../hooks/useStudySession'

export default function StudySession({ deck, markCardLearned, resetDeckProgress, onHome }) {
  const { current, total, learnedCount, done, handleKnow, handleDontKnow, restart } = useStudySession(deck, markCardLearned)

  const handleStudyAgain = async () => {
    await resetDeckProgress(deck.id)
    restart()
  }

  if (done) {
    return <ResultsScreen deck={deck} onStudyAgain={handleStudyAgain} onHome={onHome} />
  }

  const remaining = total - learnedCount

  return (
    <div className="min-h-screen flex flex-col bg-flipo-off-white dark:bg-flipo-navy">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-flipo-silver dark:border-white/5 bg-white dark:bg-flipo-navy">
        <button onClick={onHome} className="text-flipo-navy/50 hover:text-flipo-blue dark:text-white/40 dark:hover:text-white transition-colors">
          ← Назад
        </button>
        <h1 className="font-semibold text-flipo-navy dark:text-white truncate mx-4 text-sm">{deck.name}</h1>
        <span className="text-sm text-flipo-blue font-semibold">{learnedCount}/{total}</span>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 bg-white dark:bg-flipo-navy border-b border-flipo-silver dark:border-white/5">
        <ProgressBar current={learnedCount} total={total} />
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-flipo-navy/40 dark:text-white/40">Всего: {total}</span>
          <span className="text-flipo-pink-p font-medium">Выучено: {learnedCount}</span>
          <span className="text-flipo-blue font-medium">Осталось: {remaining}</span>
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg"
            >
              <FlashCard card={current} onKnow={handleKnow} onDontKnow={handleDontKnow} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="px-4 pb-8 flex gap-4 max-w-lg mx-auto w-full">
        <button
          onClick={handleDontKnow}
          className="flex-1 bg-flipo-pink/10 border border-flipo-pink/30 text-flipo-pink font-semibold py-4 rounded-2xl text-lg hover:bg-flipo-pink/20 transition-colors"
        >
          ← Не знаю
        </button>
        <button
          onClick={handleKnow}
          className="flex-1 bg-flipo-blue/10 border border-flipo-blue/30 text-flipo-blue font-semibold py-4 rounded-2xl text-lg hover:bg-flipo-blue/20 transition-colors"
        >
          Знаю →
        </button>
      </div>
    </div>
  )
}
