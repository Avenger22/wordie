import { useCallback, useEffect, useState } from 'react'

// const words = [
//   'potat', 'banan', 'apple', 'noise', 'poops', 
//   'stool', 'cooki', 'hamam', 'vacum', 
//   'acnes', 'acoin', 'acorn', 'acres', 'actor', 'aeons', 'aires', 'aisle', 
//   'alert', 'alien', 'alone', 'alter', 'anise', 'antes', 'antic', 
//   'arise', 'arose', 'arson', 'aster', 'astir', 'atone',
//   'cairn', 'calor', 'caner', 'canes', 'canoe', 'canto', 'cants', 'cares', 
//   'carol', 'carts', 'caste', 'cater', 'cents', 'cites', 'clans', 'clean', 
//   'clear', 'cleat', 'clone', 'close', 'clots', 'coals', 'coast', 'coats', 
//   'coils', 'coins', 'colas', 'colts', 'cones', 'coral', 'corns', 'crane', 
//   'crate', 'crest', 'cries', 'crone'
// ]

const words = [
  'abuse',
  'adult',
  'agent',
  'anger',
  'apple',
  'award',
  'basis',
  'beach',
  'birth',
  'block',
  'blood',
  'board',
  'brain',
  'bread',
  'break',
  'brown',
  'buyer',
  'cause',
  'chain',
  'chair',
  'chest',
  'chief',
  'child',
  'china',
  'claim',
  'class',
  'clock',
  'coach',
  'coast',
  'court',
  'cover',
  'cream',
  'crime',
  'cross',
  'crowd',
  'crown',
  'cycle',
  'dance',
  'death',
  'depth',
  'doubt',
  'draft',
  'drama',
  'dream',
  'dress',
  'drink',
  'drive',
  'earth',
  'enemy',
  'entry',
  'error',
  'event',
  'faith',
  'fault',
  'field',
  'fight',
  'final',
  'floor',
  'focus',
  'force',
  'frame',
  'frank',
  'front',
  'fruit',
  'glass',
  'grant',
  'grass',
  'green',
  'group',
  'guide',
  'heart',
  'henry',
  'horse',
  'hotel',
  'house',
  'image',
  'index',
  'input',
  'issue',
  'japan',
  'jones',
  'judge',
  'knife',
  'laura',
  'layer',
  'level',
  'lewis',
  'light',
  'limit',
  'lunch',
  'major',
  'march',
  'match',
  'metal',
  'model',
  'money',
  'month',
  'motor',
  'mouth',
  'music',
  'night',
  'noise',
  'north',
  'novel',
  'nurse',
  'offer',
  'order',
  'other',
  'owner',
  'panel',
  'paper',
  'party',
  'peace',
  'peter',
  'phase',
  'phone',
  'piece',
  'pilot',
  'pitch',
  'place',
  'plane',
  'plant',
  'plate',
  'point',
  'pound',
  'power',
  'press',
  'price',
  'pride',
  'prize',
  'proof',
  'queen',
  'radio',
  'range',
  'ratio',
  'reply',
  'right',
  'river',
  'round',
  'route',
  'rugby',
  'scale',
  'scene',
  'scope',
  'score',
  'sense',
  'shape',
  'share',
  'sheep',
  'sheet',
  'shift',
  'shirt',
  'shock',
  'sight',
  'simon',
  'skill',
  'sleep',
  'smile',
  'smith',
  'smoke',
  'sound',
  'south',
  'space',
  'speed',
  'spite',
  'sport',
  'squad',
  'staff',
  'stage',
  'start',
  'state',
  'steam',
  'steel',
  'stock',
  'stone',
  'store',
  'study',
  'stuff',
  'style',
  'sugar',
  'table',
  'taste',
  'terry',
  'theme',
  'thing',
  'title',
  'total',
  'touch',
  'tower',
  'track',
  'trade',
  'train',
  'trend',
  'trial',
  'trust',
  'truth',
  'uncle',
  'union',
  'unity',
  'value',
  'video',
  'visit',
  'voice',
  'waste',
  'watch',
  'water',
  'while',
  'white',
  'whole',
  'woman',
  'world',
  'youth'
]

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
        } 
        
        else {
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