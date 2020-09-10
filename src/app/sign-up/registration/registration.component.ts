import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {IRegisterRequest} from '../model/IRegisterRequest';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html'
})


export class RegistrationComponent implements OnInit {

  registerFormGroup: FormGroup;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private userService: UserService,
              private toastService: ToastrService,
              private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.createForm();
    if (this.authenticationService.getUser()) {
      this.router.navigate(['books']);
    }
  }

  createForm(): void {
    this.registerFormGroup = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    if (this.registerFormGroup.valid) {
      const registerRequest: IRegisterRequest = {
        firstName: this.registerFormGroup.get('firstName').value,
        lastName: this.registerFormGroup.get('lastName').value,
        email: this.registerFormGroup.get('email').value,
        password: this.registerFormGroup.get('password').value,
        userRole: 0
      };

      this.blockUI.start('Wait please...');

      this.userService.register(registerRequest).subscribe(() => {
        this.userService.registrationCompleted.next({
          completed: true,
          username: registerRequest.email,
          password: registerRequest.password
        });
        this.toastService.success('Registration completed! Enjoy your membership!');
        this.blockUI.stop();
      }, () => {
        this.toastService.error('Something went wrong while registering.');
        this.blockUI.stop();
      });
    }
  }
}
