export default function ResultsScreen({ deck, onStudyAgain, onHome }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-flipo-hero px-4 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-white mb-3">Отлично!</h2>
      <p className="text-white/60 text-lg mb-2">
        Ты прошёл все карточки в колоде
      </p>
      <p className="text-2xl font-semibold text-flipo-pink-p mb-10">
        «{deck.name}»
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={onStudyAgain}
          className="flex-1 bg-flipo-blue hover:bg-flipo-blue-h text-white font-semibold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-flipo-blue/30"
        >
          Учить снова
        </button>
        <button
          onClick={onHome}
          className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/20 transition-colors"
        >
          На главную
        </button>
      </div>
    </div>
  )
}
