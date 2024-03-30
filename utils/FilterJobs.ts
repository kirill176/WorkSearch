import { Job } from "../types/types";

export const filterAndSortJobs = (input: string, jobs: Job[]): Job[] => {
  const searchTerm = input.toLowerCase().trim();
  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm)
  );
  const sortedJobs = filteredJobs.sort((a, b) =>
    a.job_title.localeCompare(b.job_title)
  );

  return sortedJobs;
};
