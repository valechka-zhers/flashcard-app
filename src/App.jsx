import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useDecks } from './hooks/useDecks'
import AuthScreen from './components/AuthScreen'
import DeckList from './components/DeckList'
import DeckEditor from './components/DeckEditor'
import StudySession from './components/StudySession'

export default function App() {
  const { user, loading, signIn, logOut } = useAuth()
  const { decks, createDeck, updateDeck, deleteDeck, markCardLearned, resetDeckProgress } = useDecks(user?.uid)

  const [view, setView] = useState('home') // 'home' | 'create' | 'edit' | 'study'
  const [activeDeck, setActiveDeck] = useState(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-flipo-navy">
        <div className="w-8 h-8 border-4 border-flipo-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AuthScreen onSignIn={signIn} />
  }

  if (view === 'study' && activeDeck) {
    const freshDeck = decks.find(d => d.id === activeDeck.id) ?? activeDeck
    return (
      <StudySession
        deck={freshDeck}
        markCardLearned={(deckId, cardId, learned) => markCardLearned(deckId, cardId, learned)}
        resetDeckProgress={resetDeckProgress}
        onHome={() => { setView('home'); setActiveDeck(null) }}
      />
    )
  }

  if (view === 'create') {
    return (
      <DeckEditor
        deck={null}
        onSave={async (name, cards) => {
          await createDeck(name, cards)
          setView('home')
        }}
        onCancel={() => setView('home')}
        onDelete={null}
      />
    )
  }

  if (view === 'edit' && activeDeck) {
    const freshDeck = decks.find(d => d.id === activeDeck.id) ?? activeDeck
    return (
      <DeckEditor
        deck={freshDeck}
        onSave={async (name, cards) => {
          await updateDeck(activeDeck.id, name, cards)
          setView('home')
          setActiveDeck(null)
        }}
        onCancel={() => { setView('home'); setActiveDeck(null) }}
        onDelete={async () => {
          await deleteDeck(activeDeck.id)
          setView('home')
          setActiveDeck(null)
        }}
      />
    )
  }

  return (
    <DeckList
      decks={decks}
      user={user}
      onStudy={(deck) => { setActiveDeck(deck); setView('study') }}
      onEdit={(deck) => { setActiveDeck(deck); setView('edit') }}
      onCreateNew={() => setView('create')}
      onLogOut={logOut}
    />
  )
}
