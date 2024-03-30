import { Job } from "../../types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import { useRouter } from "next/router";

interface JobDetails {
  id: string;
}

export default function ({ id }: { id: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobs = localStorage.getItem("jobs");
    if (jobs) {
      const parsedJobs = JSON.parse(jobs);
      const filteredJob = parsedJobs.find((job: Job) => job.job_id === id);
      if (filteredJob) {
        setJob(filteredJob);
      } else {
        router.push("/error-page");
      }
    } else {
      router.push("/error-page");
    }
    setLoading(false);
  }, [id]);

  const handleClick = () => {
    router.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MainContainer>
        <div className="max-w-4xl m-auto text-lg">
          <button className="py-4" onClick={handleClick}>
            Повернутися назад
          </button>
          <div className="flex justify-between">
            <h2 className="font-medium text-2xl">{job?.job_title}</h2>
            <div className="w-28 h-14">
              <img src={job?.employer_logo} className="max-w-full" alt="" />
            </div>
          </div>
          <p className="py-2 font-medium">Компанія: {job?.employer_name}</p>
          <p>{job?.job_is_remote ? "Віддалено" : "В офісі"}</p>
          <p className="font-bold py-8">Деталі вакансії:</p>
          {job?.job_description &&
            job?.job_description
              .split("\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </MainContainer>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}): Promise<{ props: { id: string } }> {
  const { id } = params;
  return { props: { id } };
}
