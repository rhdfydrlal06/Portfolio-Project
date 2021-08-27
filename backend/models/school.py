from db_connect import db

class School(db.Model):
    
    __tablename__ = 'School'
    
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name            = db.Column(db.String(20), nullable=False)
    major           = db.Column(db.String(20), nullable=False)
    status          = db.Column(db.String(20), nullable=False)
    user_id         = db.Column(db.String(20), db.ForeignKey('User.id'))

    def __init__(self, name, major, status, user_id):
        self.name       = name
        self.major      = major
        self.status     = status
        self.user_id    = user_id