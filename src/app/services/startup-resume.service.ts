import {Injectable} from '@angular/core';
import {Startup} from '../model/Startup';
import {Resume} from '../model/Resume';
import {Observable, throwError} from 'rxjs';
import {StartupResume} from '../model/StartupResume';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StartupResumeService {

  constructor(private http: HttpClient) {
  }

  sendResumeToStartup(resume: Resume, startup: Startup): Observable<StartupResume> {
    return this.http.post<StartupResume>('/api/startup-resume/',
      {resume: resume, startup: startup, accepted: false})
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  // rejectResume(resumeId: String): Observable<any> {
  //   return this.http.delete<any>('/api/startup-resume/reject-resume/' + resumeId)
  //     .pipe(catchError((error: any) => throwError(error.error)));
  // }
  //
  // acceptResume(startupResumeId: String, startupRole: String): Observable<StartupResume> {
  //   return this.http.put<StartupResume>('/api/startup-resume/accept-resume/' + startupResumeId, startupRole)
  //     .pipe(catchError((error: any) => throwError(error.error)));
  // }

}
