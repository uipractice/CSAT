import { Component } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent {
  selectedEmoji: any = null;

  emojis = [
    { name: 'Happy', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-6h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm-1-4h2v2H7v-2zm8 0h2v2h-2v-2z' },
    { name: 'Neutral', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-7h8v2H8v-2zm1-4h2v2H9v-2zm4 0h2v2h-2v-2z' },
    { name: 'Sad', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-6H8v2h8v-2zm-2.5-4h2v2h-2v-2zm-5 0h2v2h-2v-2z' }
  ];


  selectEmoji(emoji: any) {
    this.selectedEmoji = emoji;
  }

  onSubmit() {
    console.log('Feedback submitted:', this.selectedEmoji);
  }
}
