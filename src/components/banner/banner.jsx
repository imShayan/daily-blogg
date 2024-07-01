import {Box , Typography, styled } from '@mui/material';

const Image = styled(Box)`
background: url(https://images.unsplash.com/photo-1713549519427-b49b7aadd814?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/55% repeat-x #000;
width: 100%;
height: 50vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Heading = styled(Typography)`
    font-size: 70px;
    color: #fff;
    weight: 400;
    line-height: 1;
`
const SubHeading = styled(Typography)`
font-size: 20px;
background: #fff;
`
const Banner = () => {
    return (
        <Image>
            <Heading>Blog</Heading>
            <SubHeading>Blog your life</SubHeading>
        </Image>
    )
}

export default Banner;