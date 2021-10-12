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
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

# get user's name and greet them
@api.route("/greet", methods=["GET"])
@jwt_required()
def greet_user():
    
    username = get_jwt_identity()
    hello_user = {
        "message": "Hello, "+ username.capitalize() + "!"
        }
    
    return jsonify(hello_user)


# create a new user
@api.route('/user', methods=['POST']) #working
def user():
    new_user = request.get_json()
    if request.method == "POST":
        if new_user is None or new_user['email'] is None or new_user['username'] is None or new_user['password'] is None:
            raise APIException("Input in all fields required", status_code=400)
        new_user = User(username=new_user["username"], email=new_user["email"], password=new_user["password"])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(new_user.serialize()), 200

# retrieve all users
@api.route('/users', methods=['GET'])  #working
def all_users():
    if request.method == "GET":
        all_users = User.query.all()
        all_users = list(map(lambda x: x.serialize(), all_users))

        return jsonify(all_users), 200
    

# add a new contact to user contact list
@api.route('/user/<username>/addcontact', methods=['POST'])  #working
def add_contact(username):
    new_contact = request.get_json()
    if request.method == "POST":
        if new_contact is None or new_contact['name'] is None : 
            raise APIException("Name is required to save the contact", status_code=400) 
        new_contact = Contact(name=new_contact["name"], contact_email=new_contact["contact_email"], address=new_contact["address"], phone=new_contact["phone"]) 
        db.session.add(new_contact)
        db.session.commit()  
        
        return jsonify(new_contact.serialize()), 200


# retrieve all user contacts
@api.route('/user/<username>/contacts', methods=['GET'])
def get_user_contacts(username):
    
    target_user = User.query.filter_by(username=username).first()
    print("This the selected user contacts: ", target_user.contacts)
    single_user_contacts = list(map(lambda x: x.serialize(), target_user.contacts))


    return jsonify(single_user_contacts), 200


# edit or delete specific contact from user contact list
@api.route('/user/<user_id>/contact/<id>', methods=['PUT','DELETE'])
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
        target_contact = target_contact.serialize()
        db.session.commit()
        return jsonify(target_contact), 200
    elif request.method == "DELETE":
        db.session.delete(target_contact)
        db.session.commit()
        return jsonify("Contact is deleted."), 200


# add a note to a contact 
@api.route('/contact/<contact_id>/addnote', methods=['POST'])
def add_note(contact_id):
    new_note = request.get_json()
    new_note = Note(text=new_note['text'], contact_id=contact_id)
    db.session.add(new_note)
    db.session.commit()
    
    return jsonify(new_note.serialize())
