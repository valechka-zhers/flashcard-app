import { useState, useEffect } from 'react'
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  onSnapshot, serverTimestamp, writeBatch, getDocs
} from 'firebase/firestore'
import { db } from '../firebase'

export function useDecks(userId) {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setDecks([]); setLoading(false); return }

    const decksRef = collection(db, 'users', userId, 'decks')
    const unsubscribe = onSnapshot(decksRef, async (snapshot) => {
      const deckList = await Promise.all(
        snapshot.docs.map(async (deckDoc) => {
          const cardsRef = collection(db, 'users', userId, 'decks', deckDoc.id, 'cards')
          const cardsSnap = await getDocs(cardsRef)
          const cards = cardsSnap.docs.map(c => ({ id: c.id, ...c.data() }))
          const learnedCount = cards.filter(c => c.isLearned).length
          return {
            id: deckDoc.id,
            ...deckDoc.data(),
            cards,
            learnedCount,
          }
        })
      )
      setDecks(deckList)
      setLoading(false)
    })
    return unsubscribe
  }, [userId])

  const createDeck = async (name, cards) => {
    const decksRef = collection(db, 'users', userId, 'decks')
    const deckDoc = await addDoc(decksRef, { name, createdAt: serverTimestamp() })
    const batch = writeBatch(db)
    cards.forEach(card => {
      const cardRef = doc(collection(db, 'users', userId, 'decks', deckDoc.id, 'cards'))
      batch.set(cardRef, { front: card.front, back: card.back, isLearned: false, timesCorrect: 0, timesIncorrect: 0 })
    })
    await batch.commit()
    return deckDoc.id
  }

  const updateDeck = async (deckId, name, cards) => {
    const deckRef = doc(db, 'users', userId, 'decks', deckId)
    await updateDoc(deckRef, { name })

    const cardsRef = collection(db, 'users', userId, 'decks', deckId, 'cards')
    const existingSnap = await getDocs(cardsRef)
    const batch = writeBatch(db)
    existingSnap.docs.forEach(d => batch.delete(d.ref))
    cards.forEach(card => {
      const cardRef = doc(cardsRef)
      batch.set(cardRef, { front: card.front, back: card.back, isLearned: card.isLearned ?? false, timesCorrect: card.timesCorrect ?? 0, timesIncorrect: card.timesIncorrect ?? 0 })
    })
    await batch.commit()
  }

  const deleteDeck = async (deckId) => {
    const cardsRef = collection(db, 'users', userId, 'decks', deckId, 'cards')
    const cardsSnap = await getDocs(cardsRef)
    const batch = writeBatch(db)
    cardsSnap.docs.forEach(d => batch.delete(d.ref))
    batch.delete(doc(db, 'users', userId, 'decks', deckId))
    await batch.commit()
  }

  const markCardLearned = async (deckId, cardId, learned) => {
    const cardRef = doc(db, 'users', userId, 'decks', deckId, 'cards', cardId)
    await updateDoc(cardRef, {
      isLearned: learned,
      [learned ? 'timesCorrect' : 'timesIncorrect']: (learned ? 1 : 1),
    })
  }

  const resetDeckProgress = async (deckId) => {
    const cardsRef = collection(db, 'users', userId, 'decks', deckId, 'cards')
    const cardsSnap = await getDocs(cardsRef)
    const batch = writeBatch(db)
    cardsSnap.docs.forEach(d => batch.update(d.ref, { isLearned: false }))
    await batch.commit()
  }

  return { decks, loading, createDeck, updateDeck, deleteDeck, markCardLearned, resetDeckProgress }
}
