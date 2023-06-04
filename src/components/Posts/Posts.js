import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
import "./NoPost.css";

//Posts component
const Posts = ({ setCurrentId }) => {
  //keep track of state
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  //no post
  if (!posts.length && !isLoading)
    return (
      <>
        <div class="animated-text">
          <span class="highlight">No post has been made.</span><br/>
          <span className="welcome">
            Please wait for posts to be made and they will appear right here.
          </span>
        </div>
      </>
    );

  //load all posts and display them in the view
  return isLoading ? (
    <CircularProgress color="success"  />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} >
          <br/>
          <Post post={post} setCurrentId={setCurrentId} />
          <br/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
