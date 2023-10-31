import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
function App() {
  
  const[acitvePlayer,setActivePlayer] = useState('X');
  const[gameTurns,setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevGameTurns =>{
      let currentPlayer = 'X';
      
      if(prevGameTurns.length > 0 && prevGameTurns[0].player  === 'X'){
        currentPlayer = 'O';
      }
      const updatedTurns = [{ square:{row : rowIndex , col : colIndex}, player :  currentPlayer},...prevGameTurns];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName="Player1" symbol="X" isActive={acitvePlayer==='X'}/>
          <Player InitialName="Player2" symbol="O" isActive={acitvePlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} turns = {gameTurns}/>
      </div>
      <Log turns = {gameTurns}></Log>
    </main>
  )
}

export default App
