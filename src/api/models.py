from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    contacts = db.relationship('Contact', backref='user')
    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r %r %r>' % (self.username, self.email, self.id) 

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
            # do not serialize the password, its a security breach
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(240), unique=False, nullable=False)
    contact_email = db.Column(db.String(120), unique=True, nullable=False)
    phone= db.Column(db.String(240), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    notes = db.relationship('Note', backref='contact')
    

    def __repr__(self):
        return '<Contact %r %r %r %r>' % (self.name, self.address, self.contact_email, self.phone ) 

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "contact_email": self.contact_email,
            "phone": self.phone
            # do not serialize the password, its a security breach
        }

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(240), unique=False, nullable=True)
    contact_id = db.Column(db.Integer, db.ForeignKey('contact.id'))

    def __repr__(self):
        return '<Note %r >' % (self.text ) 

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text
            
        }