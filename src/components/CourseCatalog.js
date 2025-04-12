import React, {useState, useEffect} from "react";
import Course from '../Backend/courses';
import CourseItem from "./CourseItem";
import './CourseCatalog.css';
//import students_courses from './EnrollmentList';

function CourseCatalog({ enrolledCourses, setEnrolledCourses }) {
    
    const [course, setCourse] = useState('');
    const userId = localStorage.getItem('userId');
    
    

    function handleEnroll(course){
        fetch(`http://127.0.0.1:5000/enroll/${userId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'course':course, 'student_id': userId}),   
            }) 
            
            .then(async (response) => {
                const data = await response.json();
                alert(data.message);  

                if(data.success){
                    setEnrolledCourses(prevState => [...prevState, course]);
                }
                
            });
        
    
    }


    return (
        <div className="course-catalog">
            <h2>Course Catalog</h2>
            <div className="course-list">
                {Course.map((course) => (
                    <CourseItem key={course.id} course={course} onEnroll={handleEnroll} />
                ))}
            </div>
        </div>
    );

}

export default CourseCatalog;
