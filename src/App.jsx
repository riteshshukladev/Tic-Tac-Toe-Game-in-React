import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
      
      if(gameTurns.length > 0 && gameTurns[0].player  === 'X'){
        currentPlayer = 'O';
      }

    return currentPlayer;
}
function App() {
  
  // const[acitvePlayer,setActivePlayer] = useState('X');
  const[gameTurns,setGameTurns] = useState([]);

  const currentPlayer = derivedActivePlayer(gameTurns);
      

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevGameTurns =>{

      const currentTurn = derivedActivePlayer(prevGameTurns);

      const updatedTurns = [{ square:{row : rowIndex , col : colIndex}, player :  currentPlayer},...prevGameTurns];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName="Player1" symbol="X" isActive={currentPlayer==='X'}/>
          <Player InitialName="Player2" symbol="O" isActive={currentPlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} turns = {gameTurns}/>
      </div>
      <Log turns = {gameTurns}></Log>
    </main>
  )
}

export default App
