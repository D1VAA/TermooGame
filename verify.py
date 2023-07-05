from random import randint
import json


def search():
    random = randint(1, 1443)
    f = open('words.json', 'rb')
    acent = str.maketrans('àáâãéêèíìôõóòúùç', 'aaaaeeeiioooouuc')
    filelist = json.loads(f.read())['words']
    w = filelist[random]
    word = w.translate(acent)
    f.close()
    return w, word


def verify(atp, res):
    atpl = list(atp)
    restl = list(res)
    ret = list()
    for i, let in enumerate(atpl):
        print(atpl[:i].count(let), restl.count(let))
        if let == restl[i]:
            ret.append('c')

        elif let in restl and (atpl[:i].count(let) < restl.count(let)):
            ret.append('in')

        else:
            ret.append('w')

    return ret
