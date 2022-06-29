from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.static_folder = 'static'

db = SQLAlchemy(app)
class users(db.Model):
    uid = db.Column('user_id', db.Integer, primary_key = True)
    date = db.Column(db.Integer)
    
    def __init__(self, date):
        self.date = date

db.create_all()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/popup')
def popup():
    return render_template('popup.html')

@app.route('/newuser', methods=['GET'])
def newuser():
    newdate = request.args.get('date', "cringe")
    user = users(newdate)
    db.session.add(user)
    db.session.commit()
    return str(user.uid)

@app.route('/datetaken', methods=['GET'])
def datetaken():
    thisUid = request.args.get('uid', None)
    dateTaken = request.args.get('dateTaken', None)
    resp = users.query.filter_by(uid = thisUid).first()
    resp.date = dateTaken
    db.session.commit()
    return ('', 204)
            
if __name__ == "__main__":           
    app.run(debug = True)
