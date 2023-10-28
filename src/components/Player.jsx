import { useState } from "react"

export default function Player({name,symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    const clickEventHandler = () => {
        setIsEditing(true);
    }

    if(isEditing) return (
        <li>
            <label>Input Name:</label>
            <input type="text" value={name}/>
            <label>Input Symbol:</label>
            <input type="text" value={symbol}/>
            <button>Save</button>
        </li>
    )
    
  return (
    <li>
      <span>
        <span className="player-name">{name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickEventHandler}>Edit</button>
    </li>
  )
}