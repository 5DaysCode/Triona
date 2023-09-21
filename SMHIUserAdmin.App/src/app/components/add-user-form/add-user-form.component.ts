import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent {
  private _user: User | undefined;

  @Input() 
  set user(value: User | undefined) {
    this._user = value;
    this.updateFormWithUser();
  }
  
  get user(): User | undefined {
    return this._user;
  }

  @Output() userSubmit = new EventEmitter<any>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      City: ['', Validators.required],
      Role: ['', Validators.required],
      IsActive: [true], // defaulting to true for example
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userSubmit.emit(this.userForm.value);
      this.userForm.reset();
    }
  }

  private updateFormWithUser() {
    if (this._user) {
      this.userForm.patchValue({
        FirstName: this._user.firstName,
        LastName: this._user.lastName,
        City: this._user.city,
        Role: this._user.role,
        IsActive: this._user.isActive
      });
    }
  }
}
