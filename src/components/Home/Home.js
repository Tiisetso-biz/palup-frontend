import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

//Home component
const Home = () => {
  //variabes to keep track of state
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid style={{ paddingLeft: "288px"}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>

          <Grid style={{ paddingLeft: "300px" }} item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
