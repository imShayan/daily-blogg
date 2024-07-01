import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import { API } from "../../service/api";

const Delete = styled(DeleteIcon)`
margin: 5px;
padding: 5px;
border: 2px solid grey;
border-radius: 5px;
margin-left: auto;
`

const Component = styled(Box)`
margin-top: 30px;
padding: 10px;
background: #f5f5f5;
`
const Container = styled(Box)`
display: flex;
align-items: center ;
`
const Name = styled(Typography)`
font-weight: 600;
margin-right: 20px;
font-size: 18px;
`

const Created = styled(Typography)`
font-size : 12px;
color:grey;
`

const Comment = ({comment , setToggle}) => {
    const {account } = useContext(DataContext);


    const removeComments = async() => {
        const response = await API.deleteComment(comment._id);
        if(response.isSuccess){
            setToggle(prevState => !prevState)
        }
    }
    return (
        <Component>
            <Container>
            <Name>{comment.name}</Name>
            <Created>{new Date(comment.date).toDateString()}</Created>
            {comment.name === account.username && <Delete onClick={() => removeComments()}/>}
            </Container>
            <Box>
            <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    )
}

export default Comment;