import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ViewApplication = () => {
    const viewData = useLoaderData();
    // const [data, setData] = useState(viewData);
    const handleStatusUpdate = (e,id) =>{
        console.log(e.target.value, id)
        const data = {
            status:e.target.value
        }

        fetch(`http://localhost:5000/job-application/${id}`,{
            method:"PATCH",
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }


    return (
        <div>
            <h2>view data: {viewData.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            viewData.map((data, index) => <tr className="bg-base-200" key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.applicant_email}</td>
                                <td>Quality Control Specialist</td>
                                <td>
                                    <select 
                                    onChange={(e) => handleStatusUpdate(e, data._id)}
                                    defaultValue={data.status || "Change status"}
                                    className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled >Change status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplication;