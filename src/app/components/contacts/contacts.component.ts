import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {Contact} from '../../model/Contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contactService.getUserContacts(this.route.snapshot.paramMap.get('id'))
      .subscribe(contacts => this.contacts = contacts);
  }

  deleteContact(otherId: string): void {
    this.contactService.deleteUserContact(this.route.snapshot.paramMap.get('id'), otherId)
      .subscribe(message => console.log(message));
  }
}
