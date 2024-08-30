import { Component, OnInit,Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { DataService } from '../data.service';
import { ApiserviceService } from '../survey/apiservice.service';
import { NumberInput } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fdbkfinal',
  templateUrl: './fdbkfinal.component.html',
  styleUrls: ['./fdbkfinal.component.scss']
})
export class FdbkfinalComponent implements OnInit {
  workType: any;
  progress: number = 0;
  questionnaires: any[] = [];
  currentQuestionIndex = 0;
  selectedRating: number | null = null;
  report: any[] = [];
  ratings: any;
  reportData: any[] =[];
  //showFirstDiv = true;
  showSecondDiv=false;
  surveyForm!: FormGroup;
  saveSur: boolean = false;
  surveyFeed: boolean = false;
  formSubmitted = false;
  email!:string;
  ProjectId!:string;
  QList: any;
  questionItems: any = [];
  fields: any = [];
  showForm = true;
  feedBackSubMessage = false;
isSelected : boolean = false;
projectName!:string;
feedBackSaveMessage = false;
isFeedBackSub=false;
isAdmin : boolean = false;
Thoughts : any;
radioRecet:any;
isSubmit : boolean = false;
isSave : boolean = false;
isReset : boolean = false;
isAdminReadOnly : boolean = false;
  constructor(private fb: FormBuilder,private ApiserviceService: ApiserviceService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
        this.projectName = atob(params['project']);
        localStorage.setItem('projectName',this.projectName)

     // this.projectName = atob(params['project']);
      console.log('Project Name:', this.projectName);
      this.email=atob(params['uid']);
      localStorage.setItem('email',this.email)
      this.ProjectId=atob(params['id']);
      localStorage.setItem('ProjectId',this.ProjectId)
      console.log(this.ProjectId);
      this.isAdmin =Boolean(atob(params['admin']));

    });

    this.projectName = this.projectName === '' || this.projectName==undefined ? localStorage.getItem('projectName') ?? this.projectName : this.projectName;
    this.email = this.email === '' || this.email==undefined ? localStorage.getItem('email') ?? this.email : this.email;
    this.ProjectId = this.ProjectId === '' || this.ProjectId== undefined ? localStorage.getItem('ProjectId') ?? this.ProjectId : this.ProjectId;
   this.formIntilization();

 // this.showSecondDiv=true;
  this.getWorkTypeQuestions(parseInt(this.ProjectId));

  }

  formIntilization(){
    this.surveyForm = this.fb.group({
      questions: this.fb.array([])
    });
  }
  public getWorkTypeQuestions(ProjectId: number) {
    this.ApiserviceService.getWorkTypeQuestions(ProjectId).subscribe({
      next: (workTypeQuestions: any) => {
        console.log(workTypeQuestions);
        this.QList = workTypeQuestions;
        this.prepareData();
        console.log(this.questionItems);
        console.log("SurveyForm",this.surveyForm);
        this.getSurvey(parseInt(this.ProjectId),parseInt(this.email));
      },
      error: (error: any) => { console.log(error) }
    });
  }
  public getSurvey(ProjectId: number,emailId:number) {
    this.ApiserviceService.getSurvey(ProjectId,emailId).subscribe({
      next: (data: any) => {
        console.log('data:', data);
        if (data.length>0) {
          if (data[0].statusId==1) {
            this.showSecondDiv=true;
            let frmData: any = this.patchSurveyForm(data);
            this.questionForm.patchValue(frmData);
          }
          else if (data[0].statusId ==2) {
            //this.showForm = !this.showForm;
            //this.feedBackSubMessage=true;
            if(this.isAdmin){
            let frmData: any = this.patchSurveyForm(data);
            this.questionForm.patchValue(frmData);
            this.showSecondDiv=true;
            this.isFeedBackSub=false;
            this.isSubmit = true;
            this.isSave = true;
            this.isReset= true;
            this.isAdminReadOnly = true;
            }
            else{
              this.showForm = !this.showForm;
              this.showSecondDiv=false;
            this.isFeedBackSub=true;
            this.isSubmit = false;
            this.isSave = false;
            this.isReset= false;
            this.isAdminReadOnly = false;
            }
          }
          else
          {
            this.showSecondDiv=true;
          }

        }
        else
        {
          this.showSecondDiv=true;
        }
      },
      error: (error: any) => {
        console.error('Error fetching  data:', error);
      }
    })
  }
  fnSave(event:Event){
    event.preventDefault();
    this.postSurvey(1);
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
            workTypeId: item.workTypeId
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
      questionItem.questionId = item.questionId;
      questionItem.workTypeId =item.workTypeId;
      this.questionItems.push(questionItem);
      this.fields?.push(questionItem);
      this.questionForm?.push(
        new FormGroup({
          comment: new FormControl(''),
          ratings: ratingList,
          text: new FormControl(''),
          workTypeId: new FormControl(item.workTypeId),
          questionId: new FormControl(item.questionId)
        })
      );
    });
  }
  get questionForm() {
    return this.surveyForm?.controls['questions'] as FormArray;
  }
  getFeedbackImage(p: number, c : number): string {
    let parentControl: any = this.questionForm.controls[p];
    let istouch:boolean =false;
     parentControl.controls.ratings.controls.filter(function(x:any,i:number) {
        if(x.value['id']!= '' && x.value['id'] !=null && i == c)
        {
           istouch = true;
        }
    });

    switch (c) {
      case 0: return istouch ? '../../assets/very_dissatisfied_filled.svg' : '../../assets/very_dissatisfied.svg';
      case 1: return istouch ? '../../assets/dissatisfied_filled.svg' : '../../assets/dissatisfied.svg';
      case 2: return istouch ? '../../assets/neurtal_filled.svg' : '../../assets/neurtal.svg';
      case 3: return istouch ? '../../assets/satisfied_filled.svg' : '../../assets/satisfied.svg';
      case 4: return istouch ? '../../assets/very_satisfied_filled.svg' : '../../assets/very_satisfied.svg';
      default: return '';
    }
  }
  resetForm(event:Event){
    event.preventDefault();
    this.formSubmitted = false;
    this.Thoughts ="";
    this.radioRecet = 0;
    let parentControl: any = this.questionForm.controls;
    parentControl.forEach((subControl: any, index: Number) => {
      subControl.controls.ratings.controls.forEach((ratedValueControl: any, index1: Number) => {
        subControl.controls.comment.setValue("");
        if(ratedValueControl.value.id != "")
        ratedValueControl.setValue({id : index1 == index1 ? "" : ""});
      })
      subControl.controls.text.setValue("");
    })
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
      formItem.questionId = item.questionId;
      formItem.ratings = ratings;
     // formItem.text = item.questionValue;
      formItem.workTypeId = item.workTypeId;
      formData.push(formItem);
    });
    return formData;
  }
  submitSurvey() {
  this.comparisonValidator();
  this.postSurvey(2);
  }
  comparisonValidator() {
    if(this.surveyForm.value.questions.length > 0)
    {
      const validForm = this.isQuestionValid();
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
postSurvey(isSubmitted:number)
{

    //this.getSurvey(1);
    // this.surveyData = this.surveyForm.value;
    if(isSubmitted==1)
    {
      this.saveSur = true;
      this.surveyFeed = false;
      this.feedBackSaveMessage = true;
      this.surveyForm.value.isFormSubmitted = isSubmitted;
      const postObj = this.prepareDataModel(parseInt(this.email),parseInt(this.ProjectId));
      this.ApiserviceService.PostSurveydata(postObj).subscribe(
        (response) => {
          console.log('Data successfully sent to the server', response);
          this.showModal();
         // this.showFirstDiv = false;
          this.showSecondDiv = false;
        },
        (error) => {
          console.error('Error occurred while sending data to the server', error);
        }
      )
    }
    else if(isSubmitted ==2)
    {
      if (this.surveyForm.valid) {
      this.formSubmitted = true;
      this.saveSur = false;
      this.surveyFeed = true;
      this.feedBackSubMessage = true


    this.surveyForm.value.isFormSubmitted = isSubmitted;
    const postObj = this.prepareDataModel(parseInt(this.email),parseInt(this.ProjectId));
    this.ApiserviceService.PostSurveydata(postObj).subscribe(
      (response) => {
        console.log('Data successfully sent to the server', response);
        this.showModal();
       // this.showFirstDiv = false;
        this.showSecondDiv = false;
      },
      (error) => {
        console.error('Error occurred while sending data to the server', error);
      }
    )
      }
    else {
      this.formSubmitted = true;
    }
  }
}
isQuestionValid() {
  let isValid = true;
  // return (((element.text == null && element.ratings.length==0)||(element.text !=null && (element.ratings ==null || element.ratings.length == 0)) || (element.ratings.length > 0
  //   && element.ratings.find((x: any) => x.id != null && x.id != '') !=null)));
  for(let i=0;i<this.surveyForm.value.questions.length;i++)
    {
      let ratingIsvalid = true;
      let element = this.surveyForm.value.questions[i];
  let currentRating =0;
  if(element.ratings.length > 0){
    element.ratings.forEach((anyratingElement: any) => {
      if(anyratingElement.id != ""){
        currentRating = anyratingElement.id;
        return;
      }
    });
    let currentComment = element.ratings.length > 0 ? element.comment : "";
    if(currentRating != 0 && (currentRating <= 3 && currentComment == ""))
      {
        const thoughtsModel = document.getElementById('txtRadioShareYourThought_'+i);
        if (thoughtsModel)
          thoughtsModel.style.borderColor = 'red';
        ratingIsvalid = isValid = false;
      }
      else{
        const thoughtsModel = document.getElementById('txtRadioShareYourThought_'+i);
        if (thoughtsModel)
          thoughtsModel.style.borderColor = '';
      }
  }
  else{
  if(ratingIsvalid && element.ratings.length==0 && element.text ==''){
    const thoughtsModel = document.getElementById('txtareaRadioShareYourThought_'+i);
    if (thoughtsModel)
      thoughtsModel.style.borderColor = 'red';
      isValid = false;
  }
  else if (ratingIsvalid && element.ratings.length==0){
    const thoughtsModel = document.getElementById('txtareaRadioShareYourThought_'+i);
    if (thoughtsModel)
      thoughtsModel.style.borderColor = '';
  }
}
}
return isValid;
}

showModal() {
  const modal = document.getElementById('content4');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
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

  // continue(): void {
  //   this.router.navigate([], {
  //     queryParamsHandling: 'merge' // Preserve existing parameters
  //   });
  //   //this.showFirstDiv = false;
  //   this.surveyFeed = false;
  //   this.saveSur = false;
  //   this.showSecondDiv=true;
  //   //getting Questions from DB
  //   this.getWorkTypeQuestions(parseInt(this.ProjectId));
  //   this.getSurvey(parseInt(this.ProjectId),parseInt(this.email));
  // }

  showQuestion(index: number): void {


  }

  selectRating(rating: number): void {
    this.ratings[this.currentQuestionIndex] = rating;
    this.showNextQuestion();
  }
  submitRating(): void {
    // Save the rating for the current question
    // You may want to send this data to the server or store it in a local array

    // Move to the next question
    this.currentQuestionIndex++;

    // Clear the selected rating for the next question
    this.selectedRating = null;
  }



  showNextQuestion(): void {
    if (this.currentQuestionIndex < this.questionnaires.length - 1) {
      this.currentQuestionIndex++;
      this.showQuestion(this.currentQuestionIndex);
    } else {
      // Handle end of questionnaires (e.g., show a message or navigate to another page)
    }
  }

  showPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showQuestion(this.currentQuestionIndex);
    } else {
      // Handle beginning of questionnaires (e.g., show a message or disable back button)
    }
  }


  generateReport(): void {
    // Store ratings in the reportData array
    this.reportData = [...this.ratings];
    console.log('Report Data:', this.reportData);

    // Optionally, you can send the reportData to the server or perform other actions
  }
  radioSelect(p: number, c: number) {
    if(!this.isAdminReadOnly){
    let parentControl: any = this.questionForm.controls[p];
    parentControl.controls.ratings.controls.forEach((subControl: any, index: Number) => {
      subControl.setValue({ id: index == c ? c : '' });
    })
  }
}
  isRadioSelected(index: number): boolean {
    const parentControl: any = this.questionForm.controls[index];
    const isAnyRadioSelected = parentControl.controls.ratings.value.some((radio: any) => radio.id !== '');
  return !isAnyRadioSelected;
  }
  // viewdata(): void {
  //   this.dataService.getSomeData().subscribe(
  //     (data: any) => {
  //       if (data) {
  //         console.log('View Data:', data);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  // loadData(): void {
  //   this.dataService.getSomeData().subscribe(
  //     (data) => {
  //       // Handle successful response
  //       console.log('Loaded Data:', data);
  //       this.questionnaires = data;
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error loading data:', error);
  //     }
  //   );
  // }



}
