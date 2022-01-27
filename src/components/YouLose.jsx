export function YouLose({ reset, word }) {

    return (

      <div>

        <p>You lose!</p>
        <p>The word was: {word}</p>
        <button onClick={reset}>RESET</button>
        
      </div>

    )

  }  