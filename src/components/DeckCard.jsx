import ProgressBar from './ProgressBar'

export default function DeckCard({ deck, onStudy, onEdit }) {
  const total = deck.cards?.length ?? 0
  const learned = deck.learnedCount ?? 0
  const hasStarted = learned > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight truncate">
            {deck.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {total} {cardWord(total)}
          </p>
        </div>
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0 p-1"
          aria-label="Редактировать"
        >
          ✏️
        </button>
      </div>

      {total > 0 && (
        <div className="mb-4">
          <ProgressBar current={learned} total={total} />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {learned} из {total} выучено
          </p>
        </div>
      )}

      <button
        onClick={onStudy}
        disabled={total === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {hasStarted ? 'Продолжить учить' : 'Начать учить'}
      </button>
    </div>
  )
}

function cardWord(n) {
  if (n % 100 >= 11 && n % 100 <= 14) return 'карточек'
  switch (n % 10) {
    case 1: return 'карточка'
    case 2:
    case 3:
    case 4: return 'карточки'
    default: return 'карточек'
  }
}
