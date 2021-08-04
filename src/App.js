import "./styles.css";
import { useState } from "react";
import flag_data from "./flag_data.json";

const flagDatabase = {};

(async () => {
  await Promise.all(
    flag_data.map(async function (flagObj) {
      flagDatabase[flagObj.emoji] = flagObj.name;
    })
  );
})();

var emojisWeKnow = Object.keys(flagDatabase);

export default function App() {
  var [userInput, setUserInput] = useState("");
  var [meaning, setMeaning] = useState("");

  function emojiClickHandler(emoji) {
    setMeaning(flagDatabase[emoji]);
  }

  function emojiInputHandler(event) {
    var emojiInput = event.target.value;
    setUserInput(emojiInput);

    var emojiMeaning = flagDatabase[emojiInput];

    if (emojiMeaning === undefined) {
      setMeaning("Could not find Flag in database:(");
    } else {
      setMeaning(emojiMeaning);
    }
  }

  function getUserInputDisplay() {
    if (userInput === "") {
      return "none";
    } else {
      return "block";
    }
  }

  return (
    <div className="App">
      <h1 id="app-heading">Country Flagopedia</h1>
      <input
        style={{ fontSize: "1.1rem" }}
        placeholder={"Search your flag"}
        onChange={emojiInputHandler}
      ></input>
      <div className="userInput" style={{ display: getUserInputDisplay() }}>
        {userInput}
      </div>
      <div className="userInput"> {meaning} </div>
      <div className="flags">
        {emojisWeKnow.map(function (item) {
          return (
            <div
              style={{
                padding: "0rem 0.7rem",
                margin: "0.5rem 0rem",
                cursor: "pointer"
              }}
              key={item}
              onClick={() => emojiClickHandler(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
