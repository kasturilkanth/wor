import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

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

//this is the modal which renders instructions and start,leaderboard buttons
class InstructionComponent extends Component {
  constructor(props) {
    super(props);
    this.startGame = props.startGame;
    this.proceedToLeaderBoard = props.proceedToLeaderBoard;
    this.backToHomePage = this.backToHomePage.bind(this);
  }

  //function to go home
  backToHomePage = () => {
    window.location = "/";
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.header}>How to play!</div>
        <Button className={classes.closebutton} onClick={this.backToHomePage}>
          X
        </Button>
        <div className={classes.content}>
          <ul>
            <li>Click on the start button to proceed.</li>
            <li>Words are appearing per two(2) seconds.</li>
            <li>You get 10 points for every correct word you type.</li>
            <li>If you are unable to type 7 words correctly, game is over.</li>
          </ul>
          <div className="instruction-footer">
            <div className="start-btn-div">
              <Button
                id="start-btn"
                variant="contained"
                color="primary"
                onClick={this.startGame}
              >
                Start
              </Button>
            </div>
            <div className="leaderboard-btn-div">
              <Button
                variant="contained"
                color="primary"
                onClick={this.proceedToLeaderBoard}
              >
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(InstructionComponent);
