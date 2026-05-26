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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button onClick={onHome} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          ← Назад
        </button>
        <h1 className="font-semibold text-gray-900 dark:text-white truncate mx-4 text-sm">{deck.name}</h1>
        <span className="text-sm text-gray-500">{learnedCount}/{total}</span>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <ProgressBar current={learnedCount} total={total} />
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Всего: {total}</span>
          <span className="text-green-600 dark:text-green-400">Выучено: {learnedCount}</span>
          <span className="text-indigo-600 dark:text-indigo-400">Осталось: {remaining}</span>
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
          className="flex-1 bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-semibold py-4 rounded-2xl text-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
        >
          ← Не знаю
        </button>
        <button
          onClick={handleKnow}
          className="flex-1 bg-green-100 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-semibold py-4 rounded-2xl text-lg hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
        >
          Знаю →
        </button>
      </div>
    </div>
  )
}
