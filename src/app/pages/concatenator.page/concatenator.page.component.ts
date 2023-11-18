import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-concatenator.page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './concatenator.page.component.html',
  styleUrl: './concatenator.page.component.css',
})
export default class ConcatenatorPageComponent {
  //TEXTAREA OF MAIN KEYWORDS
  public textarea_main: string = 'KW';

  //CLASSIFICATION A INPUTS
  public input_text_A: string = 'A';
  public textarea_A: string = 'a';

  //CLASSIFICATION B INPUTS
  public input_checkbox_B: boolean = true;
  public input_text_B: string = 'B';
  public textarea_B: string = 'b';

  //CLASSIFICATION C INPUTS
  public input_checkbox_C: boolean = true;
  public input_text_C: string = 'C';
  public textarea_C: string = 'C';

  //STATUS TEXT
  public text_status_indicator: string = '';

  //TEXTAREA WITH ALL KEYWORDS COMBINATIONS
  public textarea_results: string = '';

  //2 KEYWORDS COMBINATION
  public KA: boolean = false;
  public AK: boolean = false;
  public KB: boolean = false;
  public BK: boolean = false;
  public KC: boolean = false;
  public CK: boolean = false;

  //3 KEYWORDS COMBINATION
  public KAB: boolean = false;
  public KBA: boolean = false;
  public AKB: boolean = false;
  public ABK: boolean = false;
  public BKA: boolean = false;
  public BAK: boolean = false;
  public KAC: boolean = false;
  public KCA: boolean = false;
  public AKC: boolean = false;
  public ACK: boolean = false;
  public CKA: boolean = false;
  public CAK: boolean = false;
  public KCB: boolean = false;
  public KBC: boolean = false;
  public CKB: boolean = false;
  public CBK: boolean = false;
  public BKC: boolean = false;
  public BCK: boolean = false;

  //4 KEYWORDS COMBINATION
  public KABC: boolean = false;
  public KACB: boolean = false;
  public KBAC: boolean = false;
  public KBCA: boolean = false;
  public KCAB: boolean = false;
  public KCBA: boolean = false;
  public AKCB: boolean = false;
  public AKBC: boolean = false;
  public ABCK: boolean = false;
  public ABKC: boolean = false;
  public ACBK: boolean = false;
  public ACKB: boolean = false;
  public BKAC: boolean = false;
  public BKCA: boolean = false;
  public BAKC: boolean = false;
  public BACK: boolean = false;
  public BCKA: boolean = false;
  public BCAK: boolean = false;
  public CKBA: boolean = false;
  public CKAB: boolean = false;
  public CABK: boolean = false;
  public CAKB: boolean = false;
  public CBAK: boolean = false;
  public CBKA: boolean = false;

  // textarea of main keywords made array separated by backspace
  get K_ARRAY() {
    return this.textarea_main.split('\n');
  }
  // textarea of classification A keywords made array separated by backspace
  get A_ARRAY() {
    return this.textarea_A.split('\n');
  }
  // textarea of classification B keywords made array separated by backspace
  get B_ARRAY() {
    return this.textarea_B.split('\n');
  }
  // textarea of classification C keywords made array separated by backspace
  get C_ARRAY() {
    return this.textarea_C.split('\n');
  }

  //Combine 2 word
  public combineTwo(a: string[], b: string[]): void {
    a.forEach((ea: string) => {
      b.forEach((eb: string) => {
        this.textarea_results += ea + ' ' + eb + '\n';
      });
    });
  }

  //Combine 3 word
  public combineThree(a: string[], b: string[], c: string[]): void {
    a.forEach((ea: string) => {
      b.forEach((eb: string) => {
        c.forEach((ec: string) => {
          this.textarea_results += ea + ' ' + eb + ' ' + ec + '\n';
        });
      });
    });
  }

  //Combine 4 word
  public combineFour(a: string[], b: string[], c: string[], d: string[]): void {
    a.forEach((ea: string) => {
      b.forEach((eb: string) => {
        c.forEach((ec: string) => {
          d.forEach((ed: string) => {
            this.textarea_results += ea + ' ' + eb + ' ' + ec + ' ' + ed + '\n';
          });
        });
      });
    });
  }

  //Select all checkboxes
  public onClickButtonSelectAll(): void {
    //2 KEYWORDS COMBINATION
    this.KA = true;
    this.AK = true;
    this.KB = true;
    this.BK = true;
    this.KC = true;
    this.CK = true;

    if (this.input_checkbox_B) {
      //3 KEYWORDS COMBINATION
      this.KAB = true;
      this.KBA = true;
      this.AKB = true;
      this.ABK = true;
      this.BKA = true;
      this.BAK = true;
      this.KAC = true;
      this.KCA = true;
      this.AKC = true;
      this.ACK = true;
      this.CKA = true;
      this.CAK = true;
      this.KCB = true;
      this.KBC = true;
      this.CKB = true;
      this.CBK = true;
      this.BKC = true;
      this.BCK = true;
    } else {
      this.KAB = false;
      this.KBA = false;
      this.AKB = false;
      this.ABK = false;
      this.BKA = false;
      this.BAK = false;
      this.KAC = false;
      this.KCA = false;
      this.AKC = false;
      this.ACK = false;
      this.CKA = false;
      this.CAK = false;
      this.KCB = false;
      this.KBC = false;
      this.CKB = false;
      this.CBK = false;
      this.BKC = false;
      this.BCK = false;
    }

    if (this.input_checkbox_C) {
      //4 KEYWORDS COMBINATION
      this.KABC = true;
      this.KACB = true;
      this.KBAC = true;
      this.KBCA = true;
      this.KCAB = true;
      this.KCBA = true;
      this.AKCB = true;
      this.AKBC = true;
      this.ABCK = true;
      this.ABKC = true;
      this.ACBK = true;
      this.ACKB = true;
      this.BKAC = true;
      this.BKCA = true;
      this.BAKC = true;
      this.BACK = true;
      this.BCKA = true;
      this.BCAK = true;
      this.CKBA = true;
      this.CKAB = true;
      this.CABK = true;
      this.CAKB = true;
      this.CBAK = true;
      this.CBKA = true;
    } else {
      this.KABC = false;
      this.KACB = false;
      this.KBAC = false;
      this.KBCA = false;
      this.KCAB = false;
      this.KCBA = false;
      this.AKCB = false;
      this.AKBC = false;
      this.ABCK = false;
      this.ABKC = false;
      this.ACBK = false;
      this.ACKB = false;
      this.BKAC = false;
      this.BKCA = false;
      this.BAKC = false;
      this.BACK = false;
      this.BCKA = false;
      this.BCAK = false;
      this.CKBA = false;
      this.CKAB = false;
      this.CABK = false;
      this.CAKB = false;
      this.CBAK = false;
      this.CBKA = false;
    }
  }
  public onClickButtonUnSelectAll(): void {
    //2 KEYWORDS COMBINATION
    this.KA = false;
    this.AK = false;
    this.KB = false;
    this.BK = false;
    this.KC = false;
    this.CK = false;

    //3 KEYWORDS COMBINATION
    this.KAB = false;
    this.KBA = false;
    this.AKB = false;
    this.ABK = false;
    this.BKA = false;
    this.BAK = false;
    this.KAC = false;
    this.KCA = false;
    this.AKC = false;
    this.ACK = false;
    this.CKA = false;
    this.CAK = false;
    this.KCB = false;
    this.KBC = false;
    this.CKB = false;
    this.CBK = false;
    this.BKC = false;
    this.BCK = false;

    //4 KEYWORDS COMBINATION
    this.KABC = false;
    this.KACB = false;
    this.KBAC = false;
    this.KBCA = false;
    this.KCAB = false;
    this.KCBA = false;
    this.AKCB = false;
    this.AKBC = false;
    this.ABCK = false;
    this.ABKC = false;
    this.ACBK = false;
    this.ACKB = false;
    this.BKAC = false;
    this.BKCA = false;
    this.BAKC = false;
    this.BACK = false;
    this.BCKA = false;
    this.BCAK = false;
    this.CKBA = false;
    this.CKAB = false;
    this.CABK = false;
    this.CAKB = false;
    this.CBAK = false;
    this.CBKA = false;
  }

  onClickButtonCopy(): void {
    navigator.clipboard.writeText(this.textarea_results);
  }

  onClickButtonGenerate(): void {
    this.textarea_results = '';
    this.text_status_indicator = 'Generating combinations of 2 keywrods';
    if (this.KA) this.combineTwo(this.K_ARRAY, this.A_ARRAY);
    if (this.AK) this.combineTwo(this.A_ARRAY, this.K_ARRAY);
    if (this.KB) this.combineTwo(this.K_ARRAY, this.B_ARRAY);
    if (this.BK) this.combineTwo(this.B_ARRAY, this.K_ARRAY);
    if (this.KC) this.combineTwo(this.K_ARRAY, this.C_ARRAY);
    if (this.CK) this.combineTwo(this.C_ARRAY, this.K_ARRAY);

    if (this.input_checkbox_B || this.input_checkbox_C) {
      this.text_status_indicator = 'Generating combinations of 3 keywords';
      if (this.KAB) this.combineThree(this.K_ARRAY, this.A_ARRAY, this.B_ARRAY);
      if (this.KBA) this.combineThree(this.K_ARRAY, this.B_ARRAY, this.A_ARRAY);
      if (this.AKB) this.combineThree(this.A_ARRAY, this.K_ARRAY, this.B_ARRAY);
      if (this.ABK) this.combineThree(this.A_ARRAY, this.B_ARRAY, this.K_ARRAY);
      if (this.BKA) this.combineThree(this.B_ARRAY, this.K_ARRAY, this.A_ARRAY);
      if (this.BAK) this.combineThree(this.B_ARRAY, this.A_ARRAY, this.K_ARRAY);
      if (this.KAC) this.combineThree(this.K_ARRAY, this.A_ARRAY, this.C_ARRAY);
      if (this.KCA) this.combineThree(this.K_ARRAY, this.C_ARRAY, this.A_ARRAY);
      if (this.AKC) this.combineThree(this.A_ARRAY, this.K_ARRAY, this.C_ARRAY);
      if (this.ACK) this.combineThree(this.A_ARRAY, this.C_ARRAY, this.K_ARRAY);
      if (this.CKA) this.combineThree(this.C_ARRAY, this.K_ARRAY, this.A_ARRAY);
      if (this.CAK) this.combineThree(this.C_ARRAY, this.A_ARRAY, this.K_ARRAY);
      if (this.KCB) this.combineThree(this.K_ARRAY, this.C_ARRAY, this.B_ARRAY);
      if (this.KBC) this.combineThree(this.K_ARRAY, this.B_ARRAY, this.C_ARRAY);
      if (this.CKB) this.combineThree(this.C_ARRAY, this.K_ARRAY, this.B_ARRAY);
      if (this.CBK) this.combineThree(this.C_ARRAY, this.B_ARRAY, this.K_ARRAY);
      if (this.BKC) this.combineThree(this.B_ARRAY, this.K_ARRAY, this.C_ARRAY);
      if (this.BCK) this.combineThree(this.B_ARRAY, this.C_ARRAY, this.K_ARRAY);
    }

    if (this.input_checkbox_B && this.input_checkbox_C) {
      this.text_status_indicator = 'Generating combinations of 4 keywords';
      if (this.KABC)
        this.combineFour(
          this.K_ARRAY,
          this.A_ARRAY,
          this.B_ARRAY,
          this.C_ARRAY
        );
      if (this.KACB)
        this.combineFour(
          this.K_ARRAY,
          this.A_ARRAY,
          this.C_ARRAY,
          this.B_ARRAY
        );
      if (this.KBAC)
        this.combineFour(
          this.K_ARRAY,
          this.B_ARRAY,
          this.A_ARRAY,
          this.C_ARRAY
        );
      if (this.KBCA)
        this.combineFour(
          this.K_ARRAY,
          this.B_ARRAY,
          this.C_ARRAY,
          this.A_ARRAY
        );
      if (this.KCAB)
        this.combineFour(
          this.K_ARRAY,
          this.C_ARRAY,
          this.A_ARRAY,
          this.B_ARRAY
        );
      if (this.KCBA)
        this.combineFour(
          this.K_ARRAY,
          this.C_ARRAY,
          this.B_ARRAY,
          this.A_ARRAY
        );
      if (this.AKCB)
        this.combineFour(
          this.A_ARRAY,
          this.K_ARRAY,
          this.C_ARRAY,
          this.B_ARRAY
        );
      if (this.AKBC)
        this.combineFour(
          this.A_ARRAY,
          this.K_ARRAY,
          this.B_ARRAY,
          this.C_ARRAY
        );
      if (this.ABCK)
        this.combineFour(
          this.A_ARRAY,
          this.B_ARRAY,
          this.C_ARRAY,
          this.K_ARRAY
        );
      if (this.ABKC)
        this.combineFour(
          this.A_ARRAY,
          this.B_ARRAY,
          this.K_ARRAY,
          this.C_ARRAY
        );
      if (this.ACBK)
        this.combineFour(
          this.A_ARRAY,
          this.C_ARRAY,
          this.B_ARRAY,
          this.K_ARRAY
        );
      if (this.ACKB)
        this.combineFour(
          this.A_ARRAY,
          this.C_ARRAY,
          this.K_ARRAY,
          this.B_ARRAY
        );
      if (this.BKAC)
        this.combineFour(
          this.B_ARRAY,
          this.K_ARRAY,
          this.A_ARRAY,
          this.C_ARRAY
        );
      if (this.BKCA)
        this.combineFour(
          this.B_ARRAY,
          this.K_ARRAY,
          this.C_ARRAY,
          this.A_ARRAY
        );
      if (this.BAKC)
        this.combineFour(
          this.B_ARRAY,
          this.A_ARRAY,
          this.K_ARRAY,
          this.C_ARRAY
        );
      if (this.BACK)
        this.combineFour(
          this.B_ARRAY,
          this.A_ARRAY,
          this.C_ARRAY,
          this.K_ARRAY
        );
      if (this.BCKA)
        this.combineFour(
          this.B_ARRAY,
          this.C_ARRAY,
          this.K_ARRAY,
          this.A_ARRAY
        );
      if (this.BCAK)
        this.combineFour(
          this.B_ARRAY,
          this.C_ARRAY,
          this.A_ARRAY,
          this.K_ARRAY
        );
      if (this.CKBA)
        this.combineFour(
          this.C_ARRAY,
          this.K_ARRAY,
          this.B_ARRAY,
          this.A_ARRAY
        );
      if (this.CKAB)
        this.combineFour(
          this.C_ARRAY,
          this.K_ARRAY,
          this.A_ARRAY,
          this.B_ARRAY
        );
      if (this.CABK)
        this.combineFour(
          this.C_ARRAY,
          this.A_ARRAY,
          this.B_ARRAY,
          this.K_ARRAY
        );
      if (this.CAKB)
        this.combineFour(
          this.C_ARRAY,
          this.A_ARRAY,
          this.K_ARRAY,
          this.B_ARRAY
        );
      if (this.CBAK)
        this.combineFour(
          this.C_ARRAY,
          this.B_ARRAY,
          this.A_ARRAY,
          this.K_ARRAY
        );
      if (this.CBKA)
        this.combineFour(
          this.C_ARRAY,
          this.B_ARRAY,
          this.K_ARRAY,
          this.A_ARRAY
        );
    }
    this.text_status_indicator = 'Finished :D'
  }

  onClickButtonReset(): void {
    //TEXTAREA OF MAIN KEYWORDS
    this.textarea_main = '';

    //CLASSIFICATION A INPUTS
    this.input_text_A = '';
    this.textarea_A = '';

    //CLASSIFICATION B INPUTS
    this.input_checkbox_B = false;
    this.input_text_B = '';
    this.textarea_B = '';

    //CLASSIFICATION C INPUTS
    this.input_checkbox_C = false;
    this.input_text_C = '';
    this.textarea_C = '';

    //STATUS TEXT
    this.text_status_indicator = '';

    //TEXTAREA WITH ALL KEYWORDS COMBINATIONS
    this.textarea_results = '';

    this.onClickButtonUnSelectAll();
  }
}
