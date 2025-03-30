import React from "react";
import EnrolledCourse from "./EnrolledCourse";
import { useEffect } from "react";

function EnrollmentList({ enrolledCourses, setEnrolledCourses }) {
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

    if (Array.isArray(enrolledCourses)) {
        for (let i = 0; i < enrolledCourses.length; i++) {
            totalCredits += enrolledCourses[i].creditHours;
        }
    }

    const dropCourse = (courseID) => {
        const updatedCourses = [];
        for (let i = 0; i < enrolledCourses.length; i++) {
            if (enrolledCourses[i].id !== courseID) {
                updatedCourses.push(enrolledCourses[i]);
            }
        }
        setEnrolledCourses(updatedCourses);
    };

    return (
        <div className="enrollment-list">
            <h2>Enrolled Courses</h2>
            {Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? (
                <div>
                    {enrolledCourses.map((course) => (
                        <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
                    ))}
                    <h4>Total Credit Hours: {totalCredits}</h4>
                </div>
            ) : (
                <p>No courses enrolled yet.</p>
            )}
        </div>
    );
}

export default EnrollmentList;
