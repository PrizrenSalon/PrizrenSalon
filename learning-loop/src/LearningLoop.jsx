import { useState } from 'react'
import './LearningLoop.css'

const defaultCards = [
  { id: 1, question: 'What is a React component?', answer: 'A reusable piece of UI that accepts props and returns JSX.' },
  { id: 2, question: 'What hook manages local state in React?', answer: 'useState — returns a state value and a setter function.' },
  { id: 3, question: 'What does Vite stand for?', answer: 'Nothing — it is French for "fast", reflecting its speed.' },
  { id: 4, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML and compiles to React.createElement calls.' },
  { id: 5, question: 'When does useEffect run?', answer: 'After every render by default, or when listed dependencies change.' },
]

function Card({ card, flipped, onFlip }) {
  return (
    <div className={`ll-card ${flipped ? 'll-card--flipped' : ''}`} onClick={onFlip}>
      <div className="ll-card__inner">
        <div className="ll-card__face ll-card__face--front">
          <span className="ll-card__label">Question</span>
          <p>{card.question}</p>
          <span className="ll-card__hint">Click to reveal</span>
        </div>
        <div className="ll-card__face ll-card__face--back">
          <span className="ll-card__label">Answer</span>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function LearningLoop() {
  const [cards] = useState(defaultCards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [scores, setScores] = useState({})
  const [done, setDone] = useState(false)

  const current = cards[index]
  const correct = Object.values(scores).filter(Boolean).length
  const total = cards.length

  function handleFlip() {
    setFlipped(f => !f)
  }

  function handleAnswer(knew) {
    setScores(s => ({ ...s, [current.id]: knew }))
    const next = index + 1
    if (next >= total) {
      setDone(true)
    } else {
      setIndex(next)
      setFlipped(false)
    }
  }

  function handleRestart() {
    setIndex(0)
    setFlipped(false)
    setScores({})
    setDone(false)
  }

  if (done) {
    return (
      <div className="ll-container">
        <div className="ll-summary">
          <h2>Session complete</h2>
          <p className="ll-score">
            {correct} / {total} correct
          </p>
          <div className="ll-progress-bar">
            <div
              className="ll-progress-bar__fill"
              style={{ width: `${(correct / total) * 100}%` }}
            />
          </div>
          <button className="ll-btn ll-btn--primary" onClick={handleRestart}>
            Start over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="ll-container">
      <header className="ll-header">
        <h1>Learning Loop</h1>
        <span className="ll-counter">
          {index + 1} / {total}
        </span>
      </header>

      <div className="ll-progress-bar">
        <div
          className="ll-progress-bar__fill"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <Card card={current} flipped={flipped} onFlip={handleFlip} />

      {flipped && (
        <div className="ll-actions">
          <button className="ll-btn ll-btn--wrong" onClick={() => handleAnswer(false)}>
            Still learning
          </button>
          <button className="ll-btn ll-btn--correct" onClick={() => handleAnswer(true)}>
            Got it
          </button>
        </div>
      )}
    </div>
  )
}
