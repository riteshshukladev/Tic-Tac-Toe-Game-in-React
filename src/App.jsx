import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
function App() {
  
  const[acitvePlayer,setActivePlayer] = useState('X');

  function handleSelectSquare(){
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName="Player1" symbol="X" isActive={acitvePlayer==='X'}/>
          <Player InitialName="Player2" symbol="O" isActive={acitvePlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} acitvePlayerSymbol = {acitvePlayer}/>
      </div>
    </main>
  )
}

export default App
