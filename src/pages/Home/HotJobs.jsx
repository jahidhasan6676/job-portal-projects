import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";


const HotJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(()=> {
        fetch("https://job-portal-projects-server.vercel.app/jobs")
        .then(res => res.json())
        .then(data => {
            setJobs(data)
        })
    }, [])
    return (
        <div className="py-20">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                jobs?.map(job => <HotJobsCard key={job._id} job={job}></HotJobsCard>)
            }
           </div>
        </div>
    );
};

export default HotJobs;