export default function ResultsScreen({ deck, onStudyAgain, onHome }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950 px-4 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Отлично!</h2>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
        Ты прошёл все карточки в колоде
      </p>
      <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-10">
        «{deck.name}»
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={onStudyAgain}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors"
        >
          Учить снова
        </button>
        <button
          onClick={onHome}
          className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          На главную
        </button>
      </div>
    </div>
  )
}
