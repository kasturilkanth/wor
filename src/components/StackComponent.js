import { useEffect } from "react";

//provides the container or stack where words are displayed
const StackComponent = (props) => {
  useEffect(() => {
    //when the stack is full i.e. at length 7, game ends
    if (props.stackedWords.length === 7) {
      props.endGame();
    }
  }, [props.stackedWords]);

  //function to design appearing words
  const highlightWords = (index, length) => {
    if (index === 6) {
      return "end-word";
    }
    if (index === length - 1) {
      return "current-word";
    } else {
      return "skipped-word";
    }
  };
  return (
    <div className="stack-container">
      {props.stackedWords.map((word, index) => {
        return (
          <div className={highlightWords(index, props.stackedWords.length)}>
            <p>{word.word}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StackComponent;
