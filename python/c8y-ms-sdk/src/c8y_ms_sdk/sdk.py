import os
import requests
from events import Events
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from bottle import request
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.basicConfig(format='%(asctime)s %(message)s')
base_url = os.environ["C8Y_BASEURL"]
tenant = os.environ["C8Y_BOOTSTRAP_TENANT"]
user = os.environ["C8Y_BOOTSTRAP_USER"]
password = os.environ["C8Y_BOOTSTRAP_PASSWORD"]


class ManagedObject:
    id: str
    name: str
    type: str
    owner: str
    creationTime: datetime
    lastUpdated: datetime


class ExternalIdentity:
    externalId: str
    type: str
    managedObject: ManagedObject


class MicroserviceSubscriptionService:
    bootstrap_auth = (tenant + "/" + user, password)
    headers = {'Accept': 'application/json',
               'Content-Type': 'application/json'}
    clients = {}
    scheduler = BackgroundScheduler()
    events = Events("on_new_subscription")

    def __init__(self):
        self.scheduler.add_job(self.get_users, 'interval', seconds=10)
        self.scheduler.start()

    def get_users(self):
        response = requests.get(f"{base_url}/application/currentApplication/subscriptions",
                                auth=self.bootstrap_auth, headers=self.headers)
        if response.status_code == 200:
            all_users = response.json()
            new_clients = {}
            for user in all_users["users"]:
                if user["tenant"] not in self.clients.keys():
                    new_clients[user["tenant"]] = (
                        user["tenant"] + "/" + user["name"], user["password"])
                    self.events.on_new_subscription(
                        new_clients[user["tenant"]])
                else:
                    new_clients[user["tenant"]] = self.clients[user["tenant"]]
            self.clients = new_clients

        else:
            logger.info("Can't retrieve microservice subscriptions")
            logger.info(response.json())

    def get_client(self):
        tenant = request.auth[0].split("/")[0]
        if tenant in self.clients.keys():
            return self.clients[tenant]
        else:
            logger.info(f"No subscription found for tenant {tenant}")
            return None
