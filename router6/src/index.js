import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate, 
          Link, Outlet, useParams, NavLink, useNavigate, useLocation} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/apps" element={<Navigate replace to="/learn"/>}/>
      <Route path="/learn" element={<Learn/>}>
        <Route path="courses" element={<Courses/>}>
          <Route path=":courseId" element={<CourseId/>}/>
        </Route>
        <Route path="bundles" element={<Bundles/>}/>
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home(){
  return(
    <div>
      <h1>Home Router</h1>
      <Link to="/learn">Learn</Link>
    </div>
  );
}

function Learn(){
  return(
    <div>
      <h1>Learn Router</h1>
      <Link to="/learn/courses">Courses</Link>
      <Link to="/learn/bundles">Bundles</Link>
      <Outlet/>
    </div>
  );
}

function Courses(){
  const courseList = ["React", "Angular", "Vue", "Nodejs"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
  return(
    <div>
      <h1>Courses</h1>
      <p>More test</p>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow",
          };
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/tests`}>
        tests
      </NavLink>
      <Outlet/>
    </div>
  );
}

function Bundles(){
  return(
    <div>
      <h1>Bundles</h1>
    </div>
  );
}

function CourseId(){
  const navigate = useNavigate();
  const {courseId} = useParams(); 
  return(
    <div>
      <h1>URL Params : {courseId}</h1>
      <button
        onClick={() => {
          navigate("/dashboard", { state: courseId });
        }}
        className="btn btn-warning"
      >
        Price using navigate
      </button>
      <Link to="/dashboard" state={"DJANGO"}>
        Test link using Link
      </Link>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that i got here is {location.state}</h1>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
