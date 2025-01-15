import React from 'react'
import "./Header.scss"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@mui/material/Button'
import "./Header.scss"
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { deleteUser } from '../redux/user/userActions';

const HeaderDash = ( {image, ...props }) => {
	React.useEffect(() => {

	}, [props.user])
	const [anchorEprofile, setAnchorEprofile] = React.useState(null);
	const openprofile = Boolean(anchorEprofile);
	const profileHandle = (event) => {
		setAnchorEprofile(event.currentTarget);
	};
	const handleCloseProfile = () => {
		setAnchorEprofile(null);
	};
	return (
		<div className="rounded" style={{ margin: "auto 0" }}>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark   navbarclass " >
				<div className="container-fluid">
					<Link to="/"><img src='/banksterfullAsset.png' height={65} width={150} alt="eventfavicon" /></Link>
					{/* <Link className="navbar-brand"  style={{color:"black"}} to="/"><img style={{height:"6vh"}} src={Logo} /></Link> */}
					<button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
						<span className="navbar-toggler-icon" ></span>
					</button>

					{(props.userInfo && props.userInfo.companyName) ? <>
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
										// <Link className="nav-link active" to={props.userType===0?"/candidatehome":"/recruiterhome"}>
										// 	<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large" className="btn-purple">dashboard</Button>
										// 	</Link>
										<>
											<Button sx={{ fontSize: "1.1rem" }}
												aria-controls={openprofile ? 'basic-menu' : undefined}
												aria-haspopup="true"
												aria-expanded={openprofile ? 'true' : undefined}
												onClick={profileHandle}
												size="large" className="btn-purple">
												<Avatar alt="Profile" src={image} />

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
											<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple">SignUp</Button>
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
									{props.id === "2" ? <Link className="nav-link active" to="/findjobs">Find Jobs</Link> : <Link className="nav-link" to="/findjobs">Find Jobs</Link>}
								</li>
								<li className="nav-item">
									{props.id === "3" ? <Link className="nav-link active" to="/SearchCandidateHome">Candidates</Link> : <Link className="nav-link" to="/SearchCandidateHome">Candidates</Link>}
								</li>
								<li className="nav-item">
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
												<Avatar alt="Profile" src={image} />

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
										<Link className="nav-link" to="/signup">
											<Button sx={{ fontSize: "1.1rem" }} variant="contained" size="large" className="btn-purple">SignUp</Button>
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
const mapStateToProps = ({ banksterUser }) => {
	return {
		userToken: banksterUser.user,
		userInfo: banksterUser.userInfo
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		deleteUser: () => dispatch(deleteUser()),
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderDash);