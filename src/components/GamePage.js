import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import InstructionComponent from "./InstructionComponent";
import KeyBoardComponent from "./KeyBoardComponent";
import StackComponent from "./StackComponent";
import GameOverComponent from "./GameOverComponent";
import { failureSound, successSound, updateUserData, words } from "../utils";

//This is the main component that renders the game
const GamePage = () => {
  const [open, setOpen] = useState(true);
  const [end, setEnd] = useState(false);
  const [time, setTime] = useState(4000);
  const [stackedWords, setStackedWords] = useState([]);
  const [activeWord, setActiveWord] = useState("");
  const [activeId, setActiveId] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [level, setLevel] = useState(1);
  const [wordPointPerLevel, setWordPointPerLevel] = useState(1);
  const interval = useRef({});

  useEffect(() => {
    clearInterval(interval.current.id);
  }, [end]);

  //this function is called to close the gameover modal and it is also
  //used to reset the state.
  const closeGameOverModal = () => {
    setEnd((prevValue) => !prevValue);
    setOpen(true);
    setStackedWords([]);
    setScore(0);
    setLevel(1);
    setMultiplier(1);
  };

  //this function is used to end the game
  const endGame = () => {
    setEnd((prevValue) => !prevValue);
    //this is a helper function that sends game data to update the
    //user's average score, max level etc
    updateUserData(score, level);
  };

  //this function is used to increase the score of one word
  // when the level increases
  const increaseWordScorePerLevel = () => {
    setWordPointPerLevel(10 * level);
  };

  //this function increase the score
  const increaseScore = () => {
    setScore((prevValue) => prevValue + wordPointPerLevel);
    setMultiplier((prevValue) => prevValue + 1);
    // handleWordApperingRate();
  };

  //this function increases level
  const increaseLevel = () => {
    if (score >= 30 * level) {
      setLevel((prevValue) => prevValue + 1);
    }
  };

  //this function is to route to leaderboard
  const proceedToLeaderBoard = () => {
    window.location = "/leaderboard";
  };

  //this function is to remove the correct word user types
  const removeStackedWords = (...args) => {
    const id = args;
    setStackedWords((prevState) => {
      let index = _.findIndex(prevState, { id });
      let newItems = _.cloneDeep(prevState);
      newItems.splice(index, 1);
      return newItems;
    });
  };

  //this function handles the keypress event
  //to capture what user types
  const onKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (key.match(/[A-Z]/i)) {
      const newInput = currentInput + key;
      if (activeWord.indexOf(newInput) === 0) {
        //when word is matching with the typed keys

        if (activeWord === newInput) {
          //when word is correct
          successSound();
          removeStackedWords(activeId);
          increaseScore();
          increaseLevel();
        }
        setCurrentInput(newInput);
      } else {
        failureSound();
        setCurrentInput("");
        setMultiplier(1);
      }
    }
  };

  //function used to start game
  const startGame = () => {
    //below setinterval handles the words appearing on interval
    //and related logic , state changes
    interval.current.id = setInterval(() => {
      document.getElementById("game-div").focus();
      increaseWordScorePerLevel();
      let rng = Math.floor(Math.random() * words.length);
      let idObj = { id: Date.now() };
      let wordObj = Object.assign(words[rng], idObj);
      wordObj["word"] = wordObj.word.toUpperCase();
      setStackedWords((prevState) => [...prevState, wordObj]);
      setActiveWord(wordObj.word);
      setActiveId(wordObj.id);
      setCurrentInput("");
    }, time);
    setOpen(false);
  };

  return (
    <div
      id="game-div"
      onKeyDown={(e) => {
        onKeyPress(e);
      }}
      tabIndex="0"
    >
      <div className="playground-container">
        <div className="controlls">
          <div className="level-box">
            <p className="level-text">{level}</p>
            <p className="level-text">Level</p>
          </div>
          <div className="score-box">
            <p className="level-text">{score}</p>
            <p className="level-text">Score</p>
          </div>
          <div className="multiplier-box">
            <p className="level-text">{multiplier}X</p>
          </div>
        </div>
        <div className="wordstack">
          <StackComponent stackedWords={stackedWords} endGame={endGame} />
        </div>
      </div>
      <div className="keyboard-container">
        <KeyBoardComponent />
      </div>
      <Modal
        className="modal"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        disableBackdropClick
      >
        <Fade in={open}>
          <div className="paper">
            <InstructionComponent
              startGame={startGame}
              proceedToLeaderBoard={proceedToLeaderBoard}
            />
          </div>
        </Fade>
      </Modal>
      <Modal
        className="modal"
        open={end}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        disableBackdropClick
      >
        <Fade in={end}>
          <div className="paper">
            <GameOverComponent
              closeGameOverModal={closeGameOverModal}
              score={score}
              level={level}
              multiplier={multiplier}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default GamePage;
