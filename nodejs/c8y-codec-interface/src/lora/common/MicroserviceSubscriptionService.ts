import { Client, FetchClient, BasicAuth } from '@c8y/client';
import { Request } from "express";
import { EventEmitter } from "events";
import cron from "node-cron";
import { Logger } from './Logger';

export class MicroserviceSubscriptionService extends EventEmitter {
    protected baseUrl: string = process.env.C8Y_BASEURL;
    protected tenant: string = process.env.C8Y_BOOTSTRAP_TENANT;
    protected user: string = process.env.C8Y_BOOTSTRAP_USER;
    protected password: string = process.env.C8Y_BOOTSTRAP_PASSWORD;
    protected client: FetchClient;
    protected clients: Map<string, Client> = new Map<string, Client>();
    protected logger = Logger.getLogger("MicroserviceSubscriptionService");

    constructor() {
        super();
        this.client = new FetchClient(new BasicAuth({ tenant: this.tenant, user: this.user, password: this.password }), this.baseUrl);
        cron.schedule("*/10 * * * * *", () => {
            this.getUsers();
        });
    }

    protected async getUsers() {
        this.client.fetch("/application/currentApplication/subscriptions").then(async result => {
            let allUsers = await result.json();
            let newClients: Map<string, Client> = new Map<string, Client>();
            if (allUsers) {
                allUsers.users.forEach(user => {
                    if (!(Array.from(this.clients.keys()).includes(user.tenant))) {
                        const auth = new BasicAuth({
                            user: user.name,
                            password: user.password,
                            tenant: user.tenant
                        });
                        let client: Client = new Client(auth, this.baseUrl);
                        newClients.set(user.tenant, client);
    
                        this.emit('newMicroserviceSubscription', client);
                    } else {
                        newClients.set(user.tenant, this.clients.get(user.tenant));
                    }
                });
            }
            this.clients = newClients;
        }).catch(e => {
            console.log(e);
            this.logger.error(e);
        });
    }

    getClients(): Map<string, Client> {
        return this.clients;
    }

    getClient(request: Request): Promise<Client> {
        this.logger.info("Authorization: " + request.headers.authorization);
        let currentTenant: string = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary').split("/")[0];
        this.logger.info("Current Tenant: " + currentTenant);
        let client: Client = this.clients.get(currentTenant);
        return new Promise<Client>((resolve, reject) => {
            if (client) {
                resolve(client);
            } else {
                reject(new Error(`Tenant ${currentTenant} didn't subsribe to this microservice!`));
            }
        });
    }
}