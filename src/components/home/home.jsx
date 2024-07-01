import Banner from "../banner/banner";
import Categories from './categories';
import Posts from "./posts/posts";

import { Grid } from "@mui/material";
const Home = () => {
    return <>
         <Banner/>
         <Grid container>
            <Grid item lg={2} sm={8} xs={12}>
                <Categories/>
            </Grid>
            <Grid item lg={10} sm={10} xs={12}>
                <Posts></Posts>
            </Grid>
         </Grid>
       
    </>
    
}
export default Home;