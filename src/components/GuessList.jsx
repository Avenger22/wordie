export function GuessList({ guesses }) {

    return (

      <div className="guess-list">

        {guesses.map((guess, guessIndex) => (
          // Create a div for each guess in the guess list

          <div key={guessIndex} className="guess">

            {guess.map((char, charIndex) => (
              // create a char div for each char in the guess

              <div key={charIndex} className={`char ${char.status}`}>
                {char.value}
              </div>
              
            ))}

          </div>

        ))}

      </div>

    )

  }  