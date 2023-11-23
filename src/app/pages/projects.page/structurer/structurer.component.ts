import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IKeyword } from '../../../interfaces/IKeyword';
import { IURL } from '../../../interfaces/IURL';

@Component({
  selector: 'app-structurer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './structurer.component.html',
  styleUrl: './structurer.component.css',
})
export default class StructurerComponent implements OnInit {
  public blog_structure: boolean = false;
  public currentURLID = 0;

  public KEYWORDS: IKeyword[] = [];
  public STRUCTURE: IURL[] = [];

  public INPUT_SEARCH: string = '';
  public INPUT_NEW: string = '';

  get disableButtonAddKeywordToURL(): boolean {
    return !this.FilteredKeywords.some((e: IKeyword) => e.selected);
  }

  get type(): string {
    return this.blog_structure ? 'Informational' : 'Transactional';
  }

  get FilteredKeywords(): IKeyword[] {
    let result = this.KEYWORDS.filter(
      (e: IKeyword) => e.type === this.type && e.url === ''
    );

    if (this.INPUT_SEARCH !== '') {
      result = result.filter((e: IKeyword) =>
        e.keyword.includes(this.INPUT_SEARCH)
      );
    }
    return result;
  }

  get FilteredURLs(): IURL[] {
    return this.STRUCTURE.filter((e: IURL) => e.type === this.type);
  }

  get AssignedKeywords(): IKeyword[] {
    return this.KEYWORDS.filter(
      (e: IKeyword) => e.url === this.STRUCTURE[this.currentURLID].path
    );
  }

  ngOnInit(): void {
    this.KEYWORDS = JSON.parse(localStorage.getItem('keywords') || '');
    this.STRUCTURE = JSON.parse(localStorage.getItem('structure') || '');
  }

  onClickButtonAddURL(): void {
    const id = this.STRUCTURE.length;
    console.log(id);
    const url: IURL = {
      id: id,
      path: this.INPUT_NEW,
      type: this.type,
      volume: 0,
    };
    this.STRUCTURE.push(url);
    this.currentURLID = id;
    this.INPUT_NEW = '';
    this.onUpdateLocalhost();
  }
  onClickButtonAddKeywordToURL() {
    let volume = 0;
    this.FilteredKeywords.forEach((e: IKeyword) => {
      if (this.KEYWORDS[e.id].selected) {
        this.KEYWORDS[e.id].url = this.STRUCTURE[this.currentURLID].path;
        volume += e.volume;
      }
      this.KEYWORDS[e.id].selected = false;
    });
    this.INPUT_SEARCH = '';
    this.STRUCTURE[this.currentURLID].volume = this.AssignedKeywords.reduce(
      (sum: number, e: IKeyword) => sum + e.volume,
      0
    );
    this.onUpdateLocalhost();
  }

  onClickButtonMove(up: boolean = false) {
    //get index current object
    let INDEX = this.FilteredURLs.findIndex(
      (e: IURL) => e.id === this.currentURLID
    );
    //backup current object
    const ORIGIN = { ...this.FilteredURLs[INDEX] };

    let position = 1;
    up ? INDEX-- : INDEX++;

    const DESTINY = { ...this.FilteredURLs[INDEX] };

    this.STRUCTURE[ORIGIN.id] = { ...DESTINY };
    this.STRUCTURE[DESTINY.id] = { ...ORIGIN };

    this.currentURLID = DESTINY.id;

    this.STRUCTURE.forEach(
      (e: IURL, index: number) => (this.STRUCTURE[index].id = index)
    );
    this.onUpdateLocalhost();
  }

  onClickButtonRemoveKeywordFromURL(id: number): void {
    this.KEYWORDS[id].url = '';
    this.STRUCTURE[this.currentURLID].volume -= this.KEYWORDS[id].volume;
  }

  onClickButtonRemoveURL() {
    const INDEX = this.FilteredURLs.findIndex(
      (e: IURL) => e.id === this.currentURLID
    );

    this.AssignedKeywords.forEach(
      (e: IKeyword) => (this.KEYWORDS[e.id].url = '')
    );
    this.STRUCTURE.splice(this.currentURLID, 1);

    this.STRUCTURE.forEach(
      (e: IURL, index: number) => (this.STRUCTURE[index].id = index)
    );
    this.currentURLID = this.FilteredURLs[INDEX - 1].id;
    this.onUpdateLocalhost();
  }

  onClickToggleStructure(): void {
    this.blog_structure = !this.blog_structure;
    this.currentURLID = this.blog_structure ? 1 : 0;
  }

  onClickURL(id: number) {
    this.currentURLID = id;
    console.log(id);
  }

  onUpdateLocalhost(): void {
    if (this.currentURLID === 0) {
      this.STRUCTURE[1].path = this.STRUCTURE[0].path + '/blog';
    }
    localStorage.setItem('keywords', JSON.stringify(this.KEYWORDS));
    localStorage.setItem('structure', JSON.stringify(this.STRUCTURE));
  }
}
