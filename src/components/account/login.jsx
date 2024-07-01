import { useState , useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api.js";
import { DataContext } from "../context/DataProvider.jsx";

import { useNavigate } from "react-router-dom";
/**
 * Override style material UI pre-defined components 
 */
const Component = styled(Box)`
  width: 440px;
  margin: 25px auto;
  box-shadow: 2px 2px 4px 4px rgb(0 0 0/0.3);
`;
const ImageWrapper = styled("img")({
  width: 400,
  margin: "auto",
  display: "flex",
  height: 250,
  padding: 20,
});
const Wrapper = styled(Box)`
  padding: 0 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div {
    margin: 10px 0;
  }
  & > button {
    margin: 20px 0;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
`;
const SignInButton = styled(Button)`
  text-transform: none;
`;
const Text = styled(Typography)`
  color: grey;
  font-size: 15px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: black;
  line-height: 0px;
  margin-top: 10px;
  font-weight: 600;
`;

/**
 * Initial State objects
 */
const initialsignUpAccountDetails = {
  username: "",
  email: "",
  password: "",
};
const  initialLoginDetials = {
  username: '',
  password: ''
}



function Login({isUserAuthenticated}) {
  const imagePath =
    "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [account, toggleAccount] = useState("signup");
  const [signUpAccount, setSignUpAccount] = useState(initialsignUpAccountDetails);
  const [error, setError] = useState();
  const [login , setLogin ] = useState(initialLoginDetials);

  const { setAccount } = useContext(DataContext);

  const navigate = useNavigate();
  /**
   * Handler related to Sign up
   * handleSignUpInputChange() handle the input feild changes in sign up template
   * signUpUser() handle API call to backend to store the user in DB
   */
  const handleLoginTemplateToggle = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  
  const handleSignUpInputChange = (e) => {
    setSignUpAccount({ ...signUpAccount, [e.target.name]: e.target.value });
  };

  const signUpUser = async () => {
    const response = await API.userSignup(signUpAccount);
    if (response.isSuccess) {
      setError("");
      setSignUpAccount(initialsignUpAccountDetails);
      toggleAccount("login");
    } else {
      setError("something went wrong ... please try again later");
    }
  };

  /**
   * Handlers related to login
   * handleLoginInputChanges handle data coming from input feild in login template
   * loginUser() makes call to the backend API to login user 
   */

  const handleLoginInputChange = (e) =>{
    setLogin({...login , [e.target.name] : e.target.value})
  } 

  const loginUser =  async() => {
    const response = await API.userLogin(login);

    if(response.isSuccess){
      setError('');
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount({username: response.data.username});
        isUserAuthenticated(true);
        navigate('/');        
        
    }else{
      setError('Something went wrong... Please try later!!')
    }
  }
  return (
    <Component>
      <Box>
        <ImageWrapper src={imagePath} alt="login.png" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="username"
              label="Enter Username"
              variant="standard"
              onChange={(e) => handleLoginInputChange(e)}
              name="username"
              autoComplete="on"
            />
            <TextField
              id="password"
              label="Enter Password"
              variant="standard"
              type="password"
              onChange={(e) => handleLoginInputChange(e)}
              name="password"
            />
            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>
              Not registered? Please Sign up.
            </Text>
            <SignInButton
              variant="outlined"
              onClick={() => handleLoginTemplateToggle()}
            >
              Sign Up
            </SignInButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="username"
              label="Enter Username"
              variant="standard"
              onChange={(e) => handleSignUpInputChange(e)}
              name="username"
              autoComplete="on"
            />
            <TextField
              id="email"
              label="Enter email"
              variant="standard"
              type="email"
              onChange={(e) => handleSignUpInputChange(e)}
              name="email"
              autoComplete="on"
            />
            <TextField
              id="password"
              label="Enter Password"
              variant="standard"
              type="password"
              onChange={(e) => handleSignUpInputChange(e)}
              name="password"
            />
            {error && <Error>{error}</Error>}

            <SignInButton variant="contained" onClick={() => signUpUser()}>
              Sign Up
            </SignInButton>
            <Text style={{ textAlign: "center" }}>Already have a account?</Text>
            <LoginButton
              variant="outlined"
              onClick={() => handleLoginTemplateToggle()}
            >
              Login
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
