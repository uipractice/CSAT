import { Component,OnInit } from '@angular/core';
import { SDLCService } from '../sdlc.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmpassword',
  templateUrl: './confirmpassword.component.html',
  styleUrls: ['./confirmpassword.component.scss']
})
export class ConfirmpasswordComponent implements OnInit {
  lblPasswordMessage : string = "";
  lblComformPasswordMessage : string = "";
  isPassowrdValid : boolean = true;
  isConformPasswordValid : boolean = true; 
  txtPassword : string = "";
  txtConformPAssword : string = "";
  passwordReqExp: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  encryptedEmailAddress : string = "";
  isValid : boolean = true;
  constructor(private sdlcService : SDLCService,private route: ActivatedRoute,private router : Router){
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
    this.encryptedEmailAddress = params['email']
    })
  }
  ResetPassword(){
if(this.txtPassword != this.txtConformPAssword){
  this.lblComformPasswordMessage = "Passowrd and Confirm password should match";
  this.isConformPasswordValid = false;
}
  else{
    this.lblComformPasswordMessage = "";
  this.isConformPasswordValid = true;
    this.sdlcService.conformPAssword(this.encryptedEmailAddress,this.txtPassword).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["/login-page"]);
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
ValidatePassword(){
 if(this.txtPassword != ""){
        if(this.txtPassword.length < 8){
        this.lblPasswordMessage = "Password must be at least 8 characters";
    this.isPassowrdValid = false;
    this.isValid = true;
        }
        else if(!this.isValidPassword(this.txtPassword)){
          this.lblPasswordMessage = "Password does't meet the criteria(Ex: Welc@123.....)";
    this.isPassowrdValid = false;
    this.isValid = true;
        }
        else{
          this.isValid = false;
          this.lblPasswordMessage = "";
      this.isPassowrdValid = true;
        }
      }
      else{
        this.isValid = true;
          this.lblPasswordMessage = "";
      this.isPassowrdValid = false;
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
}
