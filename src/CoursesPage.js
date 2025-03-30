import React, { useState } from "react";
import Header from "./components/Header";
import CourseCatalog from "./components/CourseCatalog";
import EnrollmentList from "./components/EnrollmentList";
import Footer from "./components/Footer";

function CoursesPage() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    return (
        <div className="courses-page">
            <Header />
            <div className="content">
                <CourseCatalog enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} />
                
                <EnrollmentList enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} />
            </div>
            <Footer />
        </div>
    );
}

export default CoursesPage;

