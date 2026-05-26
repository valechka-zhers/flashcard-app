import { useState } from 'react'

function CardRow({ card, index, onChange, onDelete }) {
  return (
    <div className="flex gap-2 items-start bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
      <span className="text-gray-400 text-sm pt-3 w-6 text-center shrink-0">{index + 1}</span>
      <div className="flex-1 flex flex-col sm:flex-row gap-2">
        <input
          placeholder="Слово / вопрос"
          value={card.front}
          onChange={e => onChange({ ...card, front: e.target.value })}
          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flipo-blue"
        />
        <input
          placeholder="Перевод / ответ"
          value={card.back}
          onChange={e => onChange({ ...card, back: e.target.value })}
          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flipo-blue"
        />
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors pt-2.5 shrink-0"
        aria-label="Удалить карточку"
      >
        ✕
      </button>
    </div>
  )
}

export default function DeckEditor({ deck, onSave, onCancel, onDelete }) {
  const [name, setName] = useState(deck?.name ?? '')
  const [cards, setCards] = useState(
    deck?.cards?.length ? deck.cards.map(c => ({ front: c.front, back: c.back, isLearned: c.isLearned, timesCorrect: c.timesCorrect, timesIncorrect: c.timesIncorrect })) : [{ front: '', back: '' }]
  )
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const addCard = () => setCards(prev => [...prev, { front: '', back: '' }])

  const updateCard = (i, updated) => setCards(prev => prev.map((c, idx) => idx === i ? updated : c))

  const deleteCard = (i) => setCards(prev => prev.filter((_, idx) => idx !== i))

  const handleSave = async () => {
    if (!name.trim()) return
    const validCards = cards.filter(c => c.front.trim() || c.back.trim())
    if (!validCards.length) return
    setSaving(true)
    try {
      await onSave(name.trim(), validCards)
    } finally {
      setSaving(false)
    }
  }

  const isEditing = !!deck

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          ← Назад
        </button>
        <h1 className="font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Редактировать колоду' : 'Новая колода'}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="bg-flipo-blue hover:bg-flipo-blue-h disabled:opacity-40 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
        >
          {saving ? '...' : 'Сохранить'}
        </button>
      </div>

      <div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-6">
        {/* Deck name */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Название колоды
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Например: Испанский — числа"
            className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-flipo-blue"
          />
        </div>

        {/* Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Карточки ({cards.length})
            </label>
          </div>
          {cards.map((card, i) => (
            <CardRow
              key={i}
              card={card}
              index={i}
              onChange={updated => updateCard(i, updated)}
              onDelete={() => deleteCard(i)}
            />
          ))}
          <button
            onClick={addCard}
            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl py-3 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors text-sm font-medium"
          >
            + Добавить карточку
          </button>
        </div>

        {/* Delete deck */}
        {isEditing && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            {confirmDelete ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Удалить навсегда?</span>
                <button
                  onClick={onDelete}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                >
                  Да, удалить
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Удалить колоду
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
