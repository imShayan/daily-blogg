import { AppBar, Toolbar, styled } from "@mui/material";

import { Link } from "react-router-dom";

const Component = styled(AppBar)`
background-color: #ffffff;
color: #000;
`

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
    text-decoration: none;
    padding: 20px;
    color: inherit
    }
`
const Header = () => {
    return (
        <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Logout</Link>
            </Container>
        </Component>
    )
}

export default Header;