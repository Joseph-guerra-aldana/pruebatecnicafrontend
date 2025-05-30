import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
  
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }
  
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  updateTaskStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
