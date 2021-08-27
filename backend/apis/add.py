from flask import Blueprint, request, jsonify
from models.user import *
from models.school import *
from models.award import *
from models.project import *
from models.certificate import *
from models.profile import *


bp = Blueprint('add', __name__, url_prefix='/api/add')

@bp.route('/award', methods= ["POST"])
def award():
    user_id = request.json.get("sessionId")
    _award = Award("","",user_id)
    db.session.add(_award)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/certificate', methods= ["POST"])
def certificate():
    user_id = request.json.get("sessionId")
    _certificate = Certificate("","","",user_id)
    db.session.add(_certificate)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/project', methods= ["POST"])
def project():
    user_id = request.json.get("sessionId")
    _project = Project("","","","",user_id)
    db.session.add(_project)
    db.session.commit()
    return jsonify(result="success"), 200

@bp.route('/school', methods= ["POST"])
def school():
    user_id = request.json.get("sessionId")
    _school = School("","","",user_id)
    db.session.add(_school)
    db.session.commit()
    return jsonify(result="success"), 200
