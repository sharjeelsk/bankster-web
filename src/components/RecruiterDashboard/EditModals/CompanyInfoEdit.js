import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { fetchRecruiterInfo } from '../../redux/user/userActions';
import "./Modals.scss"
import { Chip } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Autocomplete } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Add } from '@mui/icons-material';
const Input = styled('input')({
  display: 'none',
});
function EditProfile(props) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  let userInfo = props.user.userInfo;
  const [states, setStates] = React.useState([])
  const [cities, setCities] = React.useState([])
  const [formValues, setFormValues] = React.useState({ state: "", city: "" })
  const [tags, setTags] = React.useState([])
  const [singleTagName, setSingleTagName] = React.useState("")

  React.useEffect(() => {
    setValue("companyName", userInfo.companyName)
    setValue("companyDescription", userInfo.companyDescription)
    setValue("companyUrl", userInfo.companyUrl)
    setFormValues({ state: userInfo?.companyLocation?.state, city: userInfo?.companyLocation?.city })
    setTags(userInfo.companyTags)
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries/IN/states',
      headers: {
        'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setStates(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])


  const onSubmit = (data) => {
    console.log(data)
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/editRecruiterProfile`, { ...data, companyLocation: { ...formValues, country: "India" }, companyTags: tags }, { headers: { token: props.user.user } })
      .then(res => {
        console.log(res)
        props.fetchRecruiterInfo(props.user.user)
        props.setOpen(false)
      })
  }
  const getCities = (state) => {
    console.log(state)
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setCities(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <div>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <p className="modal-heading"><b>Edit Profile</b></p>
            {<>
              <TextField
                className="mb-3"
                inputProps={{ maxLength: 200 }}
                {...register("companyName", { required: true })}
                error={errors.companyName ? true : false}
                autoFocus
                margin="dense"
                id={'outlined-basic'}
                label={"Company Name"}
                fullWidth
                variant="outlined"
              />
              <TextField
                className="mb-3"
                inputProps={{ maxLength: 200 }}
                {...register("companyDescription", { required: true })}
                error={errors.companyDescription ? true : false}
                autoFocus
                margin="dense"
                id={'outlined-basic'}
                label={"Company Description"}
                fullWidth
                variant="outlined"
              />
              <TextField
                className="mb-3"
                inputProps={{ maxLength: 200 }}
                {...register("companyUrl", { required: true })}
                error={errors.companyUrl ? true : false}
                autoFocus
                margin="dense"
                id={'outlined-basic'}
                label={"Company Url"}
                fullWidth
                variant="outlined"
              />



              <div className="my-4">
                <Autocomplete
                  fullWidth
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, state: newValue.name });
                    getCities(newValue.iso2)
                  }}
                  id="controllable-states-demo"
                  options={states}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Select State" />}
                />
              </div>
              <div className="my-4">
                <Autocomplete
                  fullWidth
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, city: newValue.name });
                  }}
                  id="controllable-states-demo"
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Select City" />}
                />
              </div>

              <h3 className="mb-3 pb-3 light-text">Add Company Tags</h3>
              <div className="row my-3 mx-auto">
                <div className="col-10">
                  <TextField fullWidth onChange={(e) => setSingleTagName(e.target.value)} variant="outlined" id="outlined-basic" label="Enter Tag Name" />
                </div>
                <div className="col-2">
                  <IconButton onClick={() => {
                    if (tags !== undefined && !tags.includes(singleTagName)) {
                      setTags([...tags, singleTagName])
                    }
                  }}>
                    <Add />
                  </IconButton>
                </div>
              </div>
              {
                tags?.map((item, index) => <Chip color="primary" className="m-2" key={index} label={item} onDelete={() => setTags(tags?.filter(i => i !== item))} />)
              }
           </>}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecruiterInfo: (token) => dispatch(fetchRecruiterInfo(token))
  }
}

const mapStateToProps = ({ banksterUser }) => {
  return {
    user: banksterUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)