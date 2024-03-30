import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import MainContainer from "../../components/MainContainer";

const Liked = () => {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  useEffect(() => {
    const favourite = localStorage.getItem("favouriteJobs");
    if (favourite) {
      setFavouriteJobs(JSON.parse(favourite));
    }
  }, []);

  console.log(favouriteJobs);

  return (
    <MainContainer>
      <div className="">
        <h1 className="w-2/3 m-auto text-xl font-semibold">
          Збережені вакансії
        </h1>
        {favouriteJobs.map((job, index) => (
          <>
            <JobCard job={job} key={index}></JobCard>
          </>
        ))}
      </div>
    </MainContainer>
  );
};

export default Liked;
