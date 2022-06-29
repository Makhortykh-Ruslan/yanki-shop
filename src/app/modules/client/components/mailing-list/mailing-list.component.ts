import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MailingListComponent implements OnInit {
  mailingForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
