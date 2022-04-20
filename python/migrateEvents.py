from genericpath import exists
from getpass import getpass
import json, os
from typing import Optional
import requests, sys, getopt
from enum import Enum

username = None
password = None
host = None
device = None

try:
    opts, args = getopt.getopt(sys.argv[1:], "u:p:h:d:")
except:
    print('migrateEvent.py -u <username> -p <password> -h <host> -d <device_id>')
    sys.exit(2)

for opt, arg in opts:
    if opt == '-u':
        username = arg
    if opt == '-p':
        password = arg
    if opt == '-h':
        host = arg
    if opt == '-d':
        device = arg

if username is None:
    username = input("Cumulocity user name: ")
if password is None:
    password = getpass("Cumulocity user password: ")
if host is None:
    host = input("Cumulocity tenant URL: ")
if device is None:
    device = input("Device ID:")

auth = (username, password)
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

currentPage = 1
events = requests.get(host + '/event/events?source=' + device + '&withTotalPages=true&pageSize=100&type=LoRaPayload', auth=auth).json()
totalPages = events["statistics"]["totalPages"]
cpt = 0
while (currentPage<=totalPages):
    for event in events["events"]:
        if "status" not in event:
            status = "unprocessed"
            if "processed" in event and event["processed"]:
                status = "processed"
            updated_event = {"status": status}
            #print(updated_event)
            requests.put(host + f'/event/events/{event["id"]}', auth=auth, data=json.dumps(updated_event))
            cpt = cpt + 1
    currentPage = currentPage + 1
    events = requests.get(host + '/event/events?source=' + device + '&pageSize=100&currentpage=' + str(currentPage), auth=auth).json()

print(f"Processed {cpt} events")