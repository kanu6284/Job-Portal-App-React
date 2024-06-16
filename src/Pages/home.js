import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Jos from './Jos';
import Sidebar from '../components/Sidebar/Sidebar';
import JobPostingData from '../components/Sidebar/JobPostingData';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filterData = (jobList, selected, searchQuery) => {
    let filteredJobs = jobList;

    if (searchQuery) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, salaryType, experienceLevel, employmentType }) =>
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) <= parseInt(selected) ||
        JobPostingData >= selected ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs;
  };

  const filteredJobs = filterData(jobs, selectedCategory, query);

  useEffect(() => {
    console.log("Current Page:", currentPage);
    console.log("Filtered Jobs:", filteredJobs);
  }, [currentPage, filteredJobs]);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {isLoading ? (
            <p className='font-medium'>Loading....</p>
          ) : filteredJobs.length > 0 ? (
            <Jos filteredJobs={filteredJobs} />
          ) : (
            <>
              <h3 className='text-lg font-bold mb-2'>{filteredJobs.length} jobs</h3>
              <p>No data found!</p>
            </>
          )}

          {jobs.length > 0 && (
            <div className='flex justify-center mt-4 space-x-8'>
              <button onClick={previousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(jobs.length / itemsPerPage)}
              </span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)} className='hover:underline'>
                Next
              </button>
            </div>
          )}
        </div>
        <div className='bg-white p-4 rounded'><NewsLetter /></div>
      </div>
    </div>
  );
};

export default Home;
