import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import "../../App.css";

/**The initialState object represents the initial state of the form fields. 
 * It contains properties for first name, last name, email, password, and confirm password. 
 * */
const intialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/**The Auth component is defined as a functional component. 
 * It uses hooks such as useState to manage state variables like showPassword, isSignUp, and formData.
 * It also utilizes the useDispatch and useHistory hooks for dispatching actions and managing navigation history, respectively. 
 * */
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const handleShowPassword = () => setShowPassword(!showPassword);
  const history = useHistory();

  /**The handleSubmit function is called when the form is submitted. 
   * It prevents the default form submission behavior, and based on the value of isSignUp, 
   * it dispatches either a signup or signin action with the form data and the navigation history. */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  /**The handleChange function is called when any input field value changes. 
   * It updates the formData state by spreading the existing state and updating the specific field that matches the input's name attribute.
 */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**The switchMode function is called when the user wants to switch between signup and login modes. 
   * It toggles the isSignUp state and sets showPassword to false */
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4">{isSignUp ? "Registration Form" : "Welcome to Palup!"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="My-btn"
            style={{color: "white"}}
          >
            {isSignUp ? "Register" : "Login"}
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Button onClick={switchMode} style={{textDecoration: "underline"}}>
                {isSignUp
                  ? "Already have an account? Log in"
                  : "Do not have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
