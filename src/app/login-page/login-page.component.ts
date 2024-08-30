import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from '../survey/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{
  public customerUserName : string = '';
  public isValid : boolean = true;

  ngOnInit(): void {
    localStorage.removeItem("CustomerUSerName");
  }
  // loginObj:any={
  //   username:'yogesh',
  //   password:''
  // }

  // login() {
    // Replace the following with your actual default usernames and passwords
    // const defaultUsers = [
    //   { username: 'Yogesh', password: 'Yogesh@123' },
    //   { username: 'Mourya', password: 'Mourya@123' },
    //   // Add more default users as needed
    // ];

    // Check if the entered credentials match any of the default users
    // const matchedUser = defaultUsers.find(user => user.username === this.username && user.password === this.password);

    // if (matchedUser) {
    //   alert('Login successful!');
    //    // You can replace this with your desired login logic
    // } else {
    //   alert('Invalid username or password');
    // }
    constructor(private snackbar:MatSnackBar, private apiserviceService : ApiserviceService,private  router: Router){
    }
//@Output() currentUserName = new EventEmitter<string>();
    onSubmit(form:any): void {
      this.customerUserName = form.value.username;
      const password = form.value.password;
      this.apiserviceService.validateUser(this.customerUserName,password)
      .subscribe(
        (data) => {
          if(data)
          {
          localStorage.setItem("CustomerUSerName",this.customerUserName);
          this.router.navigate(["/Menupage/feedback"]);
          }
          else
          this.isValid = data;
        },
        (error) => {
          this.isValid = false;
        }
      );

      // // Check static credentials (replace with your actual credentials)
      // if (username === 'Mourya' && password === 'Mourya@123') {
      //   // Successful login, you can redirect or perform other actions here
      //   console.log('Login successful!');
      //   this.snackbar.open("Login Succesfull","ok")
      // } else {
      //   // Failed login, display an error message or handle accordingly
      //   console.log('Invalid credentials');
      //   this.snackbar.open("Login Invalid","ok")

      // }


    }
    ForgotPassword(){
      this.router.navigate(["/forgotpassword"]);
    }
  }

