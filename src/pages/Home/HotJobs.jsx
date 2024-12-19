import { useEffect, useState } from "react";
import HotJobsCard from "./HotJobsCard";


const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);


    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    

    useEffect(()=> {
        fetch(`http://localhost:5000/jobs?page=${currentPage}&size=${itemsPerPage}`)
        .then(res => res.json())
        .then(data => {
            setJobs(data)
        })
    }, [currentPage, itemsPerPage]);

    useEffect(()=>{
        fetch('http://localhost:5000/jobsCount')
        .then(res => res.json())
        .then(data => setCount(data.count))
    },[]);

    const handleItemsPerPage = e =>{
        const value = parseInt(e.target.value)
        setItemsPerPage(value);
        // console.log(value)
        setCurrentPage(0)
    }

    const handlePrevPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    
    const handleNextPage = () =>{
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="py-20">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                jobs?.map(job => <HotJobsCard key={job._id} job={job}></HotJobsCard>)
            }
           </div>
           <div className="text-center mt-10">
            <p>current Page: {currentPage}</p>
            <button className="btn mr-5" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button
                         className={`btn  mr-5 ${currentPage === page ? "selected" : undefined}`}
                         onClick={()=>setCurrentPage(page)}
                         key={page}>{page}</button>)
                }
                <button className="btn" onClick={handleNextPage}>Next</button>

                <select className="ml-5" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="" >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                 
                </select>
           </div>
        </div>
    );
};

export default HotJobs;