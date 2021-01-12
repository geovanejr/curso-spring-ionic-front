import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient) {

  }

  authenticate(creds: CredenciaisDTO) {

    return this.http.post(
      `${API_CONFIG.baseURL}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}