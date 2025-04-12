import React from "react";
import image from '../images/course1.jpg'
function EnrolledCourse({course, onDrop}){


    return(
        <div className="enrolled">
            <img src={image} alt={course.name} style={{width: '100px', height: '100px'}} />
            <h4>{course.name}</h4>
            <p>Instructor: {course.instructor}</p>            
            <p>Credit Hours: {course.creditHours}</p>
            <button onClick={() => onDrop(course.id)}>Drop Course</button>
        </div>
    );
};
export default EnrolledCourse;