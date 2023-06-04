import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Divider,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

import { deletePost, likePost } from "../../../actions/posts";

//Post component
const Post = ({ post, setCurrentId }) => {
  //variables to keep track of state
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?._id;
  const hasLikedPost = post?.likes.find((like) => like === userId);

  //handle like function
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  //handle likes
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteOutlinedIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others liked`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <FavoriteOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  //open the post to see all the details
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card raised elevation={6} style={{ width: "592px" }}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <div className={classes.overlay}>
          <h2 style={{ color: "black", width: "200px" }}>{post.name}</h2>
        </div>

        <div className={classes.details}>
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted {moment(post.createdAt).fromNow()}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography>{post.message}</Typography>
        </CardContent>

        {(user?.result?._id === post?.creator ||
          user?.result?.googleId === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: "black" }}
              size="small"
            ></Button>
          </div>
        )}
      </ButtonBase>
      <Divider />
      <CardMedia
        style={{ width: "150px", height: "250px", paddingLeft: "400px" }}
        image={post.selectedFile}
      />
      <Divider />
      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator ||
          user?.result?.googleId === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
