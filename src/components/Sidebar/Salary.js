import React from 'react'
import Button from './Button'
import InputField from '../InputField'

const Salary = ({handleChange,handleClick}) => {
  return (
    <div className='mb-4'>
        <h4 className='text-lg font-medium mb-4'>Salary</h4>
        <div>
            <Button handleClickHandler={handleClick} value="" title="Hourly"/>
            <Button handleClickHandler={handleClick} value="Monthly" title="Monthly"/>
            <Button handleClickHandler={handleClick} value="Yearly" title="Yearly"/>

        </div>
        <div>
        <label className='sidebar-label-container'>
                <input type='radio' name='test' id='test' value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value={30} title="< 30000k" name="test2"/>
            <InputField handleChange={handleChange} value={50} title="< 50000k" name="test2"/>
            <InputField handleChange={handleChange} value={80} title="< 80000k" name="test2"/>
            <InputField handleChange={handleChange} value={100} title="< 1000000k" name="test2"/>

        </div>
    </div>
  )
}

export default Salary