import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-4">
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600 font-medium mt-1">{job.company}</p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={16} className="text-gray-400" />
                {job.type.replace('_', ' ')}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={16} className="text-gray-400" />
                {`${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency}`}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-gray-400" />
                {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};