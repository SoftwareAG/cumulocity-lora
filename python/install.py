from getpass import getpass
import json
from typing import Optional
import requests, sys, getopt
from enum import Enum

username = None
password = None
host = None

try:
    opts, args = getopt.getopt(sys.argv[1:], "u:p:h:")
except:
    print('install.py -u <username> -p <password> -h <host>')
    sys.exit(2)

for opt, arg in opts:
    if opt == '-u':
        username = arg
    if opt == '-p':
        password = arg
    if opt == '-h':
        host = arg

if username is None:
    username = input("Cumulocity user name: ")
if password is None:
    password = getpass("Cumulocity user password: ")
if host is None:
    host = input("Cumulocity tenant URL: ")

auth = (username, password)
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

def get_github_latest_release(repo_name: str) -> str:
    res = requests.get('https://api.github.com/repos/' + repo_name + '/releases/latest')
    return res.json()['tag_name']

def get_application_id(app_name: str) -> Optional[int]:
    res = requests.get(host + '/application/applicationsByName/' + app_name, auth=auth)
    json = res.json()
    if len(json['applications']) > 0:
        return res.json()['applications'][0]['id']
    else:
        return None

class ApplicationType(Enum):
    EXTERNAL = 'EXTERNAL'
    HOSTED = 'HOSTED'
    MICROSERVICE = 'MICROSERVICE'

def create_application(name: str, type: ApplicationType) -> str:
    payload = {'key': name + '-key', 'name': name, 'type': type.value}
    if type == ApplicationType.HOSTED:
        payload.update({'key': name + '-application-key', 'globalTitle': "Cumulocity", 'contextPath': name, 'manifest': {}, 'upgrade': True, 'contentSecurityPolicy': "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' *.billwerk.com http: https: ws: wss:;  script-src 'self' open.mapquestapi.com *.twitter.com *.twimg.com *.aptrinsic.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data:; font-src * data:; frame-src *;", 'resourcesUrl': '/'})
    res = requests.post(host + '/application/applications', auth=auth, headers=headers, data=json.dumps(payload))
    application_self = res.json()['self']
    application_id = res.json()['id']
    res = requests.get(host + '/tenant/currentTenant', headers=headers, auth=auth)
    tenant = res.json()['name']
    print(f"current tenant Id is {tenant}")
    res = requests.post(host + '/tenant/tenants/' + tenant + '/applications', headers=headers, auth=auth, data=json.dumps({'application': {'self': application_self}}))
    print(res)
    if res.ok:
        print(res.json())
    else:
        print(f"Couldn't make tenant {tenant} subscribe to application {name}")
    return application_id

def attach_binary_from_url(application_id: int, url: str) -> int:
    binary = requests.get(url, stream=True)
    res = requests.post(host + '/application/applications/' + application_id + '/binaries', headers={'Accept': 'application/json'}, auth=auth, files={'file':binary.raw})
    binary_id = res.json()['id']
    res = requests.put(host + '/application/applications/' + application_id, headers=headers, auth=auth, data=json.dumps({'activeVersionId': binary_id}))
    print(res)
    if res.ok:
        print(res.json())
    else:
        print(f"Couldn't make tenant subscribe to application {application_id}")
    return binary_id

github_proxy_app_id = get_application_id('github-proxy')
if github_proxy_app_id is None:
    github_proxy_app_id = create_application('github-proxy', ApplicationType.MICROSERVICE)

release = get_github_latest_release('SoftwareAG/cumulocity-lora')

print(f"Cumulocity LoRa latest release is {release}")

print(f"github-proxy application id is {github_proxy_app_id}")

binary_id = attach_binary_from_url(github_proxy_app_id, "https://github.com/SoftwareAG/cumulocity-lora/releases/download/" + release + "/github-proxy.zip")

print(f"Binary Id is {binary_id}")

webui_id = get_application_id('devicemanagement-lora')
if webui_id is None:
    webui_id = create_application('devicemanagement-lora', ApplicationType.HOSTED)

print(f"devicemanagement-lora application id is {webui_id}")

binary_id = attach_binary_from_url(webui_id, "https://github.com/SoftwareAG/cumulocity-lora/releases/download/" + release + "/devicemanagement-lora.zip")

print(f"Binary Id is {binary_id}")
