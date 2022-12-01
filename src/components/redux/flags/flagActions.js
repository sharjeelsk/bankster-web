export const setLoading = (value)=>{
    return {
        type:'SET_LOADING',
        payload:value
    }
}

export const setSnackbar = (obj)=>{
    return {
        type:'SET_SNACKBAR',
        payload:obj
    }
}