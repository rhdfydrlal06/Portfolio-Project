from flask import Blueprint, jsonify, request, session
from models.user import *
from models.profile import *
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS 

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/login', methods=['POST'])
def login():
    if request.json:
        id = request.json.get("email")
        pw = request.json.get("password")
    
    user_data = User.query.filter(User.email == id).first()
    if not user_data:
        return jsonify(result="failed", message="존재하지 않는 아이디 입니다."), 200
    if not check_password_hash(user_data.password, pw):
        return jsonify(result="failed", message="비밀번호가 일치하지 않습니다."), 200

    session.clear()
    session['user_id'] = user_data.id
    data = {
            "id": user_data.id,
            "email": user_data.email,
            "name": user_data.name
        }
    print("login success")
    return jsonify(result="success", message="login success", data={"user_data": data}), 200

@bp.route('/signup', methods=['POST'])
def signup():
    if request.json:
        email = request.json.get("email")
        password = request.json.get("password")
        check_password = request.json.get("checkPassword")
        name = request.json.get("name")

    user_info = User.query.filter(User.email == email).first()
    if user_info:
        return jsonify(result="failed", message="이미 가입된 정보 입니다."), 201
    ##password 해쉬화 진행
    if password != check_password:
        return jsonify(result="failed", message="비밀번호가 일치하지 않습니다."), 201
    if len(password) < 10:
        return jsonify(result="failed", message="비밀번호를 최소 10자리 이상으로 구성되어야 합니다."), 201
    password = generate_password_hash(password)
    #user 생성
    user = User(email=email, password=password, name=name)
    db.session.add(user)
    db.session.commit()
    user_info = User.query.filter(User.email == email).first()
    profile = Profile(name=name, comments="", user_id=user_info.id)
    db.session.add(profile)
    db.session.commit()
    return jsonify(result="success", message="반갑습니다 회원님"), 201

@bp.route('/logout')
def logout():
    session.clear()
    return jsonify(result="success", message="로그아웃 완료"), 200