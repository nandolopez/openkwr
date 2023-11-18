import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cleaner.page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cleaner.page.component.html',
  styleUrl: './cleaner.page.component.css',
})
export default class CleanerPageComponent {
  public textarea_dirt_keywords: string = '';
  public textarea_clean_keywords: string = '';
  public textarea_black_list: string = '';

  public step: number = 0;

  onClickButtonBigLongtail(): void {
    this.textarea_clean_keywords = this.textarea_dirt_keywords
      .split('\n')
      .filter((line) => line.split(' ').length <= 10)
      .join('\n');
    this.step++;
  }
  onClickButtonClearCharacters(): void {
    const regex = /[^a-zA-Z0-9ñÑ\s]/g;
    this.textarea_clean_keywords = this.textarea_clean_keywords.replace(
      regex,
      ''
    );
    this.step++;
  }

  onClickButtonReplaceAccents(): void {
    //a
    let regex = /[áäàâãåāăąǎǟǡǻȁȃȧ]/gi;
    this.textarea_clean_keywords = this.textarea_clean_keywords
      .split(regex)
      .join('a');
    //e
    regex = /[éëèêẽēĕąǝǟǡȅȇȩ]/gi;
    this.textarea_clean_keywords = this.textarea_clean_keywords
    .split(regex)
    .join('e');
    regex = /[íïìîĩīĭǐȉȋï]/gi;
    //i
    this.textarea_clean_keywords = this.textarea_clean_keywords
    .split(regex)
    .join('i');
    regex = /[óöòôõōŏǒǫǭǭȍȏȯ]/gi;
    //o
    this.textarea_clean_keywords = this.textarea_clean_keywords
    .split(regex)
    .join('o');
    regex = /[úüùûũūŭůǔǖǘǚǜȕȗ]/gi;
    //u
    this.textarea_clean_keywords = this.textarea_clean_keywords
      .split(regex)
      .join('u');

    this.step++;
  }

  onClickButtonRemoveDuplicates(): void {
    this.textarea_clean_keywords = [
      ...new Set(this.textarea_clean_keywords.split('\n')),
    ].join('\n');
    this.step++;
  }
  onClickButtonRemoveBlacklistedKeywords(): void {
    const BLACKLIST = this.textarea_black_list.split(', ');
    const TO_CLEAN_LIST = this.textarea_clean_keywords.split('\n');
    const TO_REMOVE: number[] = [];

    if (BLACKLIST[0] !== '') {
      TO_CLEAN_LIST.forEach((e: string, index) => {
        if (BLACKLIST.some((bl: string) => e.includes(bl))) {
          TO_REMOVE.push(index);
        }
      });

      TO_REMOVE.forEach((e) => TO_CLEAN_LIST.splice(e, 1));
      this.textarea_clean_keywords = TO_CLEAN_LIST.join('\n');
    }
  }

  onClickButtonCopy(): void {
    navigator.clipboard.writeText(this.textarea_clean_keywords);
  }

  onClickButtonReset(): void {
    this.textarea_dirt_keywords = '';
    this.textarea_clean_keywords = '';
    this.textarea_black_list = '';
    this.step = 0;
  }
}
