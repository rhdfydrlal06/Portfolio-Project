from flask import Blueprint, request, jsonify
from models.user import *
from models.school import *
from models.award import *
from models.project import *
from models.certificate import *
from models.profile import *

bp = Blueprint('edit', __name__, url_prefix='/api/edit')

@bp.route('/school', methods= ["POST"])
def school():
    name = request.json.get("name")
    major = request.json.get("major")
    status = request.json.get("status")
    school_id = request.json.get("school_id")
    edit_target = School.query.filter(School.id == school_id).first()

    edit_target.name = name
    edit_target.major = major
    edit_target.status = status
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/award', methods= ["POST"])
def award():
    award_name = request.json.get("award")
    awardDetail = request.json.get("awardDetail")    
    award_id = request.json.get("award_id")
    edit_target = Award.query.filter(Award.id == award_id).first()

    edit_target.awards = award_name
    edit_target.awards_details = awardDetail
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/certificate', methods= ["POST"])
def certificate():
    _name = request.json.get("name")
    _from = request.json.get("from")
    _date = request.json.get("date")
    certificate_id = request.json.get("certificate_id")

    edit_target = Certificate.query.filter(Certificate.id == certificate_id).first()
    edit_target.cert_name = _name
    edit_target.cert_from = _from
    edit_target.cert_date = _date
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/profile', methods= ["POST"])
def profile():
    _name = request.json.get("name")
    comments = request.json.get("comments")
    profile_id = request.json.get("profile_id")

    edit_target = Profile.query.filter(Profile.id == profile_id).first()
    
    edit_target.name = _name
    edit_target.comments = comments
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/project', methods= ["POST"])
def project():
    _name = request.json.get("name")
    details = request.json.get("details")
    startDate = request.json.get("startDate")
    endDate = request.json.get("endDate")
    project_id = request.json.get("project_id")

    edit_target = Project.query.filter(Project.id == project_id).first()
    
    edit_target.project_name = _name
    edit_target.project_details = details
    edit_target.project_start_date = startDate
    edit_target.project_end_date = endDate
    db.session.commit()
    return jsonify(result="success"), 200


