import {
    createBrowserRouter
    
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import Error from "../errorPage/Error";
import Register from "../pages/Register/Register";
import SignIn from "../pages/signIn/SignIn";
import JobDetails from "../pages/jobDetail/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/jobApply/JobApply";
import MyApplication from "../pages/myApplication/MyApplication";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplication from "../pages/viewApplication/ViewApplication";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/jobDetails/:id",
          element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
          loader:({params})=>fetch(`https://job-portal-projects-server.vercel.app/jobs/${params.id}`)
        },
        {
          path:"/jobApply/:id",
          element:<PrivateRoute><JobApply></JobApply></PrivateRoute>
        },
        {
            path:"/register",
            element:<Register></Register>
        },
        {
          path:"/signIn",
          element:<SignIn></SignIn>
        },
        {
          path:"/myPostedJobs",
          element:<PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
        },
        {
          path:"/addJob",
          element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
          path:"/myApplication",
          element:<PrivateRoute><MyApplication></MyApplication></PrivateRoute>
        },
        {
          path:"/viewApplication/:job_id",
          element:<PrivateRoute><ViewApplication></ViewApplication></PrivateRoute>,
          loader:({params})=> fetch(`https://job-portal-projects-server.vercel.app/job-application/jobs/${params.job_id}`)
        }
      ]
    },
   
  ]);

  export default router;