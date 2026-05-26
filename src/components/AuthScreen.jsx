import { useState } from 'react'

export default function AuthScreen({ onSignIn }) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setError(false)
      setLoading(true)
      await onSignIn()
    } catch (e) {
      const ignored = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request']
      if (!ignored.includes(e?.code)) {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-flipo-hero px-4">
      <div className="text-center max-w-sm w-full">
        <div className="text-6xl mb-6">🃏</div>
        <h1 className="text-4xl font-bold text-white mb-3">Flipo</h1>
        <p className="text-white/60 mb-10 text-lg">
          Учи что угодно с помощью карточек. Данные синхронизируются на всех устройствах.
        </p>
        {error && (
          <p className="text-flipo-pink text-sm mb-4 bg-white/5 rounded-xl py-2 px-4">
            Не удалось войти. Попробуй ещё раз.
          </p>
        )}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-flipo-navy/80 backdrop-blur border border-white/10 rounded-2xl py-4 px-6 shadow-lg hover:bg-flipo-navy disabled:opacity-60 transition-all duration-200 text-white font-medium text-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Войти через Google
        </button>
      </div>
    </div>
  )
}
