"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from api.models import db, User, Contact, Note
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to generate the JWT.
@api.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 401

    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify("This user doesn't exist or you entered wrong username/password."), 400
    access_token = create_access_token(identity=username)
    return jsonify({"token": access_token, "user": user.serialize()})

# get user's name and greet them
@api.route("/greet", methods=["GET"])
@jwt_required()
def greet_user():
    
    username = get_jwt_identity()
    hello_user = {
        "message": "Welcome to KeepIt.App, "+ username.capitalize() + "!"
        }
    
    return jsonify(hello_user)


# create a new user
@api.route('/user', methods=['POST']) #working
def user():
    new_user = request.get_json()
    # user = User.query.filter_by(username=new_user["username"], email=new_user["email"])
    # if user:
    #     raise APIException("This user already exists.", status_code=400)
    if request.method == "POST":
        if new_user is None or new_user['email'] is None or new_user['username'] is None or new_user['password'] is None:
            raise APIException("Input in all fields required", status_code=400)
        new_user = User(username=new_user["username"], email=new_user["email"], password=new_user["password"])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(new_user.serialize()), 200

# get or delete a single user
@api.route('/user/<username>', methods=['GET', 'DELETE', 'PUT'])      #working
def handle_user(username):
    single_user = request.get_json()
    target_user = User.query.filter_by(username=username).first()
    if target_user is None:
        raise APIException("User not found", 404)

    if request.method == "GET":
        # target_user = single_user
        return jsonify(target_user.serialize()), 200

    # if request.method == "PUT":
    #     # if "password" in single_user:
    #     #     target_user.password = single_user["password"]
    #     if "email" in single_user:
    #         target_user.email = single_user["email"]
    #     target_user.serialize()
    #     db.session.commit()
    #     return jsonify(target_user)

    if request.method == "DELETE":
        db.session.delete(target_user)
        db.session.commit()
        return jsonify("User is deleted.")


# retrieve all users
@api.route('/users', methods=['GET'])  #working
def all_users():
    if request.method == "GET":
        all_users = User.query.all()
        all_users = list(map(lambda x: x.serialize(), all_users))

        return jsonify(all_users), 200
    

# add a new contact to user contact list
@api.route('/user/<int:user_id>/addcontact', methods=['POST'])  #working
def add_contact(user_id):
    body = request.get_json()
    
    if request.method == "POST":
        if body is None or body['name'] is None : 
            raise APIException("Name is required to save the contact", status_code=400) 
        new_contact = Contact(name=body["name"], contact_email=body["contact_email"], address=body["address"], phone=body["phone"], user_id=user_id) 
        db.session.add(new_contact)
        db.session.commit() 
        
        new_note = request.get_json()
        if "text" in new_note: 
            new_note = Note(text=body['text'], contact_id=new_contact.id)
            db.session.add(new_note)
            db.session.commit()
        
        return jsonify(new_contact.serialize()), 200


# retrieve all contacts of a single user
@api.route('/user/<username>/contacts', methods=['GET'])               #working
def get_user_contacts(username):
    
    target_user = User.query.filter_by(username=username).first()
    # print("This the selected user contacts: ", target_user.contacts)
    single_user_contacts = list(map(lambda x: x.serialize(), target_user.contacts))


    return jsonify(single_user_contacts), 200



# edit or delete specific contact from user contact list
@api.route('/user/<int:user_id>/contact/<int:id>', methods=['PUT','DELETE'])    # working
def handle_contact(user_id, id):
    contact_to_edit = request.get_json()
    target_contact = Contact.query.filter_by(user_id=user_id, id=id).first()
    print("This is the contact", target_contact)

    if request.method == "PUT":
        if "name" in contact_to_edit: 
            print("There is a name")
            target_contact.name = contact_to_edit['name']
        if "contact_email" in contact_to_edit:
            target_contact.contact_email = contact_to_edit['contact_email']
        if "address" in contact_to_edit:
            target_contact.address = contact_to_edit['address']
        if "phone" in contact_to_edit:
            target_contact.phone = contact_to_edit['phone']
        # if "user_id" in contact_to_edit:
        #     target_contact.user_id = contact_to_edit['user_id']
        target_contact = target_contact.serialize()
        db.session.commit()
        return jsonify(target_contact), 200
    elif request.method == "DELETE":
        db.session.delete(target_contact)
        db.session.commit()
        return jsonify("Contact is deleted."), 200


# add a note to a contact 
@api.route('/contact/<int:contact_id>/addnote', methods=['POST'])     #working
def add_note(contact_id):
    body = request.get_json()
    new_note = Note(text=body['text'], contact_id=contact_id)
    db.session.add(new_note)
    db.session.commit()
    
    return jsonify(new_note.serialize())

# edit or delete a note from a contact
@api.route('/contact/<int:contact_id>/note/<int:id>', methods=['PUT', 'DELETE'])   #working
def handle_note(contact_id, id):
    note_to_edit = request.get_json()
    target_note = Note.query.filter_by(contact_id=contact_id, id=id).first()

    if request.method == "PUT":
        if "text" in note_to_edit:
            target_note.text = note_to_edit["text"]
        target_note = target_note.serialize()
        db.session.commit()
        return jsonify(target_note)

    if request.method == "DELETE":
        db.session.delete(target_note)
        db.session.commit()
        return jsonify("Note is deleted.")


# get all notes from a contact
@api.route('/contact/<int:contact_id>/notes', methods=['GET'])
def all_contact_notes(contact_id):
    body=request.get_json()
    all_contact_notes = Note.query.filter_by(contact_id=contact_id)
    all_notes = list(map(lambda x: x.serialize(), all_contact_notes))

    return jsonify((all_notes)), 200