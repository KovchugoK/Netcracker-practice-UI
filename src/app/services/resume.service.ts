import {Injectable} from '@angular/core';
import {Resume} from '../model/Resume';
import {Skill} from "../model/Skill"
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/internal/operators";
import {BusinessRole} from "../model/BusinessRole";
import {ResumeSkill} from "../model/ResumeSkill";

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
    ;
  }

  getResumeById(id: string): Observable<any> {
    return this.http.get('/api/resume/' + id);
  }


  deleteResume(id: string): Observable<any> {
    return this.http.delete('/api/resume/delete/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteResumeSkill(skill: Skill) {
    let params = new HttpParams();
    for (const key in skill) {
      const val = skill[key];
      if (val) {
        params = params.set(key, val);
      }
    }
    return this.http.delete('/api/resume/' + skill.id + '/delete/skill', {params: params});
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

}
