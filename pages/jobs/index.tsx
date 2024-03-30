import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import { filterAndSortJobs } from "../../utils/FilterJobs";
import { FormValues, Job } from "../../types/types";
import JobCard from "../../components/JobCard/JobCard";
import { useRouter } from "next/router";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<FormValues>();
  const router = useRouter();
  const { value } = router.query;

  useEffect(() => {
    const jobs = localStorage.getItem("jobs");
    const user = localStorage.getItem("userInfo");

    if (jobs) {
      const parsedJobs = JSON.parse(jobs);
      setJobs(parsedJobs);
    }

    if (user) {
      const parsedUsers = JSON.parse(user);
      setUser(parsedUsers);
    }
  }, []);

  useEffect(() => {
    if (value) {
      setSearch(value as string);
    } else if (user) {
      setSearch(user.desiredPosition);
    }
  }, [value, user]);

  const filteredJobs = filterAndSortJobs(search, jobs);

  return (
    <>
      <MainContainer>
        {filteredJobs.map((job: Job) => (
          <JobCard job={job} key={job.job_id} />
        ))}
      </MainContainer>
    </>
  );
};

export default Jobs;
