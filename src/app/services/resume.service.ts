import {Injectable} from '@angular/core';
import {Resume} from '../model/Resume';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  getResumeById(id: string): Observable<Resume> {
    const url = `${this.resumeUrl}/${id}`;
    return this.http.get<Resume>(url);
  }
}
