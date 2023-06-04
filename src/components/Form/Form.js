import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

//Form component with currentId and setCurrentId variables
const Form = ({ currentId, setCurrentId }) => {
  //keep track of state
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  //clear the fields and id
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  //onload, display post data
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost(
          { ...postData, name: user?.result?.name, creator: user?.result?._id },
          history
        )
      );
      history.push(`/posts/`);
      clear();
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.result?.name,
          creator: user?.result?._id,
        })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return <></>;
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name="message"
          variant="outlined"
          multiline
          label={`What's on your mind, ${user.result.name}?`}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="My-btn"
          style={{ color: "white" }}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          POST
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
