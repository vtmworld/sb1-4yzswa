import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { jobs } from '../data/jobs';
import { formatDistanceToNow } from 'date-fns';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return <div>Job not found</div>;
  }

  // Google Job Posting Schema
  const jobSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    validThrough: new Date(new Date(job.postedDate).setMonth(new Date(job.postedDate).getMonth() + 1)).toISOString(),
    employmentType: job.type,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      logo: job.companyLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: job.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: 'YEAR'
      }
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jobSchema)}
      </script>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-6">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-xl text-gray-600 mt-2">{job.company}</p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {job.type.replace('_', ' ')}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {`${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency}`}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
              <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};