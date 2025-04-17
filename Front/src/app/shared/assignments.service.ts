import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  uri = 'http://localhost:8010/api/assignments';

  assignments:Assignment[] = [];

  constructor(private http: HttpClient) { }

  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}?page=${page}&limit=${limit}`);
  }

  getAssignment(_id:string):Observable<Assignment|undefined> {
    console.log("Service:getAssignment appelée avec id = " + _id);
    let URI = this.uri + '/' + _id;

    return this.http.get<Assignment>(URI);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    return this.http.post<string>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    return this.http.put<string>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    return this.http.delete<string>(this.uri + '/' + assignment._id);
  }
}
