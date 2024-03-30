export interface Job {
  job_id: string;
  job_title: string;
  job_description: string;
  job_is_remote: boolean;
  job_city: string;
  job_country: string;
  employer_name: string;
  employer_logo: string;
}

export interface IndexItem {
  jobs: Job[];
}

export interface FormValues {
  firstName: string;
  lastName: string;
  experience: number;
  desiredPosition: string;
  email: string;
  password: string;
  about: string;
}
