const initialStateFlag={
    loading:false,
    snackbar:{text:"",type:"info",open:false} //error warning info success
}

const flagReducer = (state=initialStateFlag,action)=>{
    switch(action.type){
        case "SET_LOADING":
            return {...state,loading:action.payload}
        case "SET_SNACKBAR":
            return {...state,snackbar:action.payload}
        default:
            return state;
    }
}

export default flagReducer;