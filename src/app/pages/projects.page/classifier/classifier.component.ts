import { IKeyword } from './../../../interfaces/IKeyword';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classifier.component.html',
  styleUrl: './classifier.component.css',
})
export default class ClassifierComponent implements OnInit {
  public input_search_unclassified: string = '';
  public input_search_transactional: string = '';
  public input_search_informational: string = '';

  public KEYWORDS: IKeyword[] = [];
  public Trash: IKeyword[] = [];
  public last_action_deleted: boolean = false;

  get unclassifiedKeywords(): IKeyword[] {
    let result = this.onfindBy('');
    if (this.input_search_unclassified !== '') {
      result = result.filter((e: IKeyword) =>
        e.keyword.includes(this.input_search_unclassified)
      );
    }
    return result;
  }
  get transactionaldKeywords(): IKeyword[] {
    let result = this.onfindBy('Transactional');
    if (this.input_search_transactional !== '') {
      result = result.filter((e: IKeyword) =>
        e.keyword.includes(this.input_search_transactional)
      );
    }
    return result;
  }
  get informationalKeywords(): IKeyword[] {
    let result = this.onfindBy('Informational');
    if (this.input_search_informational !== '') {
      result = result.filter((e: IKeyword) =>
        e.keyword.includes(this.input_search_informational)
      );
    }
    return result;
  }

  get disableRemoveButton() {
    return !this.KEYWORDS.some((e: IKeyword) => e.selected);
  }
  get disableTransactional() {
    return !this.KEYWORDS.some(
      (e: IKeyword) => e.selected && e.type !== 'Transactional'
    );
  }
  get disableInformational() {
    return !this.KEYWORDS.some(
      (e: IKeyword) => e.selected && e.type !== 'Informational'
    );
  }

  ngOnInit(): void {
    this.KEYWORDS = JSON.parse(localStorage.getItem('keywords') || '');
  }

  onClickButtonClassifyAs(type: string): void {
    this.Trash = [];
    this.KEYWORDS.forEach((e: IKeyword, index: number) => {
      if (e.selected) {
        this.Trash.push({ ...e });
        this.KEYWORDS[index].type = type;
        this.KEYWORDS[index].selected = false;
      }
    });
    this.input_search_unclassified = '';
    this.input_search_transactional = '';
    this.input_search_informational = '';
    this.KEYWORDS.forEach(
      (e: IKeyword, index: number) => (this.KEYWORDS[index].selected = false)
    );
    this.onUpdateLocalhost();
  }

  onClickKeyword(id: number): void {
    this.KEYWORDS[id].selected = !this.KEYWORDS[id].selected;
    this.onUpdateLocalhost();
  }

  onClickButtonUndoLastAction(): void {
    console.log(this.Trash)
    if (this.last_action_deleted) {
      this.Trash.forEach((e: IKeyword) => {
        this.KEYWORDS.splice(e.id, 0, {...e, selected: false});
        this.KEYWORDS.forEach(
          (e: IKeyword, index: number) => (this.KEYWORDS[index].id = index)
        );
      });
    } else {
      this.Trash.forEach((e: IKeyword) => {
        this.KEYWORDS[e.id].type = e.type;
      });
    }
    this.Trash = [];
    this.last_action_deleted = false;
  }

  onClickButtonRemoveKw(): void {
    this.Trash = [];
    const checked = this.KEYWORDS.filter((e: IKeyword) => e.selected);
    checked.forEach((e: IKeyword) => {
      this.Trash.push({ ...e });
      this.KEYWORDS.splice(e.id, 1);
    });
    this.KEYWORDS.forEach(
      (e: IKeyword, index: number) => (this.KEYWORDS[index].id = index)
    );
    this.last_action_deleted = true;
    console.log(this.Trash)
  }

  onInputSearch(): void {
    this.KEYWORDS.forEach(
      (e: IKeyword) => (this.KEYWORDS[e.id].selected = false)
    );
    if (this.input_search_informational !== '') {
      this.informationalKeywords.forEach(
        (e: IKeyword) => (this.KEYWORDS[e.id].selected = true)
      );
    }
    if (this.input_search_transactional !== '') {
      this.transactionaldKeywords.forEach(
        (e: IKeyword) => (this.KEYWORDS[e.id].selected = true)
      );
    }
    if (this.input_search_unclassified !== '') {
      this.unclassifiedKeywords.forEach(
        (e: IKeyword) => (this.KEYWORDS[e.id].selected = true)
      );
    }
  }

  onUpdateLocalhost(): void {
    localStorage.setItem('keywords', JSON.stringify(this.KEYWORDS));
  }

  onfindBy(input: string): IKeyword[] {
    return this.KEYWORDS.filter((e: IKeyword) => e.type === input);
  }
}
