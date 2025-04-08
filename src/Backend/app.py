from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


# The students list
students = [
    {
        "id": 1,
        "username": "alice123",
        "password": "password123",
        "email": "alice@example.com",
        "enrolled_courses": [1,2]
    },
    {
        "id": 2,
        "username": "bob456",
        "password": "password456",
        "email": "bob@example.com",
        "enrolled_courses": [5,6,7]
    },
    {
        "id": 3,
        "username": "charlie789",
        "password": "password789",
        "email": "charlie@example.com",
        "enrolled_courses": [4,8,9]
    }
]


@app.route('/login', methods=['POST'])
def backend():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')

    for user in students:  # Change from 'users' to 'students'
        if user['username'] == entered_username and user['password'] == entered_password:
            return jsonify({"success": True, "message": "Authentication successful"})

    return jsonify({"success": False, "message": "Authentication failed. Incorrect username or password."})





if __name__ == '__main__':
    app.run(debug=True)

