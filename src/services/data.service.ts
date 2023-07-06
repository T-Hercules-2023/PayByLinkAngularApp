import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from 'src/models/registration-details';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = "http://localhost:8080/api/users/";

  constructor(private httpClient: HttpClient) { }

  public loggedInUser?: User;

  public getLoginUser(){
    return this.loggedInUser;
  }

  public setLoginUser(user: User){
    this.loggedInUser = user;
  }

  public createUser(user: User) {
    return this.httpClient.post(this.URL + 'createUser', user);
  }

  public loginUser(user: User) {
    return this.httpClient.post(this.URL + "login", user);
  }

  public getUser(userId: string) {
    return this.httpClient.get(this.URL + `{userId}`);
  }

  public getUserByMobileNo(mobileNumber: number) {
    return this.httpClient.get(this.URL + mobileNumber);
  }
}
