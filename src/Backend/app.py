from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import json

app = Flask(__name__)

CORS(app)

with open("Backend/testimonials.json", "r") as file:
    testimonials = json.load(file)
    
with open("Backend/courses.json", "r") as file:
    courses = json.load(file)

with open("Backend/students.json", "r") as file:
    students = json.load(file)


def save_students_to_file():
    with open("Backend/students.json", "w") as f:
        json.dump(students, f, indent=4)




# The students list

# students[0]["enrolled_courses"].append( {
#       "id": 4,
#       "name": "Operating Systems",
#       "instructor": "Prof. Michael Brown",
#       "description": "Study the architecture and concepts of modern operating systems.",
#       "duration": "8 weeks",
#       "image": "courseImage",
#       "creditHours" : 3
#     })

# print(students[0]["enrolled_courses"])


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')

    for user in students:
        if user['username'] == entered_username and user['password'] == entered_password:
            return jsonify({
                "success": True,
                "message": "Authentication successful",
                "userId": user['id']  # <-- ADD THIS
            })

    return jsonify({"success": False, "message": "Authentication failed. Incorrect username or password."})


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    entered_email = data.get('email')

    id = len(students)
    new_user = {
        "id": id + 1,
        "username": entered_username,
        "password": entered_password,
        "email": entered_email,
        "enrolled_courses": []
    }
    students.append(new_user)
    save_students_to_file()  # 💾 Save to file

    return jsonify({"success": True, "message": "User registered successfully"}), 201



@app.route('/testimonials', methods=['GET'])
def get_testimonial():

    test1 = random.randint(0, len(testimonials) - 1)
    test2 = -1

    while(test2 == -1 or test2 == test1):
        test2 = random.randint(0, len(testimonials) - 1)


    return jsonify([testimonials[test1], testimonials[test2]])



@app.route('/enroll/<student_id>', methods=['POST'])
def enroll(student_id):
    data = request.get_json()
    entered_course = data.get('course')
    entered_userId = int(student_id)


    for student in students:
        if student["id"] == entered_userId:
            for existing in student["enrolled_courses"]:
                if existing["id"] == entered_course["id"]:
                    return jsonify({"success": False, "message": "Already enrolled in this course"})
            
            student["enrolled_courses"].append(entered_course)
            save_students_to_file()
            return jsonify({"success": True, "message": "Enrolled successfully"})

    return jsonify({"success": False, "message": "Student not found"})


@app.route('/drop/<student_id>', methods=['DELETE'])
def drop(student_id):
    data = request.get_json()
    entered_courseID = data.get('courseID')
    entered_userId = int(student_id)

    for student in students:
        if student["id"] == entered_userId:
            for existing in student["enrolled_courses"]:
                if existing["id"] == entered_courseID:
                    student["enrolled_courses"].remove(existing)
                    save_students_to_file()
                    return jsonify({"success": True, "message": "Course deleted"})
    
    return jsonify({"success": False, "message": "Course not found"})


@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses)


@app.route('/student_courses/<student_id>', methods=['GET'])
def student_courses(student_id):
    entered_userId = int(student_id)

    for student in students:
        if student["id"] == entered_userId:
            return jsonify(student["enrolled_courses"])
    
    # Return empty list if student is not found or has no enrolled courses
    return jsonify([])





                





    
    

    







if __name__ == '__main__':
    app.run(debug=True)

