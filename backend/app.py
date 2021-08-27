from flask import Flask
from flask_cors import CORS 
from db_connect import db
import config
from models.user import *
app = Flask(__name__)

def create_app():
    app.config.from_object(config) # config 에서 가져온 파일을 사용합니다.
    db.init_app(app)
    app.secret_key = "seeeeeeeeeeeecret"
    app.config['SESSION_TYPE'] = 'filesystem'
    
    
    from apis import auth, portfolio, edit, delete, add, network
    app.register_blueprint(auth.bp)
    app.register_blueprint(portfolio.bp)
    app.register_blueprint(edit.bp)
    app.register_blueprint(delete.bp)
    app.register_blueprint(add.bp)
    app.register_blueprint(network.bp)
    
    #CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})
    CORS(app)
    return app

if __name__ == "__main__":
    create_app().run(host='0.0.0.0', port=1234)
    