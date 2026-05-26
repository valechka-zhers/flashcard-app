import { useState, useCallback } from 'react'

export function useStudySession(deck, markCardLearned) {
  const allCards = deck?.cards ?? []

  const [queue, setQueue] = useState(() => [...allCards])
  const [learnedIds, setLearnedIds] = useState(() =>
    new Set(allCards.filter(c => c.isLearned).map(c => c.id))
  )
  const [done, setDone] = useState(false)

  const current = queue[0] ?? null
  const total = allCards.length
  const learnedCount = learnedIds.size

  const handleKnow = useCallback(async () => {
    if (!current) return
    await markCardLearned(deck.id, current.id, true)
    setLearnedIds(prev => new Set([...prev, current.id]))
    setQueue(prev => {
      const next = prev.slice(1)
      if (next.length === 0) setDone(true)
      return next
    })
  }, [current, deck, markCardLearned])

  const handleDontKnow = useCallback(async () => {
    if (!current) return
    await markCardLearned(deck.id, current.id, false)
    setQueue(prev => [...prev.slice(1), prev[0]])
  }, [current, deck, markCardLearned])

  const restart = useCallback(() => {
    setQueue([...allCards])
    setLearnedIds(new Set())
    setDone(false)
  }, [allCards])

  return { current, total, learnedCount, done, handleKnow, handleDontKnow, restart }
}
