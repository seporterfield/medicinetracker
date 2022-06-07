from flask import Flask, render_template, request
app = Flask(__name__)
app.static_folder = 'static'
popup = False

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/popup')
def popup():
    return render_template('popup.html')
            
if __name__ == "__main__":           
    app.run(debug = True)
