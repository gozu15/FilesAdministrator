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
}
