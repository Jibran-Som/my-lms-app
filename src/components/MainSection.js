import React from 'react';
import Course from '../data/courses';
function MainSection() {
    
    return(
        <section class="about">
            <h2>About LMS</h2>
            <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
            <h3>Key Features:</h3>
            <div>
                <p>- Enroll in courses</p>
                <p>- Attempt quizzes</p>
                <p>- View leaderboards</p>
                <p>{Math.floor(Math.random() * 11)}</p>
                <p>{Course[0].name}</p>
            </div>
        </section>
    );
};
export default MainSection;