from flask import request
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from app import app
from app import db

@app.route('/add_student', methods=['POST'])
def add_student():
    student_data = request.get_json()
    result = db.students.insert_one(student_data)
    student_data['_id'] = str(result.inserted_id)  # Convert ObjectId to string
    return student_data, 200

@app.route('/update_student/<student_id>', methods=['PUT'])
def update_student(student_id):
    student_data = request.get_json()
    updated_student = db.students.find_one_and_update(
        {'_id': ObjectId(student_id)}, 
        {'$set': student_data}, 
        return_document=ReturnDocument.AFTER
    )
    if updated_student:
        updated_student['_id'] = str(updated_student['_id'])  # Convert ObjectId to string
        return updated_student, 200
    else:
        return {"message": "Student not found"}, 404

@app.route('/delete_student/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    # Find the student
    student = db.students.find_one({'_id': ObjectId(student_id)})
    if student:
        # Convert ObjectId to string
        student['_id'] = str(student['_id'])
        # Delete the student
        db.students.delete_one({'_id': ObjectId(student_id)})
        return student, 200
    else:
        return {"message": "Student not found"}, 404

@app.route('/get_student/<student_id>', methods=['GET'])
def get_student(student_id):
    student = db.students.find_one({'_id': ObjectId(student_id)})
    student['_id'] = str(student['_id'])  # Convert ObjectId to string
    return student

@app.route('/get_all_students', methods=['GET'])
def get_all_students():
    students = db.students.find()
    students_list = []
    for student in students:
        student['_id'] = str(student['_id'])
        students_list.append(student)
    return {"students": students_list}

@app.route('/get_all_majors', methods=['GET'])
def get_all_majors():
    majors = db.students.distinct('major')
    return {'majors': majors}, 200

@app.route('/get_all_grad_years', methods=['GET'])
def get_all_grad_years():
    grad_years = db.students.distinct('graduationYear')
    return {'graduationYears': grad_years}, 200

@app.route('/count_students_by_major/<major>', methods=['GET'])
def count_students(major):
    count = db.students.count_documents({'major': major})
    return {'count': count}, 200

@app.route('/count_students_by_year/<grad_year>', methods=['GET'])
def count_students_by_year(grad_year):
    count = db.students.count_documents({'graduationYear': grad_year})
    return {'count': count}, 200