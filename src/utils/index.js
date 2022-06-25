import axios from "axios";
const EMAIL = "email";
const USER_ID = "user_id";

//consts stored to display keyboard
export const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
export const midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
export const endRow = ["Z", "X", "C", "V", "B", "N", "M"];

//words that are being sent
export const words = [
  { word: "cleannesses" },
  { word: "deceive" },
  { word: "enfeebl" },
  { word: "circumstance" },
  { word: "clank" },
  { word: "rearousing" },
  { word: "tomcats" },
  { word: "harmfulness" },
  { word: "unicolor" },
  { word: "multimode" },
  { word: "moundbirds" },
  { word: "toilsome" },
  { word: "exchanged" },
  { word: "cattle" },
  { word: "epigrapher" },
  { word: "untitled" },
  { word: "curricles" },
  { word: "unicolor" },
  { word: "reactions" },
  { word: "wildlings" },
  { word: "tacklings" },
  { word: "sports" },
  { word: "game" },
  { word: "soccer" }
];

//api base url
const Api = "https://word-race-node.herokuapp.com/api/";

//api call that checks and fetches user
export const signIn = async (email) => {
  const response = await axios.post(Api + "user/getUser", {
    email
  });
  if (response) {
    if (response.data.success) {
      window.localStorage.setItem(EMAIL, email);
      window.localStorage.setItem(USER_ID, response.data.user._id);
    }
    return response;
  }
};

//api call to add a user
export const signUp = async (email, name) => {
  const response = await axios.post(Api + "/user/addUser", {
    email,
    name
  });
  if (response.data.success) {
    window.localStorage.setItem(EMAIL, email);
    window.localStorage.setItem(USER_ID, response.data.addedUser._id);
  }
  return response;
};

//api call to save a particular game
export const saveGame = async (score, level, multiplier) => {
  let user_id = window.localStorage.getItem(USER_ID);
  const response = await axios.post(Api + "game/saveGame", {
    user_id,
    score,
    level,
    multiplier
  });
  return response;
};

//api call to update user data and statestics
export const updateUserData = async (score, level) => {
  let email = window.localStorage.getItem(EMAIL);
  const response = await axios.put(Api + "user/updateUserData", {
    email,
    score,
    level
  });
  return response;
};

//api call to fetch leaderboard data
export const fetchLeaderBoardData = async () => {
  const response = await axios.get(Api + "game/leaderboard");
  if (response.data.success) {
    return response.data.leaderboard;
  }
};

//success sound effect when user types correct
export const successSound = () => {
  var snd = new Audio("https://www.fesliyanstudios.com/play-mp3/2899");
  snd.play();
};

//wrong sound effect when user types incorrect
export const failureSound = () => {
  var snd = new Audio("https://www.fesliyanstudios.com/play-mp3/580");
  snd.play();
};
