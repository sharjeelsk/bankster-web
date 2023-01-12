import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import { styled } from '@mui/material/styles';
import { fetchCandidateInfo } from '../../redux/user/userActions';
import { setSnackbar } from '../../redux/flags/flagActions';
import "./Modals.scss"
import { setLoading } from '../../redux/loading/loadingActions';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const Input = styled('input')({
  display: 'none',
});
function EditProfileImage(props) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    aspect:1/1,
    height:50,
    width:50
   });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [outputFile,setOutputFile] = React.useState(null)
  const [flag,setFlag] = React.useState(false)

  React.useEffect(()=>{
    return ()=>{
      setImage(null)
      setOutput(null)
      setSrc(null)
      setCrop({
        aspect:1/1,
        height:50,
        width:50
       })
    }
  },[])
  
  const selectImage = (file) => {
    console.log(file)
    setSrc(URL.createObjectURL(file));
  };
  function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
  
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
      
    // Converting to base64
    
    const base64Image = canvas.toDataURL('image/jpeg');
    urltoFile(base64Image, 'hello.jpeg','image/jpeg')
    .then(function(file){ 
      console.log(file);
      setOutputFile(file)
    setOutput(base64Image);

    });
  };

  const handleSubmit = ()=>{
    const formdata = new FormData();
    if(outputFile){
      formdata.append('file',outputFile)
      formdata.append('candidateId',props.user.userInfo._id)
      if(props.user.userInfo.profilePicture.length>0){
        formdata.append('img',props.user.userInfo.profilePicture)
      }
      
      //props.setLoading(true)
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/upload-candidate-image`,formdata,{headers:{Accept:'application/json','Content-Type':"multipart/form-data",token:props.user.user}})
    .then(res=>{
        //props.setLoading(false)
        //props.getUserInfo(props.user.user)
        console.log(res)
        props.setSnackbar({type:"success",text:"Profile Changed Successfully",open:true})
        props.fetchCandidateInfo(props.user.user)
        props.setOpen(false)
      
    })
    .catch(err=>{
      //props.setLoading(false)
    })
}
  }
  
  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <DialogContent>
            <p className="modal-heading"><b>Edit Profile Image</b></p>
            <center>

        <br />
        <br />

        {(output || src) &&<>
        {
          output?
          <div>
            <img className="border-100" src={output} alt="output"/>
          </div>:
          <div>
          <ReactCrop 
          circularCrop
          src={src} onImageLoaded={setImage}
            crop={crop} onChange={setCrop} />
          <br />
          {src&&<Button variant="contained" onClick={cropImageNow}>Crop</Button>}
          <br />
          <br />
        </div>
        }
        </>}
                    <div className="" style={{textAlign:"center"}}>
            <label htmlFor="contained-button-file">
            <Input 
              onChange={(e) => {
                setOutput(null)
                selectImage(e.target.files[0]);
              }}
            accept="image/*" id="contained-button-file" multiple type="file" />
            <Button component="span" endIcon={<CameraAltIcon />}>
            Choose Image
            </Button>
            </label>
            </div>
      </center>






        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button disabled={output?false:true} onClick={()=>handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token)),
    setLoading:(value)=>dispatch(setLoading(value)),
    setSnackbar:(obj)=>dispatch(setSnackbar(obj))
  }
}

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileImage)