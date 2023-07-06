import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { ConfirmedValidator } from '../../services/ConfirmedValidator';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import User from 'src/models/registration-details';
import { AuthService } from 'src/services/auth-service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'Login To PayByLink';
  angForm: FormGroup;
  isLoggedIn$?: Observable<boolean>;
  isMobileNotExists = false;
  regDetails?: User;
  isIncorrectPassword = false;

  constructor(private fb: FormBuilder, private notificationService: NotificationService, private routeService: Router, private authService: AuthService, private dataService: DataService) {
    this.angForm = this.fb.group({
      mobileNumber: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.angForm.controls;
  }

  onSubmit() {
    this.regDetails = new User(this.angForm.value);
    console.log(JSON.stringify(this.regDetails));
    this.dataService.loginUser(this.regDetails).subscribe(res=>{
      this.authService.login(this.regDetails); // {2}
      let userData = res as User;
      this.dataService.setLoginUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      this.notificationService.showInfo("Success", "Login Successfully!!")
      this.angForm.reset();
      this.routeService.navigate(['/', 'dashboard']);
    }, err=>{
      console.log(JSON.stringify(err))
      if(err.error.text === "Incorrect Password!!"){
        this.isIncorrectPassword = true;
        return;
      }
      this.notificationService.showWarning("Something went wrong!!", "Login Failed")
    });
  }

  onKeypressEvent(event: any) {
    const pattern = /^[0-9]{10}$/;
    if(pattern.test(event.target.value)){
      this.dataService.getUserByMobileNo(event.target.value).subscribe((res) => {
        let value = res as number;
        
        if (value === 0) {
          this.isMobileNotExists = true;
        }else {
          this.isMobileNotExists = false;
        }
      }, (error) => {
          console.error(error);
      });
    }else {
      this.isMobileNotExists = false;
    }
  }


  onLogout(){
    this.authService.logout();                      // {3}
  }
}
