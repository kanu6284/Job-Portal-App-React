import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const UpdateJob = () => {
    const {id}  = useParams();
    const { _id,companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation,
           employmentType, postingDate, description,experienceLevel,postedBy, skills } = useLoaderData()
 

           const [selectedOption, setSelectedOption] = useState([]);
           const {
               register,
               handleSubmit,
               formState: { errors },
           } = useForm();
       
           const onSubmit = (data) => {
               data.skills = selectedOption.map(option => option.value); // Extract values from selectedOption
               fetch(`http://localhost:5000/update-job/${id}`, {
                   method: "PATCH",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(data)
               })
               .then(res => {
                   if (!res.ok) {
                       return res.text().then(text => { throw new Error(text) });
                   }
                   return res.json();
               })
               .then(result => {
                   console.log(result);
                   if(result.acknowledged === true){
                       alert("job updated successfully !!!")
                   }
               })
               .catch(error => {
                   console.error("Error:", error.message);
               });
           }
       
           const option = [
               { value: "javascript", label: "JavaScript" },
               { value: "cpp", label: "C++" },
               { value: "html", label: "HTML" },
               { value: "css", label: "CSS" },
               { value: "bootstrap", label: "Bootstrap" },
               { value: "reactjs", label: "React.js" },
               { value: "nodejs", label: "Node.js" },
               { value: "tailwind", label: "Tailwind" },
               { value: "java", label: "Java" }
           ];

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
    {/* form container */}
    <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/*1st row*/}
            <div className='create-job-flex'>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Job Title</label>
                    <input
                        type="text"
                        defaultValue={jobTitle}
                        {...register("jobTitle", { required: true })}
                        className='create-job-input'
                    />
                </div>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Company Name</label>
                    <input
                        type="text"
                        placeholder='Ex: Microsoft'
                        defaultValue={companyName}

                        {...register("companyName", { required: true })}
                        className='create-job-input'
                    />
                </div>
            </div>
            {/*2nd row*/}
            <div className='create-job-flex'>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Minimum Salary</label>
                    <input
                        type="text"
                        placeholder='$20k'
                        defaultValue={minPrice}

                        {...register("minPrice", { required: true })}
                        className='create-job-input'
                    />
                </div>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Maximum Salary</label>
                    <input
                        type="text"
                        placeholder='$120k'
                        defaultValue={maxPrice}

                        {...register("maxPrice", { required: true })}
                        className='create-job-input'
                    />
                </div>
            </div>
            {/*3nd row*/}
            <div className='create-job-flex'>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Salary Type</label>
                    <select {...register("salaryType")} className='create-job-input'>
                        <option value={salaryType}>{salaryType}</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Job Location</label>
                    <input
                        type="text"
                        defaultValue={jobLocation}

                        placeholder='Ex: London'

                        {...register("jobLocation", { required: true })}
                        className='create-job-input'
                    />
                </div>
            </div>
            {/*4th row*/}
            <div className='create-job-flex'>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Job Posting Date</label>
                    <input
                        type="date"
                        defaultValue={postingDate}

                        {...register("postingDate", { required: true })}
                        className='create-job-input'
                    />
                </div>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Experience Level</label>
                    <select {...register("experienceLevel")} className='create-job-input'>
                        <option value={experienceLevel}>{experienceLevel}</option>
                        <option value="No Experience">No Experience</option>
                        <option value="Internship">Internship</option>
                        <option value="Full-time">Full-time</option>
                    </select>
                </div>
            </div>
            {/*5th row*/}
            <div>
                <label className='block mb-2 text-lg'>Required Skills</label>
                <CreatableSelect
                    value={selectedOption}
                    onChange={setSelectedOption}
                    defaultValue={skills}

                    options={option}
                    isMulti
                    className='create-job-input py-4'
                />
            </div>
            {/*6th row*/}
            <div className='create-job-flex'>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Company Logo</label>
                    <input
                        type="url"
                        placeholder='Paste Your Company URL'
                        defaultValue={companyLogo}

                        {...register("companyLogo", { required: true })}
                        className='create-job-input'
                    />
                </div>
                <div className='lg:w-3/4 w-full'>
                    <label className='block mb-2 text-lg'>Employment Type</label>
                    <select {...register("employmentType")} className='create-job-input'>
                        <option value={employmentType}>{employmentType}</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                    </select>
                </div>
            </div>
            {/*7th row*/}
            <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Description</label>
                <textarea
                    className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
                    rows={6}
                    defaultValue={description}

                    placeholder='Job description'
                    {...register("description", { required: true })}
                ></textarea>
            </div>
            {/*8th row*/}
            <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Posted By</label>
                <input
                    type="email"
                    defaultValue={postedBy}

                    placeholder='Your email'
                    {...register("postedBy", { required: true })}
                    className='create-job-input'
                />
            </div>
            <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
        </form>
    </div>
</div>
  )
}

export default UpdateJob