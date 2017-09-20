#!/usr/bin/env python

import cgitb
from cgi import parse_qs, escape
import sys, os
from flup.server.fcgi import WSGIServer

#show error
cgitb.enable()

def app(environ, start_response):
    payload="";
    if(environ['REQUEST_METHOD']=='POST'):
        length = environ["CONTENT_LENGTH"]
        payload = environ['wsgi.input'].read(int(length));
    query_string=environ['QUERY_STRING'];
    d = parse_qs(query_string)
    path = d.get('q', 'query_string')[0]
    ret = run(environ['QUERY_STRING'], payload)
    start_response(ret['http_response'], [(b'Content-Type', ret['http_content_type'])])
    yield (ret['body'])


def debug_environ_var(environ):
    yield '<h1>FastCGI Environment</h1>'
    yield '<table>';
    for k, v in sorted(environ.items()):
        yield '<tr><th>%s</th><td>%s</td></tr>' % (escape(k), escape(v))
    yield '</table>'


def run(query_string, payload):
    http_response=b'200 OK'
    http_content_type=b'application/json';
    d = parse_qs(query_string)
    path = d.get('q', 'query_string')[0]
    res = "";
    #api_obj = ApiManagerPlus();
    #api_res=api_obj.api(path, payload);
    api_res={'ok': True, 'res':{'a';1}};
    if(api_res['ok']):
        res=json.dumps(api_res['ret'],sort_keys=False);
    else:
        res=json.dumps(api_res)
    return {'http_response': http_response, 'http_content_type': http_content_type, 'body': res}

WSGIServer(app).run()
