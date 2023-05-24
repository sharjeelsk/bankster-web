import React from 'react'
import "./Header.scss"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '@mui/material/Button'
import "./Header.scss"


const Header = (props) => {
	React.useEffect(()=>{

	},[props.user])
console.log("header",props.userInfo&&props.userInfo.companyName);
	return (
        <div className="p-4 rounded" style={{margin:"auto 5%"}}>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark   navbarclass " >
	<div className="container-fluid">
        <Link to="/"><img src='/banksterfullAsset.png' height={65} width={150} alt="eventfavicon" /></Link>
		{/* <Link className="navbar-brand"  style={{color:"black"}} to="/"><img style={{height:"6vh"}} src={Logo} /></Link> */}
	<button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
		<span className="navbar-toggler-icon" ></span>
	</button>
	{
		(props.userInfo&&props.userInfo.companyName)?<>
				<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto" id="nav">
		<li className="nav-item">
			{props.id==="1"?<Link  className="nav-link active" to="/searchcandidates">Search Candidates</Link>:<Link  className="nav-link"  to="/searchcandidates">Search Candidates</Link>}
			</li>
			<li className="nav-item">
			{props.id==="2"?<Link  className="nav-link active" to="/createjob">Post a Job</Link>:<Link  className="nav-link"  to="/createjob">Post a Job</Link>}
			</li>
			<li className="nav-item">
			{props.id==="3"?<Link  className="nav-link active" to="/SearchCandidateHome">Quick Candidates</Link>:<Link  className="nav-link"  to="/SearchCandidateHome">Quick Candidates</Link>}
			</li>

			<li className="nav-item">
			{props.userToken?
			<Link className="nav-link active" to={props.userType===0?"/candidatehome":"/recruiterhome"}>
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large" className="btn-purple">dashboard</Button>
				</Link>:
			<Link  className="nav-link" to="/signup">
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large"  className="btn-purple">Register / Log In as Candidate</Button>
				</Link>}
			</li>
			
			
		</ul>
	</div>
		</>:
		<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto" id="nav">
			<li className="nav-item">
			{props.id==="1"?<Link  className="nav-link active" to="/">Home</Link>:<Link  className="nav-link"  to="/">Home</Link>}
			</li>
			<li className="nav-item">
			{props.id==="2"?<Link  className="nav-link active" to="/findjobs">Find Jobs</Link>:<Link  className="nav-link"  to="/findjobs">Find Jobs</Link>}
			</li>
			<li className="nav-item">
			{props.id==="3"?<Link  className="nav-link active" to="/SearchCandidateHome">Find Candidates</Link>:<Link  className="nav-link"  to="/SearchCandidateHome">Find Candidates</Link>}
			</li>
			<li className="nav-item">
			{props.id==="4"?<Link  className="nav-link active" to="/SignupRecruiter">
				<Button variant="outlined">
				Register / Log In as Recruiter
				</Button>
				</Link>:<Link  className="nav-link"  to="/SignupRecruiter">
					<Button variant="outlined">
				Register / Log In as Recruiter
				</Button>
				</Link>}
			</li>
			<li className="nav-item">
			{props.userToken?
			<Link className="nav-link active" to={props.userType===0?"/candidatehome":"/recruiterhome"}>
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large" className="btn-purple">dashboard</Button>
				</Link>:
			<Link  className="nav-link" to="/signup">
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large"  className="btn-purple">Register / Log In as Candidate</Button>
				</Link>}
			</li>
			
			
		</ul>
	</div>
	}

</div>
</nav>
</div>
    );

}
const mapStateToProps =({banksterUser})=>{
	return {
		userToken:banksterUser.user,
		userType:banksterUser.userType,
		userInfo:banksterUser.userInfo
	}
	}
export default connect(mapStateToProps)(Header);