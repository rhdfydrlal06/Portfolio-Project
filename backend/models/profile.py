from db_connect import db

class Profile(db.Model):
    
    __tablename__ = 'Profile'
    
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    #photo 타입 고민해보기
    name            = db.Column(db.String(20), nullable=False)
    comments        = db.Column(db.Text, nullable=False)
    user_id         = db.Column(db.String(20), db.ForeignKey('User.id'))

    def __init__(self, name, comments, user_id):
        self.name       = name
        self.comments   = comments
        self.user_id    = user_id
