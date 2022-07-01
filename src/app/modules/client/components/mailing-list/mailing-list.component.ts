import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MailingListComponent implements OnInit {
  mailingForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
