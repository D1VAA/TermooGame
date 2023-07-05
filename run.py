import uuid

from verify import search, verify
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit

word = dict()
app = Flask(__name__)
app.debug = True
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


# search word
@socketio.on('connect')
def handle_connect():
    session['uid'] = uuid.uuid4()
    user_id = session['uid']
    global word
    sword = search()  # Return Tuple
    word[user_id] = sword[1]
    print('\n\n')
    print(f'\033[0;49;91mSelected Word!\033[0m \033[7;49;31m{sword[1]}\033[0m')
    print('\n\n')


# verify attemp from client
@socketio.on('attempt')
def verify_attempt(atp):
    sid = session['uid']
    print('Tentativa: ', atp)
    resp = verify(atp, word[sid])
    print(resp)
    emit('response', {'atp': atp, 'ver': resp})


@socketio.on('disconnect')
def handle_disconnect():
    word.pop(session['uid'])
    del session['uid']


if __name__ == "__main__":
    socketio.run(app, port=5000, host='0.0.0.0')
