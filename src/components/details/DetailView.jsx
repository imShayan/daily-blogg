
import { Box, Typography ,styled } from "@mui/material";
import { useContext, useEffect , useState } from "react";
import { useParams ,useNavigate, Link} from "react-router-dom";
import { API } from "../../service/api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataContext} from '../context/DataProvider';
import Comments from "../comment/comments";


const intialPost = {
    title:'',
    description:'',
    author: '',
    createdDate: '',
}


const Container = styled(Box)`
margin : 50px 100px;
`
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`
const Edit = styled(EditIcon)`
margin: 5px;
padding: 5px;
border: 2px solid grey;
border-radius: 5px;
`
const Delete = styled(DeleteIcon)`
margin: 5px;
padding: 5px;
border: 2px solid grey;
border-radius: 5px;
`
const Author = styled(Box)`
color: #878787;
margin: 20px 0;
display: flex;
`

const DetailView = () => {
    const [post , setPost] = useState(intialPost);
    const {id} = useParams();
    const nagivate = useNavigate();

    const {account} = useContext(DataContext);
    const url = 'https://plus.unsplash.com/premium_photo-1684379149861-27b6bbe04400?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    
    useEffect(() => {
            const getPostById = async() => {
                const response = await API.getPostById(id);
                if(response.isSuccess){
                    setPost(response.data)
                }
            }
            getPostById();
    },[id])

    const DeletePost = async () => {
        let response = await API.deletePost(id);
        if(response.isSuccess){
            nagivate('/')
        }
    }
    return (
        <Container>
            <Image src={url} alt="post_banner"/>
            <Box style={{float:'right'}}>
             {
                account.username === post.username && 
                <>
                  <Link 
                  to={`/update/${post._id}`}>
                        <Edit color="primary"/>
                  </Link>
                   <Delete color="error" onClick={()=> DeletePost()}/>
                </>

             }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author: <Box component='span' style={{fontWeight: '600'}}></Box>{post.username}</Typography>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Typography dangerouslySetInnerHTML={{ __html: post.description}}></Typography>
            <Comments post = {post}/>
        </Container>
    )
}

export default DetailView;