const initialStateUser=false
const loadingReducer = (state=initialStateUser,action)=>{
    switch(action.type){
        case 'SET_LOADING':
            return action.payload
        default:
            return state;
    }
}

export default loadingReducer;