import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import {connect} from 'react-redux'
import {setSnackbar} from '../redux/flags/flagActions'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SimpleSnackbar(props) {
//comment
  return (
    <div>
    {props.snackbar&&<Snackbar
     anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
      open={props.snackbar.open}
      autoHideDuration={3000}
      onClose={()=>props.setSnackbar({text:"",type:"info",open:false})}
    >
      <Alert onClose={()=>props.setSnackbar({text:"",type:"info",open:false})} severity={props.snackbar.type} sx={{ width: '100%' }}>
          {props.snackbar.text}
      </Alert>
    </Snackbar>}
  </div>
//     <div>

//       <Snackbar
//               open={props.open}
//               autoHideDuration={300000}
//               onClose={()=>props.setOpen(false)}
//       >
//   <div  className="snackbar-style">
//     This is a success message!
//   </div>
// </Snackbar>
//     </div>
  );
}

const mapStateToProps = ({flag})=>{
  return {
    snackbar:flag.snackbar
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    setSnackbar:(snackbar)=>dispatch(setSnackbar(snackbar))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SimpleSnackbar)