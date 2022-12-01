import React from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function FilterMenu(props) {
  return (
    <div className="filter-menu shadow-sm">
        <div className="display-mobile">
        <IconButton className="display-mobile" onClick={()=>props.setDisplay(false)}>
            <CloseIcon />
        </IconButton>
            <div className='content'>
            <h4><FilterListIcon /> All Filters</h4>
            <hr />
            <h3>Work From Home</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
                          <hr />
            <h3>Experience</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
                          <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
            </div>
        </div>
        <div className='display-desktop'>
            <div className='content'>
            <h4><FilterListIcon /> All Filters</h4>
            <hr />
            <h3>Work From Home</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
                          <hr />
            <h3>Experience</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
                          <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
              <hr />
            <h3>CTC</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
              </FormGroup>
            </div>
        </div>
    </div>
  )
}

export default FilterMenu