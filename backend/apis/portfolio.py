from flask import Blueprint, request, jsonify
from models.user import *
from models.school import *
from models.award import *
from models.project import *
from models.certificate import *
from models.profile import *

bp = Blueprint('portfolio', __name__, url_prefix='/api/portfolio')
@bp.route('/main', methods= ["POST"])
def portfolio():
    user_id = request.json.get("sessionId")
    result = {
        "profile": [],
        "awards": [],
        "schools": [],
        "certificates": [],
        "projects": [],
    }
    profile = Profile.query.filter(Profile.user_id == user_id).first()
    if profile!=None:
        profile_data = {
                "id": profile.id,
                "name": profile.name,
                "comments": profile.comments
            }
        result["profile"].append(profile_data)

    schools = School.query.filter(School.user_id == user_id).all()
    if schools!=None:
        for school in schools:
            school_data = {
                "id": school.id,
                "name": school.name,
                "major": school.major,
                "status": school.status,
            }
            result["schools"].append(school_data)
    
    awards = Award.query.filter(Award.user_id == user_id).all()
    if awards!=None:
        for award in awards:
            award_data = {
                "id": award.id,
                "awards": award.awards,
                "awards_details": award.awards_details,
            }
            result["awards"].append(award_data)
    
    certificates = Certificate.query.filter(Certificate.user_id == user_id).all()
    if certificates!=None:
        for certificate in certificates:
            cert_data = {
                "id": certificate.id,
                "cert_name": certificate.cert_name,
                "cert_from": certificate.cert_from,
                "cert_date": certificate.cert_date,
            }
            result["certificates"].append(cert_data)
    
    projects = Project.query.filter(Project.user_id == user_id).all()
    if projects!=None:
        for project in projects:
            project_data = {
                "id": project.id,
                "project_name": project.project_name,
                "project_details": project.project_details,
                "project_start_date": project.project_start_date,
                "project_end_date": project.project_end_date,
            }
            result["projects"].append(project_data)
    return jsonify(result="success", data={"portfolio": result}), 200
@bp.route('/main/profile', methods= ["POST"])
def profile():
    user_id = request.json.get("sessionId")
    result = {
        "profile": []
    }
    profile = Profile.query.filter(Profile.user_id == user_id).first()
    profile_data = {
            "id": profile.id,
            "name": profile.name,
            "comments": profile.comments
        }
    result["profile"].append(profile_data)

    return jsonify(result="success", data=result), 200

@bp.route('/main/awards', methods= ["POST"])
def awards():
    user_id = request.json.get("sessionId")
    result = {
        "awards": []
    }
    awards = Award.query.filter(Award.user_id == user_id).all()
    for award in awards:
        award_data = {
            "id": award.id,
            "awards": award.awards,
            "awards_details": award.awards_details,
        }
        result["awards"].append(award_data)
    
    return jsonify(result="success", data=result), 200

@bp.route('/main/schools', methods= ["POST"])
def schools():
    user_id = request.json.get("sessionId")
    result = {
        "schools": []
    }
    schools = School.query.filter(School.user_id == user_id).all()
    for school in schools:
        school_data = {
            "id": school.id,
            "name": school.name,
            "major": school.major,
            "status": school.status,
        }
        result["schools"].append(school_data)
    
    return jsonify(result="success", data=result), 200


@bp.route('/main/certificates', methods= ["POST"])
def certificates():
    user_id = request.json.get("sessionId")
    result = {
        "certificates": []
    }
    certificates = Certificate.query.filter(Certificate.user_id == user_id).all()
    for certificate in certificates:
        cert_data = {
            "id": certificate.id,
            "cert_name": certificate.cert_name,
            "cert_from": certificate.cert_from,
            "cert_date": certificate.cert_date,
        }
        result["certificates"].append(cert_data)
    
    return jsonify(result="success", data=result), 200


@bp.route('/main/projects', methods= ["POST"])
def projects():
    user_id = request.json.get("sessionId")
    result = {
        "projects": []
    }
    projects = Project.query.filter(Project.user_id == user_id).all()
    for project in projects:
        project_data = {
            "id": project.id,
            "project_name": project.project_name,
            "project_details": project.project_details,
            "project_start_date": project.project_start_date,
            "project_end_date": project.project_end_date,
        }
        result["projects"].append(project_data)
    return jsonify(result="success", data=result), 200