from db_connect import db

class Project(db.Model):
    
    __tablename__ = 'Project'
    
    id                  = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    project_name        = db.Column(db.String(40), nullable=False)
    project_details     = db.Column(db.Text, nullable=False)
    project_start_date  = db.Column(db.String(12), nullable=False)
    project_end_date    = db.Column(db.String(12), nullable=False)
    user_id             = db.Column(db.String(20), db.ForeignKey('User.id'))

    def __init__(self, project_name, project_details, project_start_date, project_end_date,  user_id):
        self.project_name           = project_name
        self.project_details        = project_details
        self.project_start_date     = project_start_date
        self.project_end_date       = project_end_date
        self.user_id                = user_id