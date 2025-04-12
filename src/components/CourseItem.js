import React from "react";
import { useState } from "react";
import image from '../images/course1.jpg'

function CourseItem({course, onEnroll}){
    const [hover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    return(
        <div className="course-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <img src={image} alt={course.name} style={{width: '100px', height: '100px'}} />
            <h4>{course.name}</h4>
            <p>Instructor: {course.instructor}</p>
            {hover && <p>{course.description}</p>}
            <button onClick={() => onEnroll(course)}>Enroll Now</button>
        </div>
    );
};
export default CourseItem;