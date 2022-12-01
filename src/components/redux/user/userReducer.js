const initialStateUser={
    user:null,
    userInfo:null,
    userType:null
}

const userReducer = (state=initialStateUser,action)=>{
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload}
        case 'STORE_USERINFO':
            return {...state,userInfo:action.payload}
        case "DELETE_USER":
            return initialStateUser
        case "STORE_USER_TYPE":
            return {...state,userType:action.payload}
        default:
            return state;
    }
}

export default userReducer;