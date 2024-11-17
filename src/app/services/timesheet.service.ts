import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:3000/timesheetEntries';

  constructor(private http: HttpClient) {}

  getEntries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEntry(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEntry(entry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entry);
  }

  updateEntry(id: number, entry: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, entry);
  }

  deleteEntry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}