from flask import Flask, send_from_directory, render_template
import os
import subprocess

dir_path = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__, static_folder='dist', template_folder='dist')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def send_dir(path):
    full_path = f'{dir_path}/dist/{path}'
    if os.path.exists(full_path):
        return app.send_static_file(path)
    else:
        return render_template('index.html')

app.run(debug=True)