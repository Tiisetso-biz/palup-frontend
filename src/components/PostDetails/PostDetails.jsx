import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";

//PostDetails component
const PostDetails = () => {
  //variables to keep track of state
  const { post, isLoading } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  //get posts when oage loads
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);  // eslint-disable-next-line

  //load got posts by search if any
  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]); // eslint-disable-next-line

  if (!post) return null; //if there's no post return null

  const openPost = (_id) => history.push(`/posts/${_id}`); //when there's an open post

  //loading effect
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  //some recommended posts
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  // display post section and the elements within
  return (
    <Paper style={{ padding: "10px", borderRadius: "10px" }} elevation={3}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <h4>Posted by: {post.name}</h4>
          <h5 variant="body1">Posted {moment(post.createdAt).fromNow()}</h5>
          <p gutterBottom variant="body1" component="p">
            {post.message}
          </p>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div
          className={classes.imageSection}
          style={{ width: "300px", height: "300px" }}
        >
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section} >
          <h3 gutterBottom style={{ textAlign: "center" }}>
            Others' Posts
          </h3>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <h4>Posted by: {name}</h4>
                  <p gutterBottom variant="body1" component="p">
                    {message}
                  </p>
                  <Typography gutterBottom variant="subtitle1">
                    {likes.length} Likes
                  </Typography>
                  <img src={selectedFile} width="300px" alt=""/>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
