import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signIn, signUp } from "../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

//component that is used for signin or sign up
function SignInComponent() {
  const classes = useStyles();
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  //is used for setting state that enables posting data to create a new user
  const postUser = () => {
    setIsUser(true);
    document.getElementById("btn").innerHTML = "Go!";
  };

  //handles the submit action
  const handleSubmit = async () => {
    if (!isUser) {
      //is fetching the user data if already signed up
      const response = await signIn(email);
      if (response?.data?.success) {
        window.location = "/game";
      } else {
        postUser();
      }
    } else {
      //sending data to server to create new user
      const res = await signUp(email, name);
      if (res.data.success) {
        window.location = "/game";
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          {isUser && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Button
            style={{ fontFamily: "cursive" }}
            id="btn"
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Enter!
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignInComponent;
