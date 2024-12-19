import { useNavigate, useParams } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { nav } from "motion/react-client";


const JobApply = () => {
    const {user} = UseAuth();
    const {id} = useParams();
    // console.log(id, user)
    const navigate = useNavigate();
    
    const handleSubmitJobApply = e =>{
        e.preventDefault();
        const form = e.target;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;
        // console.log(linkedin,github,resume)
        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedin,
            github,
            resume
        }

        fetch("http://localhost:5000/jobs-application", {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(jobApplication)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire({
                    
                    text: "Your apply successfully",
                    icon: "success"
                  });
                  navigate("/myApplication")
            }
            
        })
    }
    return (
        
               
                <div className="card bg-base-100 w-full m-10 shadow-2xl">
                <h1 className="text-5xl font-bold">Apply now!</h1>
                    <form onSubmit={handleSubmitJobApply} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Linkedin URL</span>
                            </label>
                            <input type="url" name="linkedin" placeholder="Linkedin URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Github URL</span>
                            </label>
                            <input type="url" name="github" placeholder="Github URL" className="input input-bordered" required />
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resume URL</span>
                            </label>
                            <input type="url" placeholder="Resume URL" name="resume" className="input input-bordered" required />
                            
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Apply</button>
                        </div>
                    </form>
                </div>
           
    );
};

export default JobApply;