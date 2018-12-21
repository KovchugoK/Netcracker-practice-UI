import {Injectable} from '@angular/core';
import {Resume} from '../model/Resume';
import {Skill} from '../model/Skill';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {BusinessRole} from '../model/BusinessRole';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeUrl = '/api/resume';

  constructor(private http: HttpClient) {
  }

  gerResumeList(): Observable<Resume[]> {
    const url = `${this.resumeUrl}/list`;
    return this.http.get<Resume[]>(url)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getResumeById(id: string): Observable<any> {
    return this.http.get('/api/resume/' + id);
  }


  deleteResume(id: string): Observable<any> {
    return this.http.delete('/api/resume/delete/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateResume(resume: Resume): Observable<any> {
    return this.http.put<Resume>('/api/resume/update/' + resume.id, resume)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  createResume(resume: Resume): Observable<any> {
    return this.http.post<Resume>('/api/resume/create/', resume)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>('/api/resume/skills');
  }

  getAllBusinessRole(): Observable<BusinessRole[]> {
    return this.http.get<BusinessRole[]>('/api/resume/businessRole');
  }

  getSpecialistsBusinessRole(): Observable<BusinessRole[]> {
    return this.http.get<BusinessRole[]>('/api/resume/specialists-business-role');
  }

  getMyResumeList(id: string): Observable<Resume[]> {
    return this.http.get<Resume[]>('/api/resume/my-resume-list/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }


}
