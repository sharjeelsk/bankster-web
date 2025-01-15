import React from 'react'
import "./Header.scss"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import { deleteUser } from '../redux/user/userActions';
const Header = (props) => {
	React.useEffect(() => {

	}, [props.user])
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};


	const [anchorEprofile, setAnchorEprofile] = React.useState(null);
	const openprofile = Boolean(anchorEprofile);
	const profileHandle = (event) => {
		setAnchorEprofile(event.currentTarget);
	};
	const handleCloseProfile = () => {
		setAnchorEprofile(null);
	};

	const [anchorE2, setAnchorE2] = React.useState(null);
	const open2 = Boolean(anchorE2);
	const handleClick2 = (event) => {
		setAnchorE2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorE2(null);
	};
	return (
		<div className="p-4 rounded" style={{ margin: "auto 5%" }}>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark   navbarclass " >
				<div className="container-fluid">
					<Link to="/"><img src='/banksterfullAsset.png' height={65} width={150} alt="eventfavicon" /></Link>
					<button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
						<span className="navbar-toggler-icon" ></span>
					</button>
					{
						(props.userInfo && props.userInfo.companyName) ? <>
							<div className="collapse navbar-collapse" id="navbarResponsive">
								<ul className="navbar-nav ml-auto" id="nav">
									<li className="nav-item">
										{props.id === "1" ? <Link className="nav-link active" to="/searchcandidates">Search Candidates</Link> : <Link className="nav-link" to="/searchcandidates">Search Candidates</Link>}
									</li>
									<li className="nav-item">
										{props.id === "2" ? <Link className="nav-link active" to="/createjob">Post a Job</Link> : <Link className="nav-link" to="/createjob">Post a Job</Link>}
									</li>
									<li className="nav-item">
										{props.id === "3" ? <Link className="nav-link active" to="/SearchCandidateHome">Quick Candidates</Link> : <Link className="nav-link" to="/SearchCandidateHome">Quick Candidates</Link>}
									</li>

									<li className="nav-item">
										{props.userToken ?
											// <Link className="nav-link active" to={props.userType === 0 ? "/candidatehome" : "/recruiterhome"}>
											// 	<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple">dashboard</Button>
											// </Link>
											<>
												<Button sx={{ fontSize: "1.1rem" }}
													aria-controls={openprofile ? 'basic-menu' : undefined}
													aria-haspopup="true"
													aria-expanded={openprofile ? 'true' : undefined}
													onClick={profileHandle}
													size="large" className="btn-purple">
													<Avatar alt="Profile" src={props?.user?.userInfo?.profilePicture ? `${process.env.REACT_APP_DEVELOPMENT}/api/image/${props?.user?.userInfo?.profilePicture}` : "/user.png"} />

												</Button>

												<Menu
													id="basic-menu"
													anchorEl={anchorEprofile}
													open={openprofile}
													onClose={handleCloseProfile}
													MenuListProps={{
														'aria-labelledby': 'basic-button',
													}}
												>
													<MenuItem onClick={handleCloseProfile}><Link className="nav-link active" to={props.userType === 0 ? "/candidatehome" : "/recruiterhome"}>My Profile</Link></MenuItem>
													<MenuItem onClick={() => {
														props.deleteUser()
													}}><Link to='/' className="nav-link active">Logout</Link></MenuItem>
												</Menu>

											</>
											:
											<Link className="nav-link" to="/signup">
												<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple">Register / Log In as Candidate</Button>
											</Link>}
									</li>


								</ul>
							</div>
						</> :
							<div className="collapse navbar-collapse" id="navbarResponsive">
								<ul className="navbar-nav ml-auto" id="nav">
									<li className="nav-item">
										{props.id === "1" ? <Link className="nav-link active" to="/">Home</Link> : <Link className="nav-link" to="/">Home</Link>}
									</li>
									<li className="nav-item">
										{props.id !== "4" && props.id === "2" ? <Link className="nav-link active" to="/findjobs">Find Jobs</Link> : <Link className="nav-link" to="/findjobs">Find Jobs</Link>}
									</li>
									<li className="nav-item">
										{props.id !== "4" && props.id === "3" ? <Link className="nav-link active" to="/SearchCandidateHome">Find Candidates</Link> : <Link className="nav-link" to="/SearchCandidateHome">Find Candidates</Link>}
									</li>
									<li className="nav-item">
										{!props.userToken &&
											<>
												<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple"
													id="basic-button"
													aria-controls={open ? 'basic-menu' : undefined}
													aria-haspopup="true"
													aria-expanded={open ? 'true' : undefined}
													onClick={handleClick}
												>
													Recruiter
												</Button>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={open}
													onClose={handleClose}

													MenuListProps={{
														'aria-labelledby': 'basic-button',
													}}
												>
													<MenuItem to="/Loginrecruiter" className='border' onClick={handleClose}><Link to="/Loginrecruiter" className="nav-link">Login In</Link></MenuItem>
													<MenuItem to="/SignupRecruiter" style={{ padding: "inherit" }} onClick={handleClose}><Link to="/SignupRecruiter" className="nav-link">New Registration</Link></MenuItem>
												</Menu>
											</>



										}
									</li>
									<li className="nav-item" >
										{props.userToken ?
											// <Link className="nav-link active" to={!props?.userInfo?.companyName ? "/candidatehome" : "/recruiterhome"}>
											// 	<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple">dashboard</Button>
											// </Link>
											<>
												<Button sx={{ fontSize: "1.1rem" }}
													aria-controls={openprofile ? 'basic-menu' : undefined}
													aria-haspopup="true"
													aria-expanded={openprofile ? 'true' : undefined}
													onClick={profileHandle}
													size="large" className="btn-purple">
													<Avatar alt="Profile" src={props?.user?.userInfo?.profilePicture ? `${process.env.REACT_APP_DEVELOPMENT}/api/image/${props?.user?.userInfo?.profilePicture}` : "/user.png"} />

												</Button>

												<Menu
													id="basic-menu"
													anchorEl={anchorEprofile}
													open={openprofile}
													onClose={handleCloseProfile}
													MenuListProps={{
														'aria-labelledby': 'basic-button',
													}}
												>
													<MenuItem onClick={handleCloseProfile}><Link className="nav-link active" to={!props?.userInfo?.companyName ? "/candidatehome" : "/recruiterhome"}>My Profile</Link></MenuItem>
													<MenuItem onClick={() => {
														props.deleteUser()
													}}><Link to='/' className="nav-link active">Logout</Link></MenuItem>
												</Menu>

											</>

											:
											<>
												<Button sx={{ fontSize: "1.1rem" }}
													aria-controls={open2 ? 'basic-menu' : undefined}
													aria-haspopup="true"
													aria-expanded={open2 ? 'true' : undefined}
													onClick={handleClick2}
													variant="contained" size="large" className="btn-purple">Jobseeker</Button>

												<Menu
													id="basic-menu"
													anchorEl={anchorE2}
													open={open2}
													onClose={handleClose2}
													MenuListProps={{
														'aria-labelledby': 'basic-button',
													}}
												>
													<MenuItem className='border' onClick={handleClose2}><Link to="/login" className="nav-link">Login In</Link></MenuItem>
													<MenuItem style={{ padding: "inherit" }} onClick={handleClose2}><Link to="/signup" className="nav-link">New Registration</Link></MenuItem>
												</Menu>
											</>
										}
									</li>


								</ul>
							</div>
					}

				</div>
			</nav>
		</div>
	);

}


const mapStateToProps = ({ banksterUser }) => {
	return {
		userToken: banksterUser.user,
		userType: banksterUser.userType,
		userInfo: banksterUser.userInfo
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		deleteUser: () => dispatch(deleteUser()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);