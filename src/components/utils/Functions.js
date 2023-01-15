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