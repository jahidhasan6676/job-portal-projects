import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";




const AddJob = () => {
    const {user} = UseAuth();

    const handleAddJob = e =>{
        e.preventDefault();

        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        // console.log(initialData)
        const {min, max, currency, ...newJob} = initialData;
        newJob.salaryRange = {min, max, currency};
        newJob.requirements = newJob.requirements.split("\n");
        newJob.responsibilities = newJob.responsibilities.split("\n");
        console.log( newJob)

        fetch("http://localhost:5000/jobs",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newJob)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire({
                    
                    text: "Your jobs successfully added",
                    icon: "success"
                  });
            }
        })
    }
    return (
        <div className="py-10 ">
            <h2 className="text-xl text-center">Post a new job</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Job Title" className="input input-bordered" required />
                </div>
                {/* job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name="location" placeholder="Job Location" className="input input-bordered" required />
                </div>

                {/* job Type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a job type</option>
                        <option>Full Time</option>
                        <option>Intern</option>
                        <option>Half Time</option>
                    </select>
                </div>
                {/* job category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Category</span>
                    </label>
                    <select className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a job field</option>
                        <option>Engineering</option>
                        <option>Web Design</option>
                        <option>Web developer</option>
                        <option>UI/UX design</option>

                    </select>
                </div>
                {/* salary range */}
                <p>Salary Range</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 items-end">
                    <div className="form-control">
                        
                        <input type="text" name="min" placeholder="Min" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                       
                        <input type="text" name="max" placeholder="Max" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <select name="currency" className="select select-ghost w-full max-w-xs">
                            <option  disabled >Pick a currency</option>
                            <option>USD</option>
                            <option>BDT</option>
                        </select>
                    </div>
                </div>

                {/* job description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name="description" placeholder="Job Description"></textarea>
                </div>

                {/* Company Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name="companyName" placeholder="Company Name" className="input input-bordered" required />
                </div>

                 {/* job requirements */}
                 <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name="requirements" placeholder="Requirements"></textarea>
                </div>
                 {/* job responsibilities */}
                 <div className="form-control">
                    <label className="label">
                        <span className="label-text">Responsibilities</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name="responsibilities" placeholder="Responsibilities"></textarea>
                </div>
                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name="hr_name" placeholder="HR Name" className="input input-bordered" required />
                </div>
                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input defaultValue={user?.email} type="text" name="hr_email" placeholder="HR Email" className="input input-bordered" required />
                </div>
                {/* application Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input type="date" name="deadline" placeholder="Deadline" className="input input-bordered" required />
                </div>
                {/* Company logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="text" name="company_logo" placeholder="Company Logo URL" className="input input-bordered" required />
                </div>
                {/* form button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;