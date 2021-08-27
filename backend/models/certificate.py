from db_connect import db

class Certificate(db.Model):
    
    __tablename__ = 'Certificate'
    
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    cert_name       = db.Column(db.String(20), nullable=False)
    cert_from       = db.Column(db.String(40), nullable=False)
    cert_date       = db.Column(db.String(12), nullable=False)
    user_id         = db.Column(db.String(20), db.ForeignKey('User.id'))

    def __init__(self, cert_name, cert_from, cert_date, user_id):
        self.cert_name      = cert_name
        self.cert_from      = cert_from
        self.cert_date      = cert_date
        self.user_id        = user_id