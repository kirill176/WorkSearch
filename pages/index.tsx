import { FC, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import { GetStaticPropsContext } from "next";
import axios from "axios";
import { IndexItem, Job } from "../types/types";
import JobCard from "../components/JobCard/JobCard";

const Index: FC<IndexItem> = ({ jobs }) => {
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, []);

  return (
    <MainContainer>
      {jobs.map((job: Job, index: number) => (
        <JobCard job={job} key={index} />
      ))}
    </MainContainer>
  );
};

export default Index;

let cachedData: Job[] = [];

export async function getStaticProps(context: GetStaticPropsContext) {
  if (cachedData.length > 0) {
    return {
      props: { jobs: cachedData },
    };
  }

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: "Ukraine",
      page: "2",
      num_pages: "2",
    },
    headers: {
      'X-RapidAPI-Key': '36a1913dcdmsh78738ad2365f460p1d6865jsn395807590a3a',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const jobs: Job[] = response.data.data.map((job: Job) => ({
      ...job
    }));
    cachedData = jobs;

    return {
      props: { jobs },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: { error: "Failed to fetch data" },
    };
  }
}
