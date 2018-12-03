import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable()
export class GlobalStorageService {

  private storageSubject = new Subject<any>();



  public asObservable() {
    return this.storageSubject;
}

}
