import { useCallback, useEffect, useState } from 'react'

const words = ['potat', 'banan', 'apple']

function deepClone(data) {
  return JSON.parse(JSON.stringify(data))
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

const letters = 'qwertyuiopasdfghjklzxcvbnm'

const initialGuesses = [
  // which letters in the attempt are:
  // - in the word and in the right place
  // - in the word but not in the right place
  // - not in the word
  // - not submitted
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ],
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ],
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ],
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ],
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ],
  [
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' },
    { value: '', status: 'not-submitted' }
  ]
]

const initialPosition = {
  guess: 0,
  char: 0
}

export function useWordle() {
  // What data do we need?

  // a word to guess
  const [word, setWord] = useState(getRandomWord())

  // guesses (6)
  const [guesses, setGuesses] = useState(initialGuesses)

  // what position are we in? (optional but helpful)
  const [position, setPosition] = useState(initialPosition)

  // actions:
  // submit a guess
  const submitGuess = useCallback(
    function () {
      // only submit if 5 chars have been entered
      if (position.char < 5) return
      // if (checkWordIsInvalid()) return // TODO

      const guessesCopy = deepClone(guesses)
      const guess = guessesCopy[position.guess]

      // keep track of a word copy and update it
      let wordCopy = word

      // check only at-location
      for (const index in guess) {
        const char = guess[index]
        if (wordCopy[index] === char.value) {
          char.status = 'at-location'
          wordCopy = wordCopy.replace(char.value, '_')
        }
      }

      // check for in-word or not-in-word
      for (const index in guess) {
        const char = guess[index]
        if (char.status === 'at-location') continue

        if (wordCopy.includes(char.value)) {
          char.status = 'in-word'
          wordCopy = wordCopy.replace(char.value, '_')
        } else {
          char.status = 'not-in-word'
        }
      }

      setGuesses(guessesCopy)
      setPosition({ ...position, guess: position.guess + 1, char: 0 })
    },
    [guesses, word, position]
  )
  // enter a letter
  const enterCharacter = useCallback(
    function (char) {
      if (position.char >= 5) return

      const guessesCopy = deepClone(guesses)
      guessesCopy[position.guess][position.char].value = char
      setGuesses(guessesCopy)
      setPosition({ ...position, char: position.char + 1 })
    },
    [guesses, position]
  )

  // delete a character
  const deleteCharacter = useCallback(
    function () {
      if (position.char <= 0) return

      const guessesCopy = deepClone(guesses)
      guessesCopy[position.guess][position.char - 1].value = ''
      setGuesses(guessesCopy)
      setPosition({ ...position, char: position.char - 1 })
    },
    [guesses, position]
  )

  function reset() {
    setWord(getRandomWord())
    setGuesses(initialGuesses)
    setPosition(initialPosition)
  }

  const haveLost = position.guess > 5

  const haveWon = guesses.some(guess =>
    guess.every(char => char.status === 'at-location')
  )

  const finished = haveWon || haveLost

  // listen to keyboard keys being typed
  useEffect(() => {
    if (finished) return

    const listener = e => {
      const key = e.key.toLowerCase()
      console.log(key)
      // if user enters a letter: enterCharacter()
      if (letters.includes(key)) enterCharacter(key)

      // if user presses backspace: deleteCharacter()
      if (key === 'backspace') deleteCharacter()

      // if user presses enter: submitGuess()
      if (key === 'enter') submitGuess()
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [enterCharacter, deleteCharacter, submitGuess, finished])

  return { guesses, haveWon, reset, haveLost, word }
}