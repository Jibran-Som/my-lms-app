import React from "react";
import Course from '../Backend/courses';
import CourseItem from "./CourseItem";
import './CourseCatalog.css';

function CourseCatalog({ enrolledCourses, setEnrolledCourses }) {
    const handleEnroll = (course) => {
        if (!enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id)) {
            setEnrolledCourses(prevState => [...prevState, course]);
        } else {
            alert('You are already enrolled in this course.');
        }
    };

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
