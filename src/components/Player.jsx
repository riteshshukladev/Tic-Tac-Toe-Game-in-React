import { useState } from "react"


export default function Player({InitialName,symbol ,isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const[PlayerName, setPlayerName] = useState(InitialName);
    const clickEventHandler = () => {
        setIsEditing((editing) => !editing);
        if(isEditing){
          onChangeName(symbol,PlayerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    // if(isEditing) return (
    //     <li>
    //         <label>Input Name:</label>
    //         <input type="text" value={name}/>
    //         <label>Input Symbol:</label>
    //         <input type="text" value={symbol}/>
    //         <button>Save</button>
    //     </li>
    // )

        
        let editableplayerName = <span className="player-name">{PlayerName}</span>

        if(isEditing) {
            editableplayerName= <input type="text" value={PlayerName} required onChange={handleChange}/>
        }

  return (
    <li className={isActive? 'active':undefined}>
      <span>
        {editableplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickEventHandler}>{isEditing ?'Save' : 'Edit'}</button>
    </li>
  )
}