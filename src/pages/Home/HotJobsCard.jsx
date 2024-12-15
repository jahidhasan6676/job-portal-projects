import { Link } from "react-router-dom";


const HotJobsCard = ({ job }) => {

    const {_id, title, company, company_logo, requirements, description, location, salaryRange } = job;
    return (
        <div className="card card-compact bg-base-100  shadow-xl">
            <div className="flex gap-8 m-2">
                <figure>
                    <img className="w-16"
                        src={company_logo}
                        alt={title} />
                </figure>
                <div>
                    <h4 className="text-2xl">{company}</h4>
                    <p>{location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="flex flex-wrap gap-2">
                    {
                        requirements.map((skill, index) => <p className="border p-2 rounded-md text-center hover:bg-gray-400 hover:text-black" key={index}>{skill}</p>)
                    }
                </div>
                <div className="card-actions items-center justify-end">
                    <p>Salary: ${salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                    <Link to={`/jobDetails/${_id}`}><button className="btn btn-primary">Apply</button></Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobsCard;