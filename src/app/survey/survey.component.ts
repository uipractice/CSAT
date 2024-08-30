import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Surveyform } from './surveyformclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],

})

export class SurveyComponent implements OnInit {

  surveyBack: string = "Thank for your Feedback";
  saveSurvey: string = "Successfully Saved Survey";
  surveyFeed: boolean = false;
  saveSur: boolean = false;
  fields: any = [];
  showForm = true; // Initially show the feedback form
  showMessage = false; // Initially hide the message card
  successMessage: boolean = false;
  feedBackSubMessage = false;
  surveyData: any = [];
  surveyForm!: FormGroup;
  ProjectId!:string;
  formSubmitted = false;
  isFormSubmitted = false;
  QList: any;
  questionItems: any = [];
  projectName!: string;
  email!:string;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private ApiserviceService: ApiserviceService,private router: Router,private route: ActivatedRoute) 
  {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectName = atob(params['project']);
      console.log('Project Name:', this.projectName);
      this.email=atob(params['uid']);
      this.ProjectId=atob(params['id']);
      console.log(this.ProjectId);


      // Now you can use this.projectName in your component logic
    });
    this.email=this.email;
    this.projectName=this.projectName;

    this.formIntilization();
    this.surveyFeed = false;
    this.saveSur = false;
    //getting Questions from DB
    this.getWorkTypeQuestions(parseInt(this.ProjectId));
    //If data exist then selected values will show
    //this.getSurvey(3,'cpadakalla@evoketechnologies.com');
    this.getSurvey(parseInt(this.ProjectId),parseInt(this.email));
  }

  formIntilization(){
    this.surveyForm = this.fb.group({
      questions: this.fb.array([])
    });
  }
  prepareData() {
    this.formIntilization();
    this.fields = [];
    this.QList.forEach((item: any, index: number): void => {
      let ratingList: any = this.fb.array([]);
      let questionItem: any = { questionText: item.questionText }
      if (item.questionType == 'O') {
        let ratings: any = [];
        ratingList = this.fb.array([]);
        for (let i = 1; i <= 5; i++) {
          const rating = {
            value: i,
            isChecked: false,
            workTypeId: item.workTypeID
          }
          ratings.push(rating);
          ratingList?.push(this.fb.group({
            id: new FormControl('')
          }));
        }
        questionItem.radioList = ratings;
      }
      questionItem.type = item.questionType == 'O' ? 'radio' : 'text';
      questionItem.comment = '';
      questionItem.questionId = item.questionID;
      questionItem.workTypeId =item.workTypeID
      this.questionItems.push(questionItem);
      this.fields?.push(questionItem);
      this.questionForm?.push(
        new FormGroup({
          comment: new FormControl(''),
          ratings: ratingList,
          text: new FormControl(''),
          workTypeId: new FormControl(item.workTypeID),
          questionId: new FormControl(item.questionID)
        })
      );
    });
  }


  patchSurveyForm(data: any) {
    let formData: any = [];
    data.forEach((item: any, index: number): void => {
      let formItem: any = {};
      let ratings = [];
      for (let i = 1; i <= 5; i++) {
        const rating = {
          id: i == item.rating ? i : "",
        }
        ratings.push(rating);
      }
      if(item.rating != null)
      {
        formItem.comment = item.remarks;
      }
     else
     {
      formItem.text=item.remarks;
     }
      formItem.questionId = item.questionID;
      formItem.ratings = ratings;
     // formItem.text = item.questionValue;
      formItem.workTypeId = item.workTypeId;
      formData.push(formItem);
    });
    return formData;
  }

  get questionForm() {
    return this.surveyForm?.controls['questions'] as FormArray;
  }
  
  toggleCards() {
    this.showForm = !this.showForm;
    this.showMessage = !this.showMessage;
    //this.feedBackSubMessage=!this.feedBackSubMessage;
  }

  public getWorkTypeQuestions(ProjectId: number) {
    this.ApiserviceService.getWorkTypeQuestions(ProjectId).subscribe({
      next: (workTypeQuestions: any) => {
        console.log(workTypeQuestions);
        this.QList = workTypeQuestions;
        this.prepareData();
        console.log(this.questionItems);
      },
      error: (error: any) => { console.log(error) }
    })
  }
  public getSurvey(ProjectId: number,emailId:number) {
    this.ApiserviceService.getSurvey(ProjectId,emailId).subscribe({
      next: (data: any) => {
        console.log('data:', data);
        if (data) {
          if (data.find((e: any) => e.statusID == 1)) {
            let frmData: any = this.patchSurveyForm(data);
            this.questionForm.patchValue(frmData);
          }
          else if (data.find((e: any) => e.statusID == 2)) {
            this.showForm = !this.showForm;
            this.feedBackSubMessage = true
          }
          // else {
          //  this.surveyForm.reset();
          //  this.getWorkTypeQuestions(3);
          // }
        }
      },
      error: (error: any) => {
        console.error('Error fetching  data:', error);
      }
    })
  }
  radioSelect(p: number, c: number) {
    let parentControl: any = this.questionForm.controls[p];
    parentControl.controls.ratings.controls.forEach((subControl: any, index: Number) => {
      subControl.setValue({ id: index == c ? c : '' });
    })
  }
  fnSave(event: Event) {
    event.preventDefault();
    this.postSurvey(1);
  }
  submitSurvey() {
    this.comparisonValidator();
  this.postSurvey(2);
  }
 comparisonValidator() {
    for(let i=0;i<this.surveyForm.value.questions.length;i++)
    {
      const validForm = this.isQuestionValid(this.surveyForm.value.questions[i]);
      if(!validForm)
      {
        this.surveyForm.setErrors({ 'invalid': true });
       return false;
      }
    }
    this.surveyForm.setErrors(null);
    //this.surveyForm.updateValueAndValidity()
    return true;
}

isQuestionValid(element: any) {
  return (((element.text == null && element.ratings.length==0)||(element.text !=null && (element.ratings ==null || element.ratings.length == 0)) || (element.ratings.length > 0  
    && element.ratings.find((x: any) => x.id != null && x.id != '') !=null)));
}
  postSurvey(isSubmitted:number)
  {
    
    if (this.surveyForm.valid) {
      //this.getSurvey(1);
      // this.surveyData = this.surveyForm.value;
      if(isSubmitted==1)
      {
        this.saveSur = true;
        this.surveyFeed = false;
     //   this.formSubmitted = true;
      }
      else if(isSubmitted ==2)
      {
        this.formSubmitted = true;
        this.saveSur = false;
        this.surveyFeed = true;

      }
      this.surveyForm.value.isFormSubmitted = isSubmitted;
      const postObj = this.prepareDataModel(parseInt(this.email),parseInt(this.ProjectId));
      this.ApiserviceService.PostSurveydata(postObj).subscribe(
        (response) => {
          console.log('Data successfully sent to the server', response);
          this.showModal();
        },
        (error) => {
          console.error('Error occurred while sending data to the server', error);
        }
      )
    }
    else{
      this.formSubmitted = true;
    }

  }
  prepareDataModel(EmailId:number,ProjectId:number) {
    let surveyArray: any = [];
    this.surveyForm.value.questions.forEach((element: any) => {
      let surveyObj: any = {};
      
      if(element.ratings.length > 0)
      {
        surveyObj.Remarks = element.comment;
      }
      else
      {
        surveyObj.Remarks = element.text;
      }
      //surveyObj.Remarks=element.text;
      surveyObj.WorkTypeId = element.workTypeId;
      surveyObj.QuestionID = element.questionId;
      surveyObj.StatusID = this.surveyForm.value.isFormSubmitted;
      //surveyObj.questionValue = this.getQValue(element);
      surveyObj.Rating = element.ratings.length > 0 ? element.ratings.find((x: any) => x.id != null && x.id != '')?.id : null;
      surveyObj.EmailID=EmailId;
      surveyObj.ProjectID = ProjectId;
      surveyObj.CreatedDate = new Date();
      surveyArray.push(surveyObj);
    });
    return surveyArray;
  }
  getQValue(element: any) {
    return element.ratings.length > 0 ? element.ratings.find((x: any) => x.id != null && x.id != '')?.id?.toString() : element.text;
  }
  showModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  hideModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  resetForm() {
    this.formSubmitted = false;
    this.surveyForm.reset();
    this.getWorkTypeQuestions(3);
  }

  onOkButtonClick() {
    // Call both hideModal() and toggleCards()
    if (this.saveSur) {
      this.hideModal();
    }
    else if (this.surveyFeed) {
      this.hideModal();
      this.toggleCards();
    }
  }

  getFeedbackImage(index: number): string {
    switch (index) {
      case 0: return '../../assets/very_dissatisfied-default.jpg';
      case 1: return '../../assets/dissatisfied-default.jpg';
      case 2: return '../../assets/neutral-default.jpg';
      case 3: return '../../assets/satisfied-default.jpg';
      case 4: return '../../assets/very_satisfied-default.jpg';
      default: return '';
    }
  }
}
