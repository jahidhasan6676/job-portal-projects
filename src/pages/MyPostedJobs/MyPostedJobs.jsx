import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import { Link } from "react-router-dom";


const MyPostedJobs = () => {
    const { user } = UseAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`https://job-portal-projects-server.vercel.app/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [user.email])
    // console.log(jobs)
    return (
        <div>
            <h2 className="text-xl font-semibold">my posted jobs: {jobs.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Application Count</th>
                            <th>View Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs.map((job, index) => <tr key={job._id}>
                                <th>{index + 1}</th>
                                <td>{job.title}</td>
                                <td>{job.deadline}</td>
                                <td>{job.applicationCount}</td>
                                <td>
                                   <Link to={`/viewApplication/${job._id}`}>
                                   <button className="btn btn-link">View Application</button>
                                   </Link>
                                </td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;

