import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";


const MyApplication = () => {
    const { user } = UseAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/job-application?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data)
            })
    }, [user?.email])


    return (
        <div className="py-10">
            <h2>My applications: {jobs.length}</h2>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                jobs.map(job => <tr key={job._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={job.company_logo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{job.title}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                       
                                        <h4 className="text-lg">{job.company}</h4>
                                    </td>
                                    <td>{job.applicant_email}</td>
                                    <th>
                                        <button className="btn ">X</button>
                                    </th>
                                </tr>)
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyApplication;