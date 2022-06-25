import { useEffect } from "react";
import { endRow, midRow, topRow } from "../utils";

//component that displays onscreen keyboard
const KeyBoardComponent = () => {
  //this function handles when the key is pressed or down
  const handleKeyDown = (e) => {
    let obj = document.getElementById(e.key.toUpperCase());
    if (obj) {
      obj.style.backgroundColor = "#edc345";
      // obj.style.color = "white";
    }
  };

  //this function handles when the key is released
  const handleKeyUp = (e) => {
    let obj = document.getElementById(e.key.toUpperCase());
    if (obj) {
      obj.style.backgroundColor = "#ddd";
      // obj.style.color = "black";
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);
  }, []);
  return (
    <div>
      <div className="letter-container">
        {topRow.map((alpha) => {
          return (
            <div className="letter-box" id={alpha}>
              <p>{alpha}</p>
            </div>
          );
        })}
      </div>
      <div className="letter-container">
        {midRow.map((alpha) => {
          return (
            <div className="letter-box" id={alpha}>
              <p>{alpha}</p>
            </div>
          );
        })}
      </div>
      <div className="letter-container">
        {endRow.map((alpha) => {
          return (
            <div className="letter-box" id={alpha}>
              <p>{alpha}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyBoardComponent;
