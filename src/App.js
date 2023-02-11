import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import {connect} from 'react-redux'
import Home from "./components/Home"
import FindJobs from './components/FindJobs/FindJobs';
import SearchCandidates from './components/FindCandidates/SearchCandidates';
import CandidateInfo from './components/FindCandidates/CandidateInfo'
import FindCandidates from './components/FindCandidates/FindCandidates';

import CandidateHome from './components/CandidateDashboard/CandidateHome';
import JobsApplied from './components/CandidateDashboard/JobsApplied/JobsApplied';
import Notifications from './components/CandidateDashboard/Notifications/Notifications';
import Subscription from './components/CandidateDashboard/Subscription/Subscription';

import RecruiterHome from './components/RecruiterDashboard/RecruiterHome';
import JobsCreated from './components/RecruiterDashboard/JobsCreated/JobsCreated';
import NotificationsR from './components/RecruiterDashboard/NotificationsR/NotificationsR';
import SubscriptionR from './components/RecruiterDashboard/SubscriptionR/SubscriptionR';
import CreateJob from './components/RecruiterDashboard/JobsCreated/CreateJob';
import SubRecruiters from './components/RecruiterDashboard/SubRecruiters/SubRecruiters';
import CreateSubRecruiter from './components/RecruiterDashboard/SubRecruiters/CreateSubRecruiter';
import RecruiterJobDetail from './components/RecruiterDashboard/JobsCreated/RecruiterJobDetail';
import Bookmark from './components/RecruiterDashboard/Bookmark/Bookmark';

import JobDetail from './components/FindJobs/JobDetail';
import BookmarkedJobs from './components/CandidateDashboard/BookmarkedJobs/BookmarkedJobs';

import Login from './components/Login/Login';
import Singup from './components/Singup/Singup';
import Loginrecruiter from './components/Login/Loginrecruiter';
import SignupRecruiter from './components/Singup/SignupRecruiter';

import Snackbar from './components/utils/Snackbar'
import SimpleBackdrop from './components/utils/SimpleBackdrop';
import ForgetPassword from './components/Login/ForgetPassword';

import VerificationMail from './components/utils/VerificationMail';
import LottieComponent from './components/utils/Lottie';
import SearchCandidateHome from './components/FindCandidates/SearchCandidateHome';

import SendJobEmail from './components/FindCandidates/SendJobEmail';

import ScrollToTop from './ScrollToTop';

// pages
import About from './components/Pages/About';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import Terms from './components/Pages/Terms';
import FAQ from './components/Pages/FAQ';
import RefundPolicy from './components/Pages/RefundPolicy';
import Contact from './components/Pages/Contact'
import Blogs from './components/Pages/Blogs';
import VerificationFailed from './components/utils/VerificationFailed';

function App(props) {
  return (
    <>
    <Snackbar />
    <SimpleBackdrop  open={props.loading} />
    <Switch>
      <ScrollToTop>
      <Route exact path="/" component={Home} />
      <Route path="/findjobs" component={FindJobs} />
      <Route path="/JobDetail/:id" component={JobDetail} />
      <Route path="/searchcandidates" component={SearchCandidates} />
      <Route path="/SearchCandidateHome" component={SearchCandidateHome} />
      <Route path="/findcandidates" component={FindCandidates} />
      <Route path="/candidate-info/:id" component={CandidateInfo} />
      <Route path="/sendjobemail" component={SendJobEmail} />

      <Route path="/candidatehome" component={CandidateHome} />
      <Route path="/jobsapplied" component={JobsApplied} />
      <Route path="/jobsbookmarked" component={BookmarkedJobs} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/subscription" component={Subscription} />

      <Route path="/recruiterhome" component={RecruiterHome} />
      <Route path="/jobscreated" component={JobsCreated} />
      <Route path="/SubRecruiters" component={SubRecruiters} />
      <Route path="/createsubrecruiter" component={CreateSubRecruiter} />
      <Route path="/recruiterjobdetail/:id" component={RecruiterJobDetail} />
      <Route path="/createjob" component={CreateJob} />
      <Route path="/notificationsR" component={NotificationsR} />
      <Route path="/subscriptionR" component={SubscriptionR} />
      <Route path="/bookmarksr" component={Bookmark} />

      <Route path="/login" component={Login} />
      <Route path="/forgetpassword" component={ForgetPassword} />
      <Route path="/signup" component={Singup} />
      <Route path="/Loginrecruiter" component={Loginrecruiter} />
      <Route path="/SignupRecruiter" component={SignupRecruiter} />
      <Route path="/verificationmail" component={VerificationMail} />
      <Route path="/verificationfailed" component={VerificationFailed} />
      <Route path="/verificationsuccess/:token/:type" component={LottieComponent} />



      <Route path="/aboutus" component={About} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      <Route path="/refundpolicy" component={RefundPolicy} />
      <Route path="/contactus" component={Contact} />
      <Route path="/blogs" component={Blogs} />
      </ScrollToTop>
    </Switch>
    </>
  );
}

const mapStateToProps = ({loading})=>{
  return {
    loading
  }
}

export default connect(mapStateToProps)(App);
