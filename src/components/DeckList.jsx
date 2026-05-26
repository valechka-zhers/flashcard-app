import DeckCard from './DeckCard'

export default function DeckList({ decks, user, onStudy, onEdit, onCreateNew, onLogOut }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🃏</span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Flipo</h1>
        </div>
        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
          )}
          <button
            onClick={onLogOut}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Create button */}
        <button
          onClick={onCreateNew}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition-colors mb-6 text-base"
        >
          + Создать новую колоду
        </button>

        {/* Empty state */}
        {decks.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-lg font-medium">Пока нет колод</p>
            <p className="text-sm mt-1">Создай первую и начни учиться!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {decks.map(deck => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onStudy={() => onStudy(deck)}
                onEdit={() => onEdit(deck)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
