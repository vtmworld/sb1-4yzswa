import React from 'react';
import { JobCard } from './JobCard';
import { jobs } from '../data/jobs';

export const JobList: React.FC = () => {
  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};