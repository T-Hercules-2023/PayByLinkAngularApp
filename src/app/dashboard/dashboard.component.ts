import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth-service';
import { Observable } from 'rxjs';
import User from 'src/models/registration-details';
import { DataService } from 'src/services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isLoggedIn$?: Observable<boolean>;
  user?: User;

  constructor(private authService: AuthService, private dataService: DataService) {
    let userJson = localStorage.getItem('user');
    if(userJson !== null){
      this.user = JSON.parse(userJson);
    }else if(this.dataService.loggedInUser){
      this.user = this.dataService.loggedInUser;
    }
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();                      // {3}
  }
}
