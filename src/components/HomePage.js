import SignInComponent from "./SignInComponent";

//this is the landing page component
const HomePage = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-div">
          <span className="header-text">Welcome</span>
          <span className="header-text">to</span>
          <span className="header-text">WordRace!</span>
        </div>
      </div>
      <div className="bottom-container">
        <div className="description-div">
          <p>
            WordRace is a game designed to improve QWERTY typing rate and
            efficiency. Words will apprear one by one in a stck at a rate that
            goes up as time progresses. Stack space is limited and you have to
            clear it before it is filled.
          </p>
          <p>
            The faster you clear word from stack, the higher will be your score.
            If the stack is full, it's game over. Ofcourse you can try again.
            Don't worry on that.
          </p>
          <p>
            So, wanna try ho fast your finger falls down on right keys? Click on
            the button on your right to jump in.
          </p>
        </div>
        <div className="login-div">
          <SignInComponent />
          {/* <Button className="go-btn" variant="contained" color="primary">
            Lets's go!
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
