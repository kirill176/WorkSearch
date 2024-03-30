import { FC, useState, useEffect } from "react";
import { Job } from "../../types/types";
import { useRouter } from "next/router";

interface JobCardItem {
  job: Job;
}

const JobCard: FC<JobCardItem> = ({ job }) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const jobs = localStorage.getItem(job.job_id);

      if (jobs) {
        const favourite: boolean = JSON.parse(jobs);
        if (typeof favourite === "boolean") {
          return favourite;
        }
      }
    }
    return false;
  });

  const handleClick = () => {
    const storedJobsString = localStorage.getItem("favouriteJobs");
    setIsFavourite(!isFavourite);
    localStorage.setItem(job.job_id, JSON.stringify(!isFavourite));

    if (!isFavourite) {
      let storedJobs: Job[] = [];
      if (storedJobsString) {
        storedJobs = JSON.parse(storedJobsString);
      }
      storedJobs.push(job);
      localStorage.setItem("favouriteJobs", JSON.stringify(storedJobs));
    } else {
      if (storedJobsString) {
        const storedJobs: Job[] = JSON.parse(storedJobsString);
        const updatedJobs = storedJobs.filter(
          (storedJob) => storedJob.job_id !== job.job_id
        );
        localStorage.setItem("favouriteJobs", JSON.stringify(updatedJobs));
      }
    }
  };

  const goToJobDetails = () => {
    router.push(`/job-details/${job.job_id}`);
  };

  return (
    <>
      <div className="w-2/3 m-auto min-h-48 shadow-2xl rounded-3xl mt-8">
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold ">{job.job_title}</h2>
            {job.employer_logo && (
              <div className="max-w-20 max-h-7">
                <img
                  loading="lazy"
                  src={job.employer_logo}
                  className=" max-w-full"
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="flex pt-2">
            <p className="">{job.employer_name}</p>
            <p className="pl-6">{job.job_city}</p>
          </div>
          <p className="pt-2">{job.job_is_remote ? "Віддалено" : "В офісі"}</p>
          <div className="flex mt-9 ml-4 p-2 items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-fuchsia-600 font-bold text-lg hover:text-fuchsia-800"
                onClick={goToJobDetails}
              >
                Детальніше
              </button>
              <button className="size-6 ml-7" onClick={handleClick}>
                <img
                  src={isFavourite ? "/star.png" : "/favourite.png"}
                  className="max-w-full"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
