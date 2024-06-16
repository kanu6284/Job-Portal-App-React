import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'

const NewsLetter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg front-bold mb-2 flex item-center gap-2'> <FaEnvelopeOpenText/> Email me for hobs</h3>
        </div>
        <p className='text-primary/75 text-base mb-4'>Thousand of job in the computer, engineering and technology sectors are waiting for you</p>

        <div className='w-full space-y-4'>
             <input type='email' name='email' id='email' placeholder='nmae@email.com' className='w-full block py-2 pl-3 border foucus:outline-none'></input>
              <input type='submit' value={"subscribe"} className='w-full block py-2 pl-3 border foucus:outline-none bg-blue rounded-sm text-white cursor-pointer font-smibold'/>
        </div>
       

        <div className='mt-20'>
            <h3 className='text-lg front-bold mb-2 flex item-center gap-2'> <FaRocket/> Get Notices Faster</h3>
        </div>
        <p className='text-primary/75 text-base mb-4'>Thousand of job in the computer, engineering and technology sectors are waiting for you</p>

        <div className='w-full space-y-4'>
              <input type='submit' value={"Uplode Your Resume"} className='w-full block py-2 pl-3 border foucus:outline-none bg-blue rounded-sm text-white cursor-pointer font-smibold'/>
        </div>
    </div>


    
    
  )
}

export default NewsLetter