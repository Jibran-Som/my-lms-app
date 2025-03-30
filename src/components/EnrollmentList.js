import React from "react";
import {useState, useEffect} from 'react';
import EnrolledCourse from "./EnrolledCourse";

function EnrollmentList(){
    const[enrolledCourses, setEnrolledCourses] = useState([]);
    let totalCredits = 0;

    useEffect(() => {
        const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses"));
        if (savedCourses) {
            setEnrolledCourses(savedCourses);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    },[enrolledCourses]);
    
    for(let i = 0; i < enrolledCourses.length; i++){
        totalCredits += enrolledCourses[i].creditHours;
    }

    const dropCourse = (courseID) => {
        const updatedCourses = [];
        for(let i = 0; i < enrolledCourses.length; i++){
            if(enrolledCourses[i].id !== courseID){
                updatedCourses.push(enrolledCourses[i]);
            }
        }
        setEnrolledCourses(updatedCourses);
    };

    return(
        <div className="enrollment-list">
            <h3>Enrolled Courses</h3>
            <div>
                {enrolledCourses.map((course) => (
                    <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
                ))}
            </div>
            <h4>Total Credit Hours: {totalCredits}</h4>
        </div>
    );
};
export default EnrollmentList;