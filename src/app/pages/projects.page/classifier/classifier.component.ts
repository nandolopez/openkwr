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
   
    this.onResetInputSearch()
    this.onUpdateLocalhost();
  }

  onClickKeyword(id: number): void {
    this.KEYWORDS[id].selected = !this.KEYWORDS[id].selected;
    
    this.onUpdateLocalhost();
  }

  onClickButtonUndoLastAction(): void {
    if (this.last_action_deleted) {
      this.Trash.forEach((e: IKeyword) => {
        this.KEYWORDS.splice(e.id, 0, { ...e, selected: false });
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
    this.onUpdateLocalhost()
    this.onResetInputSearch()
  }

  /**
   * Event: on click button Remove
   * 1. Clear de Trash array for make the undo
   * 2. Get all selected keywords
   * 3. make abackup of keybords in Trash for recover it in case of do undo.
   * 4. Remove all selected keywords
   * 5. Reassign Ids to index position
   * 6. set last_action is deleted as true
   */
  onClickButtonRemoveKw(): void {
    //1. Clear de Trash array for make the undo
    this.Trash = [];

    //2. Get all selected keywords
    const checked = this.KEYWORDS.filter((e: IKeyword) => e.selected === true);

    //3. make abackup of keybords in Trash for recover it in case of do undo.
    this.Trash = [...checked];

    //4. Remove all selected keywords
    this.KEYWORDS = this.KEYWORDS.filter((e: IKeyword) => e.selected === false);

    //5. Reassign Ids to index position
    this.KEYWORDS.forEach(
      (e: IKeyword, index: number) => (this.KEYWORDS[index].id = index)
    );

    //6. set last_action is deleted as true

    // set all undo keywords as unselected
    this.Trash.forEach(
      (e: IKeyword, index: number) => (this.Trash[index].selected = false)
    );
    this.last_action_deleted = true;   
    this.onResetInputSearch()
    this.onUpdateLocalhost()
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

  onResetInputSearch(){
    this.KEYWORDS.forEach(
      (e: IKeyword, index: number) => (this.KEYWORDS[index].selected = false)
    );
    this.input_search_informational = '';
    this.input_search_transactional = '';
    this.input_search_unclassified = '';
  }

  onUpdateLocalhost(): void {
   
    localStorage.setItem('keywords', JSON.stringify(this.KEYWORDS));
  }

  onfindBy(input: string): IKeyword[] {
    return this.KEYWORDS.filter((e: IKeyword) => e.type === input);
  }
}
