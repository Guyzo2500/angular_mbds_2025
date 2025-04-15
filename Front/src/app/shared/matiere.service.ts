// src/app/shared/services/matieres.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from './models/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  private url = 'http://localhost:8010/api/matieres';  // Votre URL de l'API

  constructor(private http: HttpClient) { }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }
}