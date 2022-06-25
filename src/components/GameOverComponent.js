import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { saveGame } from "../utils";

const useStyles = (theme) => ({
  header: {
    backgroundColor: "#f5f5f5",
    marginBottom: "0px",
    padding: ".8rem 1.4rem",
    lineHeight: "1.45",
    borderRadius: "5px",
    fontSize: "1.1rem",
    fontweight: "bold",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px"
  },
  closebutton: {
    right: theme.spacing(-53),
    width: theme.spacing(1),
    top: theme.spacing(-6.8),
    paddingRight: theme.spacing(-2),
    letterSpacing: "normal",
    wordSpacing: "normal",
    textTransform: "none",
    textIndent: "0px",
    textShadow: "none",
    minWidth: "35px",
    textAlign: "center",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      right: theme.spacing(-52.8),
      width: theme.spacing(2),
      top: theme.spacing(-6.3),
      backgroundColor: "#c00202",
      color: "#d3ebdb"
    }
  },
  content: {
    marginLeft: "1.2em",
    marginRight: "1em",
    marginTop: "-2.4em",
    fontFamily: "cursive"
  }
});

//This is the modal component that opens when game ends.
class GameOverComponent extends Component {
  constructor(props) {
    super(props);
    this.closeGameOverModal = props.closeGameOverModal;
    this.score = props.score;
    this.level = props.level;
    this.saveGameToServer = this.saveGameToServer.bind(this);
    this.proceedToLeaderBoard = this.proceedToLeaderBoard.bind(this);
  }

  //function is called to send data to server to store
  saveGameToServer = () => {
    //this is the helper function from util which calls the API endpoint '/game/saveGame'
    saveGame(this.props.score, this.props.level, this.props.multiplier);
    this.closeGameOverModal();
  };

  //to go to leaderboard page
  proceedToLeaderBoard = () => {
    window.location = "/leaderboard";
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.header}>GameOver!</div>
        <Button
          className={classes.closebutton}
          onClick={this.closeGameOverModal}
        >
          X
        </Button>
        <div className="details-display-container">
          <div className="details-display">
            <div>Score:{this.props.score}</div>
            <div>Level:{this.props.level}</div>
            <div>Multiplier:{this.props.multiplier}</div>
          </div>
          <div className="gameover-footer">
            <button
              id="save-score"
              className="save-score-btn"
              onClick={this.saveGameToServer}
            >
              Save Score
            </button>
            <button
              id="save-score"
              className="save-score-btn"
              onClick={this.proceedToLeaderBoard}
            >
              LeaderBoard
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(GameOverComponent);
