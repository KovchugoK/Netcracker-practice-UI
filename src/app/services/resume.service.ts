import {Injectable} from '@angular/core';
import {Resume} from '../model/Resume';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeUrl = '/api/resume';

  constructor(private http: HttpClient) {
  }

  gerResumeList(): Observable<Resume[]> {
    const url = `${this.resumeUrl}/list`;
    return this.http.get<Resume[]>(url);
  }

  getResumeById(id: string): Observable<any> {
    return this.http.get('/api/resume/' + id);
  }

  deleteResume(id: string): Observable<any> {
    return this.http.delete(`${this.resumeUrl}/delete/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateResume(id: string, resume: Resume): Observable<any> {
    return this.http.put('/api/resume/update/' + id, resume);
  }

  createResume(resume: Resume): Observable<any> {
    return this.http.post<Resume>('/api/resume/create/', resume)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
