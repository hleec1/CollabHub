import requests
import json
import base64
import re
import sys

request_url = 'https://attend.skku.edu/eams/loginProc'
with requests.session() as session:
    payload = {
        'login_id' : sys.argv[1],
        'login_pw' : sys.argv[2]
    }
    login_request = session.post(request_url, data=payload)
    text = b'alert'
    if(text in login_request.content):
        print('false')
        sys.stdout.flush()
    else:
        print('true')
        sys.stdout.flush()       
    