import {Box , Typography, styled } from '@mui/material';
import { addElipis } from '../../../utils/common-utils';

const Container = styled(Box)`
margin : 20px 20px ;
padding: 5px;
border : 3px solid #d9d9d9 ;
border-radius: 10px;
display: flex;
flex-direction: column;
`
const Text = styled(Typography)`
font-size: 12px;
color: grey;
margin:10px
`
const Heading = styled(Typography)` 
font-size: 18px;
font-weight:800;
margin: 40px 10px 10px 10px;
word-break: break-word;
`
const Details = styled(Typography)`
font-size: 14px;
word-break: break-word;
margin-left: 10px;
`
const Image = styled('img')({
    width: '100%',
    height:'200px',
    object: 'cover' ,
    borderRadius: '10px',
    backgroundColor: 'lime green'
})
const Post = ({ post }) => {
    const url = '';
    return (
        <Container>
            <Image src={url} alt='cardImage'/>
            <Heading>{addElipis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details dangerouslySetInnerHTML={{ __html: addElipis(post.description ,100)}}></Details>
            <Text>Category: {post.categories}</Text>
        </Container>
    )
}
export default Post;