
import { useEffect, useState } from 'react';
import './App.css'
import { HangImage } from './Components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWords';

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false)

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts]);

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord == word) {
      setWon(true)

    }
  })

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return
    }
    const hiddenWordArray = hiddenWord.split(' ');
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(word.length));
    setAttempts(0);
    setLose(false);
    setLose(false);

  }

  return (
    <div className='App'>
      {/** Imagenes */}
      <h3>Imagen del juego</h3>
      <HangImage imageNumber={attempts} />
      {/** Palabra oculta */}
      <h3>{hiddenWord}</h3>
      {/** Contador de intentos */}
      <h3>Intentos :{attempts}</h3>

      {/** Mensaje si perdió */}
      {(lose) ?
        <h2>Perdió {word}</h2> :
        ''}

      {(won) ?
        <h2>Usted ganó</h2> :
        ''}
      {/**Botones Letra */}
      {
        letters.map((letter) => (
          <button
            key={letter}
            onClick={() => checkLetter(letter)}
          >{letter}</button>
        ))
      }
      <br></br>
      <button onClick={newGame}>¿Nuevo Juego?</button>
    </div>
  )
}

export default App
