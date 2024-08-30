import { Component } from '@angular/core';
import { SDLCService } from '../sdlc.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  errorMessage : string = "";
  isValid : boolean = true;
  txtEmailAddress : string = "";
  MailUpdate: string = "";
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  encryptedEmailAddress : string = "";
  isDisabled : boolean = false;
  constructor(private sdlcService : SDLCService){
  }
  ForgotSubmit(){
    this.isDisabled = true;
if(this.txtEmailAddress == ""){
this.errorMessage = "Please enter email address";
this.isValid = false;
this.isDisabled = false;
  }
  else if(!this.isValidEmail(this.txtEmailAddress)){
    this.errorMessage = "Invalid email address";
    this.isValid = false;
    this.isDisabled = false;
  }
  else{
    this.errorMessage = "";
    this.isValid = true;
    this.encryptedEmailAddress = btoa(this.txtEmailAddress);
    this.sdlcService.sendForgotEmail(this.encryptedEmailAddress).subscribe(
      (response) => {
        console.log(response);
          this.showModal();
          this.MailUpdate = response.message;
        this.txtEmailAddress = "";
        this.isDisabled = false;
      },
      (error) => {
        console.error(error);
        this.isDisabled = false;
      }
    );
  }
}
isValidEmail(email: string): boolean {
  return this.emailRegex.test(email);
}
ClearData(){
  this.errorMessage = "";
    this.isValid = true;
}
showModal() {
  const modal = document.getElementById('exampleModal');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
}

hideModal() {
  location.reload();
  const modal = document.getElementById('exampleModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}
onOkButtonClick() {
  this.hideModal();
}
}
