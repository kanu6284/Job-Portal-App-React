import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import WorkExperiences from './WorkExperiences'
import EmploymentType from './EmploymentType'

const Sidebar = ({handleChange,handleClick}) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>

      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick}/>
      <JobPostingData handleChange={handleChange} handleClick={handleClick}/>
      <WorkExperiences handleChange={handleChange} handleClick={handleClick}/>
      <EmploymentType handleChange={handleChange} handleClick={handleClick}/>

        </div>
  )
}

export default Sidebar