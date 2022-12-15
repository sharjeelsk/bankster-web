import { Button } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
function SearchBar2() {
  return (
    <div className="shadow-sm search-bar-2 row m-auto align-items-center">
        <div className='col-8 col-sm-8 col-md-10 col-lg-10 col-xl-10 input-div'>
            <input placeholder='Enter job name' />
        </div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 button-div">
            <Button startIcon={<SearchIcon />} variant="contained" fullWidth>Search</Button>
        </div>
    </div>
  )
}

export default SearchBar2