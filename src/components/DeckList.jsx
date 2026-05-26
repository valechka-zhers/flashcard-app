import DeckCard from './DeckCard'

export default function DeckList({ decks, user, onStudy, onEdit, onCreateNew, onLogOut }) {
  return (
    <div className="min-h-screen bg-flipo-off-white dark:bg-flipo-navy">
      {/* Header */}
      <div className="bg-flipo-navy border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🃏</span>
          <h1 className="text-xl font-bold text-white">Flipo</h1>
        </div>
        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full ring-2 ring-flipo-blue/40" />
          )}
          <button
            onClick={onLogOut}
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Create button */}
        <button
          onClick={onCreateNew}
          className="w-full bg-flipo-blue hover:bg-flipo-blue-h text-white font-semibold py-4 rounded-2xl transition-colors mb-6 text-base shadow-lg shadow-flipo-blue/20"
        >
          + Создать новую колоду
        </button>

        {/* Empty state */}
        {decks.length === 0 ? (
          <div className="text-center py-16 text-flipo-navy/30 dark:text-white/20">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-lg font-medium text-flipo-navy/50 dark:text-white/40">Пока нет колод</p>
            <p className="text-sm mt-1 text-flipo-navy/40 dark:text-white/30">Создай первую и начни учиться!</p>
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
