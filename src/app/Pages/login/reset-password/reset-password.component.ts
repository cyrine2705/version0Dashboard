import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token: string;

  constructor(private route: ActivatedRoute, private passwordService: ResetPasswordService) { }

  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('ya rabi yatlaaa shih'+this.token);});
  }

  initForm() {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notMatched: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    console.log(this.token);
    const newPassword = this.resetForm.value.password;
    this.passwordService.updatePassword(this.token, newPassword).subscribe(
      (response) => {
        console.log(response);
      
      },
      (error) => {
        console.error(error);
      
      }
    );
  }
}
