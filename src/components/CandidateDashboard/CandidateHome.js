import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CandidateDashhead from './CandidateDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo} from '../redux/user/userActions'
import "./CandidateHome.scss"
import { Chip,Button } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PublishIcon from '@mui/icons-material/Publish';
import HeaderDash from '../Header/HeaderDash';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PersonalInfoEdit from './EditModals/PersonalInfoEdit';
import AddEmployment from './EditModals/AddEmployment';
import AddEducation from './EditModals/AddEducation';
import AddSkillPreferences from './EditModals/AddSkillPreferences';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import Footer from '../Footer/Footer'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {setSnackbar} from '../redux/flags/flagActions'
import { getAge } from '../utils/Functions';
import EditProfile from './EditModals/EditProfile';
import EditProfileImage from './EditModals/EditProfileImage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
const Input = styled('input')({
    display: 'none',
  });
function CandidateHome(props) {
    const [display,setDisplay]=React.useState(false)
    const [open,setOpen]=React.useState(false) //personal info open trigger
    const [open2,setOpen2] = React.useState(false)
    const [open3,setOpen3] = React.useState(false)
    const [open4,setOpen4] = React.useState(false)
    const [open5,setOpen5]=React.useState(false)
    const [open6,setOpen6]=React.useState(false)

    const [flag,setFlag]=React.useState(false)

    const [key,setKey]=React.useState("") //key to pass to personal info prop
    const [keyName,setKeyName]=React.useState("")
    const [editData,setEditData]=React.useState(null) //edit data to pass to the edit respective edit component
    const [dashboardData,setDashboardData]=React.useState(null)
    console.log(key,keyName,dashboardData)
    let userInfo = props.user.userInfo

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getCandidateProfile`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                props.storeUserInfo(res.data.result)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[flag])

    const upload = (e)=>{
        console.log(e.target.files[0])
        const formdata = new FormData();
        if(!Array.isArray(e.target.files[0])){
          formdata.append('file',e.target.files[0])
          formdata.append('collectionName',"Candidate")
          formdata.append('type',"image")
          //props.setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/upload`,formdata,{headers:{Accept:'application/json','Content-Type':"multipart/form-data",token:props.user.user}})
        .then(res=>{
            //props.setLoading(false)
            //props.getUserInfo(props.user.user)
            console.log(res)
            props.setSnackbar({type:"success",text:"Profile Changed Successfully",open:true})
            setFlag(!flag)
          
        })
        .catch(err=>{
          //props.setLoading(false)
        })
    }
    }

    const upload2 = (e)=>{
        console.log(e.target.files[0])
        const formdata = new FormData();
        if(!Array.isArray(e.target.files[0])){
          formdata.append('file',e.target.files[0])
          formdata.append('collectionName',"Candidate")
          formdata.append('type',"pdf")
          //props.setLoading(true)
          console.log(formdata)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/upload`,formdata,{headers:{Accept:'application/json','Content-Type':"multipart/form-data",token:props.user.user}})
        .then(res=>{
            //props.setLoading(false)
            //props.getUserInfo(props.user.user)
            console.log(res)
            props.setSnackbar({type:"success",text:"Resume Updated Successfully",open:true})
            setFlag(!flag)
          
        })
        .catch(err=>{
          //props.setLoading(false)
        })
    }
    }

    const renderEmployementString = ()=>{
        if(userInfo.fresher){
            return "Fresher"
        }else if(userInfo.workExperience.filter(i=>i.current===true).length>0){
            let strobj = userInfo.workExperience.filter(i=>i.current===true)[0]
            return `${strobj.designation} | ${strobj.name}`
        }else{
            return "Currently Unemployed"
        }
    }


    return (
        <>

            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <CandidateDashhead setDashboardData={setDashboardData} margin={0} id={1} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            {props.user.userInfo&&<>
            <PersonalInfoEdit 
            open={open}
            setOpen={setOpen}
            languages={userInfo.languages} //languages array in case if languages is sent to edit
            keyD={key} //key of the textfield
            keyName={keyName} //keyname of the textfield
            />
            <AddEmployment
            open={open2}
            setOpen={setOpen2}
            keyD={key} //key if add or edit
            editData={editData}
            />
            <AddEducation
            open={open3}
            setOpen={setOpen3}
            keyD={key} //key if add or edit
            editData={editData}
            />
            <AddSkillPreferences
            open={open4}
            setOpen={setOpen4}
            keyD={key} //key if add or edit
            />
            <EditProfile
            open={open5}
            setOpen={setOpen5}
            />
            <EditProfileImage
            open={open6}
            setOpen={setOpen6}
            />
            {/* candidate row section */}
            <section className="candidate-info-section row m-auto shadow-sm">
                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 img-cont">
                    <img src={props.user.userInfo.profilePicture?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${props.user.userInfo.profilePicture}`:"/user.png"} alt="profile" />
                    {/* <div className="mt-4 mb-2" style={{textAlign:"center"}}>
                    <label htmlFor="contained-button-file">
                    <Input 
                    onChange={upload}
                    accept="image/*" id="contained-button-file" multiple type="file" /> */}
                    <Button onClick={()=>setOpen6(true)} component="span" endIcon={<CameraAltIcon />}>
                    Change image
                    </Button>
                    {/* </label>
                    </div> */}
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 info-cont">
                <h1>{userInfo.fullName} <IconButton onClick={()=>setOpen5(true)}><EditIcon /></IconButton></h1>
                <p className="bold-text">{renderEmployementString()}</p>
                <p className="bold-text">{userInfo.education.length>0?userInfo.education.map(i=>{
                    if(i.featuredEducation){
                        return i.name + ', ' + i.universityName;
                    }
                }):"Add Featured Education"}</p>
                    <p className="grey-text">{userInfo.gender} | {userInfo.dob?getAge(userInfo.dob):"DOB Missing"}</p>
                    <p className="grey-text">{userInfo.yearsOfExperience} Years of Experience | {userInfo.currentCtc} CTC | {userInfo.product} | {userInfo.noticePeriod} Weeks Notice Period</p>
                        <div className="row m-auto sub-info">
                        <p className="mx-2"><LocalPhoneIcon sx={{marginRight:.1}} /> <b>{userInfo.mobileNo}</b></p>
                            <p className="mx-2"><AlternateEmailIcon sx={{marginRight:.1}} /> <b>{userInfo.email}</b></p>
                            <p className="mx-2"><LocationOnIcon sx={{marginRight:.1}} /> <b>{userInfo.userLocation.city}, {userInfo.userLocation.state}</b></p>
                        </div>
                        <p className="resume-tagline grey-text">{userInfo.resumeTagline?userInfo.resumeTagline:"Tagline Missing"}</p>
                    <div className="row m-auto chip-div">
                    {userInfo.skills.length>0?userInfo.skills.map((item,index)=><Chip label={item} key={index} className="mx-2" color="primary" />):<p style={{color:"red",fontWeight:"bold"}}>You haven't added any skills yet, add from the skills section below</p>}
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 resume-div p-0">
                    <div className="resume-head shadow-sm">
                        {userInfo.resume?<div className="resume-child row m-auto">
                            <div className="col-2">
                                <InsertDriveFileIcon color="primary" />
                            </div>
                            <div className="col-8 underline-hover" onClick={()=>window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${userInfo.resume}`, '_blank')}>
                                <h4>{userInfo.fullName}'s Resume.{userInfo.resume.split(".")[1]}</h4>
                                <p>Click to view resume</p>
                            </div>
                            <div className="col-2">
                            <label htmlFor="contained-button-file2">
                            <Input 
                            onChange={upload2}
                            accept="application/*" id="contained-button-file2" multiple type="file" />
                                <IconButton component="span">
                                <PublishIcon sx={{fontSize:30}} color="tertiary" />
                                </IconButton>
                                </label>
                            </div>
                        </div>:
                        <div className="resume-child row m-auto">
                        <div className="" style={{margin:"auto"}}>
                        <label htmlFor="contained-button-file3">
                    <Input 
                    onChange={upload2}
                    accept="application/*" id="contained-button-file3" multiple type="file" />
                    <Button variant="contained" component="span" endIcon={<UploadFileIcon />}>
                    Upload Resume
                    </Button>
                    </label>
                        </div>
                        
                    </div>
                        }
                    </div>

                    <div className="row m-auto subs-div align-items-center justify-content-around">
                        <div className="col-8">
                            <h5>Currently on {userInfo.subscription&&userInfo.subscription.name} Tier</h5>
                            <p>Upgrading plan will result in your profile being displayed on home this will increase your hiring probability</p>
                        </div>
                        <div className="col-4">
                            <Button onClick={()=>props.history.push("/subscription")} variant="contained">Upgrade</Button>
                        </div>
                    </div>
                </div>
            </section>
            {/* candidate row section */}


            {/* view sections */}

            <section className="row m-auto view-section-head justify-content-around">
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 view-section-child row m-auto align-items-center justify-content-around shadow-sm">
                    <div>
                    <p>Total Profile Views</p>
                    </div>

                    <div className="ml-2">
                        <h2>{props.user.userInfo.profileViewCount}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 view-section-child row m-auto align-items-center justify-content-around shadow-sm">
                    <div>
                    <p>Total Profile Bookmarks</p>
                    </div>

                    <div className="ml-2">
                        <h2>{dashboardData&&dashboardData.totalProfileBookmarks[0].total}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 view-section-child row m-auto align-items-center justify-content-around shadow-sm">
                    <div>
                    <p>Your Hiring Rate</p>
                    </div>

                    <div className="ml-2">
                    <h2>{dashboardData&&(
                            Math.ceil((dashboardData.hiredJobs[0].total/
                            (dashboardData.appliedJobs[0].total))*100)
                            )}%</h2>
                    </div>
                </div>
            </section>

            {/* view sections */}

            {/* profile info sections */}
            <section className="row m-auto info-sections justify-content-around">
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 info-child shadow-sm">
                    {/* heading of personal info */}
                    <div className="row m-auto justify-content-between">
                        <div>
                        <h2>Personal Info</h2>
                        </div>
                        <div>
                            {/* <Button>Add Details</Button> */}
                        </div>
                    </div>

                    {/* content of perosnal ifno */}
                    <div className="row m-auto justify-content-between info-sub-content">
                        <div>
                        <p className="key">Date of Birth</p>
                        <p className="val">{moment.parseZone(userInfo.dob).local().format("dddd, MMMM Do YYYY")}</p>
                        </div>
                        <div>
                            <IconButton onClick={()=>{
                                setKey("dob")
                                setKeyName("Date of Birth")
                                setOpen(true)}}>
                                <EditIcon color="primary" />
                            </IconButton>
                            {/* <IconButton>
                                <DeleteOutlinedIcon color="error" />
                            </IconButton> */}
                        </div>
                    </div>
                    <div className="row m-auto justify-content-between info-sub-content">
                        <div>
                        <p className="key">Languages</p>
                        <p className="val">
                            {
                                userInfo.languages.map((item,index)=><span key={index}>{item} | </span>)
                            }
                        </p>
                        </div>
                        <div>
                            <IconButton onClick={()=>{
                                setKey("languages")
                                setKeyName("Languages")
                                setOpen(true)}}>
                                <EditIcon color="primary" />
                            </IconButton>
                            {/* <IconButton>
                                <DeleteOutlinedIcon color="error" />
                            </IconButton> */}
                        </div>
                    </div>
                    <div className="row m-auto justify-content-between info-sub-content">
                        <div>
                        <p className="key">Marital Status</p>
                        <p className="val">{userInfo.maritalStatus}</p>
                        </div>
                        <div>
                            <IconButton onClick={()=>{
                                setKey("maritalStatus")
                                setKeyName("Marital Status")
                                setOpen(true)}}>
                                <EditIcon color="primary" />
                            </IconButton>
                            {/* <IconButton>
                                <DeleteOutlinedIcon color="error" />
                            </IconButton> */}
                        </div>
                    </div>
                    <div className="row m-auto justify-content-between info-sub-content">
                        <div>
                        <p className="key">Category</p>
                        <p className="val">{userInfo.category}</p>
                        </div>
                        <div>
                            <IconButton onClick={()=>{
                                setKey("category")
                                setKeyName("Category")
                                setOpen(true)}}>
                                <EditIcon color="primary" />
                            </IconButton>
                            {/* <IconButton>
                                <DeleteOutlinedIcon color="error" />
                            </IconButton> */}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 info-child shadow-sm">
                    <div className="row m-auto justify-content-between">
                        <div>
                        <h2>Employment</h2>
                        </div>
                        <div>
                            <Button onClick={()=>{
                                setOpen2(true)
                                setKey("Add")
                            }}>Add Details</Button>
                        </div>
                    </div>
                    {
                        userInfo.workExperience.length>0?
                        userInfo.workExperience.map((item,index)=>(
                            <div key={index} className="row m-auto justify-content-between info-sub-content">
                            <div className="p-0 col-8">
                            <p className="key">{item.designation} | {item.name}</p>
                            <p className="val">{item.description}</p>
                            <p className="datefromto">{moment.parseZone(item.startDate).local().format("DD/MM/YYYY")} - {item.current?"Current":moment.parseZone(item.endDate).local().format("DD/MM/YYYY")}</p>
                            </div>
                            <div className="p-0 col-4" style={{textAlign:"right"}}>
                                <IconButton onClick={()=>{
                                    setOpen2(true)
                                    setKey("Edit")
                                    setEditData(item)
                                }}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={()=>{
                                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeEmployment`,{obj:item},{headers:{token:props.user.user}})
                                    .then(res=>{
                                        console.log(res)
                                        setFlag(!flag)
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                                }}>
                                    <DeleteOutlinedIcon color="error" />
                                </IconButton>
                            </div>
                        </div>
                        ))
                        :<p><b>Add Employment Details</b></p>
                    }

                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 info-child shadow-sm">
                    <div className="row m-auto justify-content-between">
                        <div>
                        <h2>Education</h2>
                        </div>
                        <div>
                            <Button onClick={()=>{
                                setOpen3(true)
                                setKey("Add")
                            }}>Add</Button>
                        </div>
                    </div>
                    {
                        userInfo.education.length>0?
                        userInfo.education.map((item,index)=>(
                            <div key={index} className="row m-auto justify-content-between info-sub-content">
                           <div className="p-0 col-8">
                            <p className="key">{item.name}</p>
                            <p className="val">{item.universityName}</p>
                            <p className="datefromto">{moment.parseZone(item.startDate).local().format("DD/MM/YYYY")} - {item.current?"Current":moment.parseZone(item.endDate).local().format("DD/MM/YYYY")} - {item.featuredEducation?"Featured":null}</p>
                            </div>
                            <div className="p-0 col-4" style={{textAlign:"right"}}>
                                <IconButton onClick={()=>{
                                    setOpen3(true)
                                    setKey("Edit")
                                    setEditData(item)
                                }}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={()=>{
                                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeEducation`,{obj:item},{headers:{token:props.user.user}})
                                    .then(res=>{
                                        console.log(res)
                                        setFlag(!flag)
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                                }}>
                                    <DeleteOutlinedIcon color="error" />
                                </IconButton>
                            </div>
                        </div>
                        ))
                        :<p><b>Add Education Details</b></p>
                    }
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 info-child shadow-sm">
                    <div className="row m-auto justify-content-between">
                        <div>
                        <h2>Key Skills</h2>
                        </div>
                        <div>
                            <Button onClick={()=>{
                                setOpen4(true)
                                setKey("Add Skill")
                            }}>Add</Button>
                        </div>
                    </div>
                    {
                        userInfo.skills.map((item,index)=><Chip className="m-2" color="primary" onDelete={()=>{
                            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeKeySkill`,{skillName:item},{headers:{token:props.user.user}})
                            .then(res=>{
                                console.log(res)
                                setFlag(!flag)
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }} label={item} key={index} />)
                    }
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 info-child shadow-sm">
                    <div className="row m-auto justify-content-between">
                        <div>
                        <h2>Preferences</h2>
                        </div>
                        <div>
                            <Button onClick={()=>{
                                setOpen4(true)
                                setKey("Add Preference")
                            }}>Add</Button>
                        </div>
                    </div>
                    {
                        userInfo.preferences.map((item,index)=><Chip className="m-2" color="primary" onDelete={()=>{
                            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removePreference`,{preference:item},{headers:{token:props.user.user}})
                            .then(res=>{
                                console.log(res)
                                setFlag(!flag)
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }} label={item} key={index} />)
                    }
                </div>

            </section>
            {/* profile info sections */}

            </>}



             </div>
    </div>
    </>
    )
}

const mapStateToProps = ({banksterUser})=>{    
    return {
        user:banksterUser
    }
}

const mapDispatchToProps = (dispatch)=>{    
    return {
        storeUserInfo:(userInfo)=>dispatch(storeUserInfo(userInfo)),
        setSnackbar:(obj)=>dispatch(setSnackbar(obj))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CandidateHome)
