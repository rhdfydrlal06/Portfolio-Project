from flask import Blueprint, request, jsonify
from pandas import *
from models.user import *
from models.school import *
from models.award import *
from models.project import *
from models.certificate import *
from models.profile import *

bp = Blueprint('delete', __name__, url_prefix='/api/delete')

@bp.route('/school', methods= ["POST"])
def school():
    school_id = request.json.get("school_id")
    delete_target = School.query.filter(School.id == school_id).one_or_none()

    db.session.delete(delete_target)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/award', methods= ["POST"])
def awards():   
    award_id = request.json.get("award_id")
    delete_target = Award.query.filter(Award.id == award_id).one_or_none()
    db.session.delete(delete_target)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/certificate', methods= ["POST"])
def certificate():
    certificate_id = request.json.get("certificate_id")

    delete_target = Certificate.query.filter(Certificate.id == certificate_id).one_or_none()

    db.session.delete(delete_target)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/project', methods= ["POST"])
def project():
    project_id = request.json.get("project_id")

    delete_target = Project.query.filter(Project.id == project_id).one_or_none()

    db.session.delete(delete_target)
    db.session.commit()
    return jsonify(result="success"), 200


