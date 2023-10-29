import Player from "./components/player"
import GameBoard from "./components/GameBoard"
function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player InitialName="Player1" symbol="X"/>
          <Player InitialName="Player2" symbol="O"/>
        </ol>
        <GameBoard/>
      </div>
    </main>
  )
}

export default App
