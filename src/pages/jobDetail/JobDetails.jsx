import { Link, useLoaderData } from "react-router-dom";


const JobDetails = () => {
    const jobDetails = useLoaderData();
    const {_id, title, company, deadline} = jobDetails;
    return (
        <div className="p-10 space-y-2">
            <h2 className="text-2xl font-bold">Job details for {title}</h2>
            <p>Apply for: {company}</p>
            <p>Deadline : {deadline}</p>
           <Link to={`/jobApply/${_id}`}> <button className="btn btn-accent">Apply Now</button></Link>
        </div>
    );
};

export default JobDetails;