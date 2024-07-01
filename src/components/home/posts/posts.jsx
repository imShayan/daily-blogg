import { useState, useEffect } from "react";
import {API} from '../../../service/api.js'
import Post from "./post.jsx";
import { Grid } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts , setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category =  searchParams.get('category');

    useEffect(()=> {
      const fetchData = async() => {
        const response = await API.getAllPosts({category: category || ''});
        if(response.isSuccess){
            setPosts(response.data)
        }
      }
      fetchData();
    },[category]);


    return (
        <>
          <Grid container spacing={0}>
          {
            posts && posts.length > 0 ?  posts.map((post, idx) => (
               <Grid item lg={3} sm={4} xs={12} key={idx}>
                <Link to={`/post/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Post post= {post} key={idx}/>
                </Link>     
                </Grid>
            ))
            :
            <div>no data available</div>
        }   
          </Grid>
        </>
    )
}

export default Posts;