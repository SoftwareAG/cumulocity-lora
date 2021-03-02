import sys, requests;

url = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
codec = sys.argv[4]
auth = (username, password)

moId = requests.get(url + "/identity/externalIds/Codec ID/" + codec, auth=auth).json()["managedObject"]["id"]

print("Found id " + moId + " for codec " + codec)

mos = requests.get(url + "/inventory/managedObjects?type=Device Codec&pageSize=1000&query=lora_codec_DeviceCodecRepresentation.id eq " + codec, auth=auth).json()["managedObjects"]
for mo in mos:
    if mo["id"] != moId:
        print("Deleting redundant managed object " + mo["id"])
        print(requests.delete(url + "/inventory/managedObjects/" + mo["id"], auth=auth))