import { styled, Box, Button, FormControl, InputBase } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useState, useEffect, useContext } from "react";
import { useLocation , useNavigate , useParams} from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { API } from "../../service/api";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../editor/editToolbar";
import "react-quill/dist/quill.snow.css";


const Container = styled(Box)`
  margin: 50px 100px;
`;
const StyledFormControl = styled(FormControl)`
  margin: 10 px 20px;
  display: flex;
  flex-direction: row;
`;
const StyledInputBase = styled(InputBase)`
  margin: 10px 0px;
  font-size: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 40px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  marginBottom: '20px'
});

const initialPost = {
  title: "",
  description: "",
  // picture: "",
  categories: "",
  username: "",
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile ] = useState(null);

  const location = useLocation();

  const {account} = useContext(DataContext);
  const nagivate = useNavigate();
  const {id} = useParams();

  const url = post.picture? post.picture:
    "https://images.unsplash.com/photo-1702312721607-6749725ac0be?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    useEffect(()=> {
        const fetchData = async()=> {
            const response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data)
            }
        }
        fetchData();
    }, [id]);

    useEffect(()=> {
        const getImage= async() => {
            if(file){
              let data = new FormData();
              data.append('name', file.name); 
              data.append('file', file);

            // const response = await API.uploadFile(data);
            // post.picture = response.data;
            }
          }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username; 
        
  }, [file,post,location,account]);


  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updatePost =  async() => {
    const response = await API.updatePost(post); 
    if(response.isSuccess){
      nagivate(`/post/${id}`);
    }

  }

  const onDescriptionChange = (value)=>{
    setPost({...post , description: value})
  }

  return (
    <Container>
      <Image src={url} alt="banner" />
      <StyledFormControl>
        <label htmlFor="inputFile">
          <AddToPhotosIcon fontSize="large" color="action" />
        </label>
        <input 
          id="inputFile" 
          type="file" 
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}>
          </input>
          <span style={{padding: '10px'}}>Click to upload images</span>
        <Button variant="contained" onClick={()=> updatePost()} style={{marginLeft:'auto'}}>Update</Button>
      </StyledFormControl>
      <StyledInputBase
          placeholder="Enter the title ...."
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
  <Box>
      <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
            <EditorToolbar toolbarId={'t1'}/>
            <ReactQuill
              theme="snow"
              name="description"
              value={post.description}
              onChange={onDescriptionChange}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />
      </Box>
    </Container>
  );
};

export default Update;
