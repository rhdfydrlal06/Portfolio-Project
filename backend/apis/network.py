from flask import Blueprint, request, jsonify
from models.profile import *
bp = Blueprint('network', __name__, url_prefix='/api/network')

@bp.route('/search_user', methods= ["POST"])
def search_user():
    user_id = request.json.get("sessionId")
    serach = request.json.get("serach")
    result = {
        "users": []
    }
    _like = "%"+serach+"%"
    profiles = Profile.query.filter(Profile.name.like(_like)).order_by(Profile.name.asc())
    for profile in profiles:
        user_data = {
            "id": profile.id,
            "name": profile.name,
            "comments": profile.comments,
            "user_id": profile.user_id,
        }
        result["users"].append(user_data)
    
    return jsonify(result="success", data=result), 200
