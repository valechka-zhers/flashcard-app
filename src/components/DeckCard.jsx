import ProgressBar from './ProgressBar'

export default function DeckCard({ deck, onStudy, onEdit }) {
  const total = deck.cards?.length ?? 0
  const learned = deck.learnedCount ?? 0
  const hasStarted = learned > 0

  return (
    <div className="bg-white dark:bg-flipo-navy-2 rounded-2xl border border-flipo-silver dark:border-white/5 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-flipo-navy dark:text-white text-lg leading-tight truncate">
            {deck.name}
          </h3>
          <p className="text-sm text-flipo-navy/40 dark:text-white/40 mt-1">
            {total} {cardWord(total)}
          </p>
        </div>
        <button
          onClick={onEdit}
          className="text-flipo-navy/30 hover:text-flipo-blue dark:text-white/30 dark:hover:text-flipo-blue transition-colors shrink-0 p-1"
          aria-label="Редактировать"
        >
          ✏️
        </button>
      </div>

      {total > 0 && (
        <div className="mb-4">
          <ProgressBar current={learned} total={total} />
          <p className="text-xs text-flipo-navy/30 dark:text-white/30 mt-1">
            {learned} из {total} выучено
          </p>
        </div>
      )}

      <button
        onClick={onStudy}
        disabled={total === 0}
        className="w-full bg-flipo-blue hover:bg-flipo-blue-h disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md shadow-flipo-blue/20"
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
