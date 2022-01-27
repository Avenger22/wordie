import './App.css'
import { GuessList } from './components/GuessList'
import { YouWin } from './components/YouWin'
import { YouLose } from './components/YouLose'
import { useWordle } from './hooks/useWordle'

function App() {

  const { guesses, haveWon, reset, haveLost, word } = useWordle() //custom hook

  return (

    <div className="App">

      <GuessList guesses={guesses} />
      {haveWon && <YouWin reset={reset} />}
      {haveLost && <YouLose reset={reset} word={word} />}
      
    </div>

  )

}

export default App