import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export function limitString(str) {
    if (str.length > 7) {
      return str.substring(0, 7) + "...";
    } else {
      return str;
    }
  }
// Create formatter (English).
const timeAgo = new TimeAgo('en-US')
export function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) 
    return true; 

   else 
    return false; 
}
export function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
export const renderImageString = (createdBy)=>{
    if(createdBy && Array.isArray(createdBy)){
        if(createdBy[0].companyImg.length>0){
            return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy[0].companyImg}`
        }else{
            return '/job-offer.png'
        }
        
    }else if(createdBy && createdBy.companyImg){
        if(createdBy.companyImg.length>0){
            return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy.companyImg}`
        }else{
            return '/job-offer.png'
        }
        
    }else{
        return '/job-offer.png'
    }
}
export const renderRating = (singleJob)=>{
    let total = 0;
    if(singleJob.age.min && singleJob.age.max){
        total = total +1;
    }
    if(singleJob.ctc.min && singleJob.ctc.max){
        total = total+1;
    }
    if(singleJob.experience.min && singleJob.experience.max){
        total = total+1;
    }
    if(singleJob.jobLocation.state && singleJob.jobLocation.city){
        total = total+1;
    }
    if(singleJob.qualification.ug && singleJob.qualification.pg){
        total = total+1;
    }
    if(singleJob.functionalArea && singleJob.industry && singleJob.product){
        total = total+1;
    }
    if(singleJob.roleResp.length>0){
        total = total+1;
    }
    if(singleJob.tags.length>0){
        total = total+1;
    }
    if(singleJob.companyName.length>0 && singleJob.companyInfo.length>0){
        total = total+1;
    }
    if(singleJob.desiredProfile){
        total = total+1;
    }
    return Math.floor(total/2)
    
}

export const renderAgo = (createdAt)=>{
    let formattedDate = new Date(createdAt);
    let timeago = timeAgo.format(new Date(createdAt))
    return timeago
}

export const stringHide = (string,type,props)=>{
    if(props.hide && type==="fullName"){
        let finalString = `**** ${string.includes(" ")?string.split(" ")[1]:""}`
        return finalString.length>15?`${finalString.substring(0,15)} ...`:finalString
    }else if(props.hide && type==="mobileNo"){
        let finalString = `${string.substr(0,2)} ****** ${string.substr(8,10)}`
        return finalString.length>15?`${finalString.substring(0,15)} ...`:finalString
    }else if(props.hide && type==="email"){
        let finalString = `******* @${string.split("@")[1]}`
        return finalString.length>15?`${finalString.substring(0,15)} ...`:finalString
    }
    else{
        return string
    }
}

export const renderEmployementString = (props)=>{
    if(props.fresher){
        return "Fresher"
    }else if(props.workExperience.filter(i=>i.current===true).length>0){
        let strobj = props.workExperience.filter(i=>i.current===true)[0]
        if(strobj){
            console.log("strobj is",strobj)
            if(strobj.designation){
                return `${strobj.designation.length>15?`${strobj.designation.substring(0,15)}..`:strobj.designation} | ${strobj.name.length>15?`${strobj.name.substring(0,15)}..`:strobj.name}`
            }else{
                return ""
            }
            
        }else{
            return ""
        }
        
    }else{
        return "Currently Unemployed"
    }
}

export const renderEmployementStringHide = (props)=>{
    if(props.fresher){
        return "Fr***"
    }else if(props.workExperience.filter(i=>i.current===true).length>0){
        let strobj = props.workExperience.filter(i=>i.current===true)[0]
        if(strobj){
            if(strobj.designation){
                return `${limitString(strobj.designation.substr(0,strobj.designation.length-3))}*** | ${limitString(strobj.name.substr(0,strobj.name.length-3))} ***`
            }else{
                return ""
            }   
            
        }else{
            return ""
        }
        
    }else{
        return "Currently ****"
    }
}
