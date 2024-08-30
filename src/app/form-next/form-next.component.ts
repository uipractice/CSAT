import { Component } from '@angular/core';

@Component({
  selector: 'app-form-next',
  templateUrl: './form-next.component.html',
  styleUrls: ['./form-next.component.scss']
})
export class FormNextComponent {
  projectName : string = "PD Instore";

  currentQuestion = 0;
  progress = 0;

  questions = [
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    },
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    },
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    },
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    },
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    },
    {
      text: 'How satisfied are you with our service?',
      selectedEmoji: null,
      comment: '',
      emojis: [
        { name: 'Very Satisfied', src: 'assets/very_satisfied-default.svg', hoverSrc: 'assets/very_satisfied-hover.svg' },
        { name: 'Satisfied', src: 'assets/satisfied-default.svg', hoverSrc: 'assets/satisfied-hover.svg' },
        { name: 'Neutral', src: 'assets/neutral-default.svg', hoverSrc: 'assets/neutral-hover.svg' },
        { name: 'Dissatisfied', src: 'assets/dissatisfied-default.svg', hoverSrc: 'assets/dissatisfied-hover.svg' },
        { name: 'Very Dissatisfied', src: 'assets/very_dissatisfied-default.svg', hoverSrc: 'assets/very_dissatisfied-hover.svg' },
      ]
    }
    // Add more questions as needed
  ];

  selectEmoji(questionIndex: number, emoji: any) {
    this.questions[questionIndex].selectedEmoji = emoji;

    // Update the selected emoji to show the filled version
    this.questions[questionIndex].emojis.forEach(e => {
      e.src = e === emoji ? e.hoverSrc : e.src.replace('-hover', '-default');
    });

    this.updateProgress();
  }

  hoverEmoji(questionIndex: number, emoji: any) {
    if (this.questions[questionIndex].selectedEmoji !== emoji) {
      emoji.src = emoji.hoverSrc;
    }
  }

  unhoverEmoji(questionIndex: number, emoji: any) {
    if (this.questions[questionIndex].selectedEmoji !== emoji) {
      emoji.src = emoji.hoverSrc.replace('-hover', '-default');
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  resetForm() {
    this.questions.forEach(question => {
      question.selectedEmoji = null;
      question.comment = '';
      question.emojis.forEach(emoji => {
        emoji.src = emoji.src.replace('-hover', '-default');
      });
    });
    this.currentQuestion = 0;
    this.progress = 0;
  }

  saveForm() {
    // Save the form data to local storage
    localStorage.setItem('feedbackForm', JSON.stringify(this.questions));
    console.log('Form saved to local storage:', this.questions);
  }

  onSubmit() {
    if (this.isFormComplete()) {
      // Save to local storage
      this.saveForm();
      console.log('Form submitted:', this.questions);
      // Implement submission logic (e.g., send data to server)
    }
  }

  isFormComplete() {
    return this.questions.every(question => question.selectedEmoji !== null && question.comment !== '');
  }

  updateProgress() {
    const answeredQuestions = this.questions.filter(question => question.selectedEmoji !== null && question.comment !== '').length;
    this.progress = (answeredQuestions / this.questions.length) * 100;
  }
}
