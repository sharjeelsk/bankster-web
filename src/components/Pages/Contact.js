import { TextField,Button } from '@mui/material'
import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import "./Pages.scss"
import {useForm} from 'react-hook-form'

function RefundPolicy() {
const {handleSubmit,formState:{errors},register}=useForm()

    const onSubmit = (data)=>{
        console.log(data)
    }

  return (
    <div>
    <Header />
        <div className="page-section">

        <div className="row m-auto">
            <div className="col-4">
            <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Get In Touch</h1>
            <TextField className="my-3" fullWidth variant="outlined" {...register('firstName',{required:true})} label="First Name" />
            <TextField className="my-3" fullWidth variant="outlined" {...register('lastName',{required:true})} label="Last Name" />
            <TextField className="my-3" fullWidth variant="outlined" {...register('emailId',{required:true})} label="Email ID" />
            <TextField className="my-3" fullWidth variant="outlined" {...register('companyName',{required:true})} label="Company Name" />
            <TextField className="my-3" fullWidth variant="outlined" {...register('message',{required:true})} label="Message" />

            <Button className="mt-3" fullWidth type="submit" variant="contained">Submit</Button>
            </form>

            </div>
            <div className="col-8">
                <img className="w-100" src="/location.png" alt="location" />
                <p className="mt-3"><b>Address:</b> 21 I-Block, 21, Sector 3, Gurugram, Haryana 122022</p>
            </div>
        </div>
        




        </div>
    <Footer />
    </div>
  )
}

export default RefundPolicy