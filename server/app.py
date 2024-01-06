from flask import Flask, request
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_DB_URI = os.getenv("MONGO_DB_URI")

client = MongoClient(MONGO_DB_URI)
db = client['roster']

app = Flask(__name__)

@app.route('/add_student', methods=['POST'])
def add_student():
    student_data = request.get_json()
    db.students.insert_one(student_data)
    return {"message": "Student added successfully!"}, 200

@app.route('/update_student/<student_id>', methods=['PUT'])
def update_student(student_id):
    student_data = request.get_json()
    db.students.update_one({'_id': ObjectId(student_id)}, {'$set': student_data})
    return {"message": "Student updated successfully!"}, 200

@app.route('/delete_student/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    db.students.delete_one({'_id': ObjectId(student_id)})
    return {"message": "Student deleted successfully!"}, 200

@app.route('/get_student/<student_id>', methods=['GET'])
def get_student(student_id):
    student = db.students.find_one({'_id': ObjectId(student_id)})
    student['_id'] = str(student['_id'])  # Convert ObjectId to string
    return student

if __name__ == "__main__":
    app.run(debug=True)