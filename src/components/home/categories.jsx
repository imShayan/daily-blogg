import { Button, TableCell, TableHead, TableRow , Table, TableBody , styled} from "@mui/material";

import { categories } from "../../constants/data";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const StyledButton = styled(Button)`
margin: 20px ;
width: 85%;
`

const StyledTable = styled(Table)`
border: 1px solid rgba(244,244,244,1);
`
const StyledLink = styled(Link)`
text-decoration: none ;
color: inherit;
`
const Categories = () => {
    const [serachParams] = useSearchParams();
    const category = serachParams.get('category');

    return (
        <>
        <StyledLink to={`/create/?category=${(category || '')}`}>
        <StyledButton variant="contained">Create Blog </StyledButton>
        </StyledLink>
     
         <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                    <StyledLink to={`/`}>
                    All Categories
                    </StyledLink>   
                    </TableCell>
                </TableRow>
            </TableHead>
           <TableBody>
            {categories.map((category) => 
                <TableRow key={category.id}>
                   <TableCell>
                    <StyledLink to={`/?category=${category.name}`} >
                    {category.name}
                    </StyledLink>
                   </TableCell>
               </TableRow>
            )}
         
           </TableBody>
         </StyledTable>
        </>
       

    )
}

export default Categories;