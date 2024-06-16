import React from 'react';
import Card from '../components/Card';

const Jos = ({ filteredJobs }) => {
  return (
    <>
      <div>
        <h3 className='text-lg font-bold mb-2'>{filteredJobs.length} jobs</h3>
        <section>
          {filteredJobs.map(job => (
            <Card key={job.id} data={job} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Jos;
