import React, { useEffect, useState } from 'react';
import Course from '../Backend/courses';
import Testimonial from '../Backend/testimonials';

function MainSection() {
  const [randomCourses, setRandomCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  // Function to get random courses
  const getRandomCourses = () => {
    let randomCoursesArray = [];
    while (randomCoursesArray.length < 3) {
      const randomIndex = Math.floor(Math.random() * Course.length);
      if (!randomCoursesArray.includes(Course[randomIndex])) {
        randomCoursesArray.push(Course[randomIndex]);
      }
    }
    setRandomCourses(randomCoursesArray);
  };

  const getRandomTestimonials = () => {
    let randomTestimonialsArray = [];
    while (randomTestimonialsArray.length < 2) {
      const randomIndex = Math.floor(Math.random() * Testimonial.length);
      if (!randomTestimonialsArray.includes(Testimonial[randomIndex])) {
        randomTestimonialsArray.push(Testimonial[randomIndex]);
      }
    }
    setRandomTestimonials(randomTestimonialsArray);
  };

  useEffect(() => {
    getRandomCourses();
    getRandomTestimonials();
  }, []);

  return (
    <section className="about">
      <h2>About LMS</h2>
      <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>

      <h3>Featured Courses</h3>
      <div>
        {randomCourses.map(course => (
          <div key={course.id}>
            <h4>{course.name}</h4>
            <p>Instructor: {course.instructor}</p>
            <p>{course.description}</p>
            <p>Duration: {course.duration}</p>
            <img src={course.image} alt={course.name} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>


      <h3>What Our Students Say</h3>
      <div>
        {randomTestimonials.map(testimonial => (
          <div key={testimonial.studentName}>
            <p>{testimonial.studentName} - {testimonial.courseName}</p>
            <p>{testimonial.review}</p>
            <p>{'★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainSection;
