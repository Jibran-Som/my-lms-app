import React from "react";
import EnrolledCourse from "./EnrolledCourse";
import { useEffect } from "react";

function EnrollmentList({ enrolledCourses, setEnrolledCourses }) {
    const userId = localStorage.getItem('userId');
    let totalCredits = 0;
    useEffect(() => {
        window.onload = () => {
            students_courses();
        };
    }, []);
    
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

    // const dropCourse = (courseID) => {
    //     const updatedCourses = [];
    //     for (let i = 0; i < enrolledCourses.length; i++) {
    //         if (enrolledCourses[i].id !== courseID) {
    //             updatedCourses.push(enrolledCourses[i]);
    //         }
    //     }
    //     setEnrolledCourses(updatedCourses);
    // };

    function dropCourse(courseID) {
        fetch(`http://127.0.0.1:5000/drop/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'courseID': courseID, 'student_id': userId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message); // Optional: show feedback
                students_courses(); // refresh course list
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Drop error:', error);
            alert("An error occurred while trying to drop the course.");
        });
    }

    function students_courses() {
        fetch(`http://127.0.0.1:5000/student_courses/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setEnrolledCourses(data);
            } else {
                setEnrolledCourses([]); // fallback if something unexpected happens
            }
        })
        .catch((error) => {
            console.error('Error fetching student courses:', error);
            setEnrolledCourses([]); // fallback in case of error
        });
    }

    

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
