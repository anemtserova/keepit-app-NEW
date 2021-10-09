"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

@api.route("/greet", methods=["GET"])
@jwt_required()
def greet_user():
    
    username = get_jwt_identity()
    hello_user = {
        "message": "Hello, "+ username.capitalize() + "!"
        }
    
    return jsonify(hello_user)

@api.route('/user', methods=['POST'])
def user():
    new_user = request.get_json()
    if request.method == "POST":
        if new_user is None or new_user['email'] is None or new_user['username'] is None or new_user['password'] is None:
            raise APIException("Input in all fields required", status_code=400)
        new_user = User(username=new_user["username"], email=new_user["email"], password=new_user["password"])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(new_user), 200
    

@api.route('/<username>/contact', methods=['POST'])
def add_contact():
    new_contact = request.get_json()
    if request.method == "POST":
        if new_contact is None or new_contact['name'] is None : 
            raise APIException("Name is required to save the contact", status_code=400) 
        new_contact = Contact(name=new_contact["name"], email=new_contact["email"], address=new_contact["address"], phone=new_contact["phone"]) 
        db.session.add(new_contact)
        db.session.commit()  
        
        
        return jsonify(contacts_updated), 200
    
@api.route('/<username>/contact/<int:id>', methods=['PUT','DELETE'])
def contact():
    contact_to_edit = request.get_json()
    contact = Contact.query.filter_by(id=contact_to_edit["id"]).first()
    if request.method == "PUT":
        contact.name = contact_to_edit['name']
        contatc.email = contact_to_edit['email']
        contact.address = contact_to_edit['address']
        contact.phone = contact_to_edit['phone']
        contact = contact.serialize()
        db.session.commit()
        return jsonify(contact), 200
    elif request.method == "DELETE":
        db.session.delete(contact)
        db.session.commit()

@api.route('/<username>/contact/<int:id>/note', methods=['POST'])
def add_note():
    new_note = request.get_json()
    new_note = Note(text=new_note['text'])
    db.session.add(new_note)
    db.session.commit()
    # contact_note = Note.query.filter_by(id=new_note['id'])
    # all_notes = contact
    return jsonify(new_note)
