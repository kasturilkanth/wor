import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { fetchLeaderBoardData } from "../utils";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#184a36",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

//this component displays the leaderboard table
export default function LeaderBoardPage() {
  const classes = useStyles();

  const [leaderBoardData, setLeaderBoardData] = useState([]);

  //function used to fill data of leaderboard table
  const populateLeaderBoard = async () => {
    //helper function which calls api to get leaderboard data
    let leaderboard = await fetchLeaderBoardData();
    setLeaderBoardData(leaderboard);
  };

  useEffect(() => {
    populateLeaderBoard();
  }, []);

  //used to go to game page
  const backToGamePage = () => {
    window.location = "/game";
  };

  return (
    <>
      <div className="leaderboard-container">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell align="center">Score</StyledTableCell>
                <StyledTableCell align="center">
                  No. of games Played
                </StyledTableCell>
                <StyledTableCell align="center">Average Score</StyledTableCell>
                <StyledTableCell align="center">Maximum Level</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderBoardData.map((row, index) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.score}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.leaderboard[0].gamesPlayed}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.leaderboard[0].averageScore.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.leaderboard[0].maxLevel}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="back-button">
        <Button variant="contained" color="primary" onClick={backToGamePage}>
          Get back to game
        </Button>
      </div>
    </>
  );
}
