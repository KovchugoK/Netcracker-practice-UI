import { Pipe, PipeTransform } from '@angular/core';
import {Account} from "../../../model/Account";
import * as moment from 'moment';


@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(account: Account): number{
    if(account) {
      return moment().diff(account.birthday, 'years');
    }
    return null;
  }
}
