import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = 'http://localhost:8010/api/assignments';

  assignments:Assignment[] = [];

  constructor(private http:HttpClient) { }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    console.log("Service:getAssignments appelée !");

    const URI = this.backendURL + '?page=' + page + '&limit=' + limit;
    return this.http.get<Assignment[]>(URI);
  }

  getAssignment(_id:string):Observable<Assignment|undefined> {
    console.log("Service:getAssignment appelée avec id = " + _id);
    let URI = this.backendURL + '/' + _id;

    return this.http.get<Assignment>(URI);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    return this.http.post<string>(this.backendURL, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    return this.http.put<string>(this.backendURL, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    return this.http.delete<string>(this.backendURL + '/' + assignment._id);
  }
}
