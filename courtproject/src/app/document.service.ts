import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './environments';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }
   getApiDocument() {
    return this.http.get(`${config.path_api}/documents`);
  }
  postApiDocument(data: any) {
    return this.http.post(`${config.path_api}/documents/upload`, data);
  }

  //EXAMPLE HELLO WORLD

    getHello(){
      return this.http.get(`${config.path_api}/documents/hello-get`);
    }
    getHellobyId(data){
      return this.http.get(`${config.path_api}/documents/hello-get/${data.id}`);
    }
    createHello(data){
      return this.http.post(`${config.path_api}/documents/hello-create`,data);
    }
    updateHello(data){
      return this.http.put(`${config.path_api}/documents/hello-update/${data.id}`,data);
    }
    deleteHello(data){
      return this.http.delete(`${config.path_api}/documents/hello-delete/${data.id}`);
    }
}
