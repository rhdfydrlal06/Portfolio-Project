from db_connect import db

class Award(db.Model):
    
    __tablename__ = 'Award'
    
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    awards          = db.Column(db.String(20), nullable=False)
    awards_details  = db.Column(db.Text, nullable=False)
    user_id         = db.Column(db.String(20), db.ForeignKey('User.id'))

    def __init__(self, awards, awards_details, user_id):
        self.awards           = awards
        self.awards_details   = awards_details
        self.user_id          = user_id