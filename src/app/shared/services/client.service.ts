import { Injectable, inject } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  client: Client = {};

  getMyClients() {
    return this.http.get<Client[]>(this.url + '/providers/my-clients');
  }

  getClientProfileDetailsById(clientId: string) {
    const params = new HttpParams().set('clientId', clientId)
    return this.http.get(this.url + '/clients/details-by-client-id', {params});
  }

  saveClientToLocal(client: Client){
    window.localStorage.setItem('client', JSON.stringify(client))
  }

  getClientFromLocal(){
    const client = window.localStorage.getItem('client')
    return client ? JSON.parse(client) : null
  }

  getClient(){
    if(this.client?.clientId) return this.client;
    return this.client = this.getClientFromLocal()
  }
}
