import { Component,OnInit } from '@angular/core';
import { SDLCService } from '../sdlc.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  lblNewPasswordMessage : string = "";
  lblOldPasswordMessage : string = "";
  lblComformPasswordMessage : string = "";
  isNewPassowrdValid : boolean = true;
  isConformPasswordValid : boolean = true; 
  isOldPasswordValid : boolean = true; 
  txtNewPassword : string = "";
  txtOldPassword : string = "";
  txtConformPAssword : string = "";
  passwordReqExp: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  loggedInUserName : string = "";
  isValid : boolean = true;
  constructor(private sdlcService : SDLCService,private route: ActivatedRoute,private router : Router){
  }
  ngOnInit(): void {
    this.loggedInUserName = JSON.parse(localStorage.getItem("CustomerUSerName")!);
  }
  ResetPassword(){
if(this.txtNewPassword != this.txtConformPAssword){
  this.lblComformPasswordMessage = "New passowrd and Confirm password should match";
  this.isConformPasswordValid = false;
}
  else{
    this.lblComformPasswordMessage = "";
  this.isConformPasswordValid = true;
    this.sdlcService.resetPassword(this.loggedInUserName,this.txtOldPassword,this.txtNewPassword).subscribe(
      (response) => {
        console.log(response);
        this.txtOldPassword = "";
        this.txtNewPassword = "";
        this.txtConformPAssword = "";
        this.lblComformPasswordMessage = "";
        this.lblNewPasswordMessage = "";
        this.lblOldPasswordMessage = "";
        this.isOldPasswordValid = true;
        this.isNewPassowrdValid = true;
        this.isConformPasswordValid = true;
        this.isValid = true;
        alert("Password updated successfully.");
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
isValidPassword(password: string): boolean {
  return this.passwordReqExp.test(password);
}
ValidateNewPassword(){
 if(this.txtNewPassword != ""){
        if(this.txtNewPassword.length < 8){
        this.lblNewPasswordMessage = "New password must be at least 8 characters";
    this.isNewPassowrdValid = false;
    this.isValid = true;
        }
        else if(!this.isValidPassword(this.txtNewPassword)){
          this.lblNewPasswordMessage = "Password does't meet the criteria(Ex: Welc@123.....)";
    this.isNewPassowrdValid = false;
    this.isValid = true;
        }
        else{
          this.isValid = false;
          this.lblNewPasswordMessage = "";
      this.isNewPassowrdValid = true;
        }
      }
      else{
        this.isValid = true;
          this.lblNewPasswordMessage = "";
      this.isNewPassowrdValid = false;
      }
      
}
ValidateConformPassword(){
   if(this.txtConformPAssword != ""){
        if(this.txtConformPAssword.length < 8){
        this.lblComformPasswordMessage = "Confirm password must be at least 8 characters";
    this.isConformPasswordValid = false;
    this.isValid = true;
        }
        else if(!this.isValidPassword(this.txtConformPAssword)){
          this.lblComformPasswordMessage = "Confirm password does't meet the criteria(Ex: Welc@123.....)";
    this.isConformPasswordValid = false;
    this.isValid = true;
        }
        else{
          this.isValid = false;
          this.lblComformPasswordMessage = "";
      this.isConformPasswordValid = true;
        }
      }
      else{
        this.isValid = true;
          this.lblComformPasswordMessage = "";
      this.isConformPasswordValid = false;
      }
}
ValidateOldPassword(){
  if(this.txtOldPassword != ""){
       if(this.txtOldPassword.length < 8){
       this.lblOldPasswordMessage = "Old password must be at least 8 characters";
   this.isOldPasswordValid = false;
   this.isValid = true;
       }
       else if(!this.isValidPassword(this.txtOldPassword)){
         this.lblOldPasswordMessage = "Old password does't meet the criteria(Ex: Welc@123.....)";
   this.isOldPasswordValid = false;
   this.isValid = true;
       }
       else{
         this.isValid = false;
         this.lblOldPasswordMessage = "";
     this.isOldPasswordValid = true;
       }
     }
     else{
       this.isValid = true;
         this.lblOldPasswordMessage = "";
     this.isOldPasswordValid = false;
     }
}
}
