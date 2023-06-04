import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

import useStyles from "./styles";

//Navbar component
const Navbar = () => {
  const classes = useStyles(); //for styles

  //variables to keep track of state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //logout
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/");
    setUser(null);
  };

  //load this upon form load
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); 

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link
        to="/"
        className={classes.brandContainer}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Typography variant="h4">Palup</Typography>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile} style={{ paddingLeft: "340px" }}>
            <Button
              variant="contained"
              className="My-btn"
              style={{ color: "white", justifyContent: "flex-end" }}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Typography
            component={Link}
            to="/auth"
            variant="contained"
            style={{ color: "black", justifyContent: "flex-end" }}
          >
            Login/Register
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
