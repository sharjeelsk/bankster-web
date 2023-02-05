import { Button } from '@mui/material'
import React from 'react'

function VerificationFailed(props) {
  return (
    <div style={{textAlign:"center"}}>
        <h1 className="mt-3">Account already exists, Try LogIn</h1>
        <Button variant="contained" onClick={()=>props.history.push("/login")}>LogIn</Button>
    </div>
  )
}

export default VerificationFailed