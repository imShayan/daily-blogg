import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { API } from "../../service/api";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import Comment from "./comment";

const Container = styled(Box)`
  height: 70px;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  spacing-between: 10px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  height: 200px;
  margin: 0 20px;
`;

const initialComment = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

const Comments = ({ post }) => {
  const { account } = useContext(DataContext);

  const [comment, setComment] = useState(initialComment);
  const [comments, setComments] = useState([]);
  const [toggle ,setToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) {
          setComments(response.data);
        }
      }catch(error){
        console.log(error);
      }
  
    };
    fetchData();
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComments = async () => {
    const response = await API.postComment(comment);
    if (response.isSuccess) {
      setComment(initialComment);
    }
    setToggle((prevState)=> !prevState);
  };
  return (
    <>
      <Container>
        <AccountCircleIcon />
        <TextArea
          placeholder="Enter the comments"
          name="description"
          minRows={4}
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => addComments()}>
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <Comment comment={comment} key={index} setToggle={setToggle}/>
          ))}
      </Box>
    </>
  );
};

export default Comments;
