import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IKeyword } from '../../../interfaces/IKeyword';
import { utils, writeFile } from 'xlsx';
import { IWorsheet } from '../../../interfaces/IWorksheet';
import { IURL } from '../../../interfaces/IURL';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export default class LoaderComponent implements OnInit {
  // STATUS MESSAGES
  public load_project_status: string = 'No project loaded yet';
  public load_csv_status: string = 'No CSV loaded yet';

  // INPUTS FOR NEW PROJECT
  public input_select_PRESET: string = 'None';
  public input_select_SEPARATOR: string = 'Tabulations';
  public input_project: string = '';
  public input_starting_line: number = 1;
  public input_keyword_column: number = 1;
  public input_volume_column: number = 1;
  public input_ads_hight: number = 0;
  /*
  public textarea_blacklist: string = '';
  public textarea_filter_informational: string = '';
  public textarea_filter_transactional: string = '';
  */
  public textarea_blacklist: string = "inercia, rollersinline, corte inglés, corte ingles, doctor, barovari, euro-sport, patinete, monopatin, patineta, walmat, tres patines , 3 patines, 3patines, wallmat, electricos, canariam, electronicos, oraciones, lata, patatas, películas, película, videos, yeferson, wallapop, segunda mano, cityrun, coppel, canariam, gw, liverpool, ollie, schwinn, usados, viejos, wikipedia, madrid, rodajas, accesorios, protecciones, chuecas, tremenda, zara, rodamientos, sílaba, decathlon, palabra, oms, cerca, converese, por favor, sin, sincelejo, chicago, ingles, inglés, falabella, galeria, primaria, zigna, dibujar, años, pokemon, voladores, canción, tiktok, facebook, survive";
  public textarea_filter_informational: string = "patinaje, mejores, como, videos, girar, limpiar, rotación, patinar";
  public textarea_filter_transactional: string = "inercia, rollerblade, inline, corte inglés, corte ingles, doctor, barovari, euro-sport, patinete, monopatin, patineta, walmat, tres patines , 3 patines, 3patines, wallmat, electricos, canariam, electronicos, oraciones, lata, patatas, películas, película, videos, yeferson, wallapop, segunda mano, cityrun, coppel, canariam, gw, liverpool, ollie, schwinn, usados, viejos, wikipedia, madrid, rodajas, accesorios, protecciones, chuecas, tremenda, zara, rodamientos, sílaba, decathlon, palabra, oms, cerca, converese, por favor, sin, sincelejo, chicago, ingles, inglés, falabella, galeria, primaria, zigna, dibujar, años, pokemon, voladores, canción, tiktok, facebook, survive";
  //Enable / Disable button and Messages
  get hasActiveProject(){
    return localStorage.getItem('keywords') !== null
  }


  /**
   * FORM VALIDATOR
   * Check that all required fields contains correct information before enable the upload option
   */
  get disabledCSVUploader(): boolean {
    return (
      this.input_project === '' ||
      this.input_starting_line < 1 ||
      this.input_keyword_column < 1 ||
      this.input_volume_column < 1
    );
  }

  // Get active project from localstorage
  get projectName(): string {
    const result = localStorage.getItem('project')
    return result === null ? '' : result
  }

  ngOnInit(): void {
    
    if (this.hasActiveProject) {
      this.load_project_status = 'Project active: ' + this.projectName;
    }
  }

  /**
   * EVENT: On click over Export to Excel button
   * 1. Get the keyword removing the unnecessary "Selected" option
   * 2. Convert the keywords list form JSON to Excel and save it in work sheet
   * "Keywords", ID and adding a option for check if keyword is in post.
   *
   * In following steps: Convert Filter the keyword and add typical keywords fields
   *
   * 3. Convert the keywords list filtered by Transactional form JSON to Excel and
   * save it in work sheet "Structure".
   *
   * 4. Convert the keywords list filtered by Informational form JSON to Excel and
   * save it in work sheet "Blog".
   *
   * Save the file and the browser will download automatically
   */

  onClickButtonExportToExcel(): void {
    const Keywords = JSON.parse(localStorage.getItem('keywords') || '').map(
      (e: IKeyword) => {
        return {
          keyword: e.keyword,
          volume: e.volume,
          type: e.type,
          url: e.url,
          in_post: false,
        };
      }
    );

    /* generate worksheet and workbook */
    const workbook = utils.book_new();
    let worksheet = utils.json_to_sheet(Keywords);

    utils.book_append_sheet(workbook, worksheet, 'Keywords');

    const structure = JSON.parse(localStorage.getItem('structure') || '');
    let worksheet_object: IWorsheet[];

    //Final worksheet to convert from JSON to Excel later
    const structureWS = (input: string) => {
      const temp: IWorsheet[] = [];

      //Get transactional keywords
      let filtered_structure = structure.filter(
        (e: IKeyword) => e.type === input
      );

      //Checking all structure for make the Worksheet
      filtered_structure.forEach((e: IURL) => {
        //Creating entry for current URL in worksheet pending of get Volume
        temp.push({
          URL: e.path,
          Keywords: '',
          Volume: e.volume,
          In_post: false,
          Title: '',
          MetaTitle: '',
          MetaDescription: '',
          Number_of_words: '0',
        });

        //Get all keywords that contains current URL
        const filtered_keywords = Keywords.filter(
          (kw: IKeyword) => kw.type === input && kw.url === e.path
        );

        //Adding each keyword accomodated to worksheet structure
        for (let index = 0; index < filtered_keywords.length; index++) {
          const kw = filtered_keywords[index];

          temp.push({
            URL: kw.url,
            Keywords: kw.keyword,
            Volume: kw.volume,
            In_post: false,
            Title: '',
            MetaTitle: '',
            MetaDescription: '',
            Number_of_words: '',
          });
        }
      });
      return temp;
    };

    worksheet_object = structureWS('Transactional');

    worksheet = utils.json_to_sheet(worksheet_object);
    utils.book_append_sheet(workbook, worksheet, 'Structure');

    worksheet_object = structureWS('Informational');
    worksheet = utils.json_to_sheet(worksheet_object);
    utils.book_append_sheet(workbook, worksheet, 'Blog');

    // create an XLSX file and try to save to file *
    const name = localStorage.getItem('project');
    writeFile(workbook, name + '.xlsx', { compression: true });
  }

  /**
   * EVENT: on click button "Save Project"
   *
   * 1. Generate a element "a" for imitate a download of a txt file in JSON format
   * 2. Generate the JSON with database structure from localhost
   * 3. Generate the virtual .json file
   * 4. Create the object to download
   * 5. Emulate that the link add to end of file
   * 6. Emulate click over the link for do the download
   */

  onClickButtonSaveProject(): void {
    const element = document.createElement('a');
    const export_data = {
      project: localStorage.getItem('project'),
      keywords: JSON.parse(localStorage.getItem('keywords') || ''),
      structure: JSON.parse(localStorage.getItem('structure') || ''),
    };

    const file = new Blob([JSON.stringify(export_data)], { type: 'text/json' });
    element.href = URL.createObjectURL(file);
    element.download = export_data.project + '.json';
    document.body.appendChild(element);
    element.click();
  }

  /**
   *
   * @param event
   *
   * EVENT: on upload the project
   * 1. Get the JSON file
   * 2. Extract the plain text
   * 3. Parse the text file
   * 4. Import to local storage
   * 5. Reload the page
   */
  onInputFileLoadProject = async (event: any) => {
    
    const file = event.target.files[0];
    const text = await file.text();
    const ImportedData = JSON.parse(text);
    localStorage.setItem('keywords', JSON.stringify(ImportedData.keywords));
    localStorage.setItem('project', ImportedData.project);
    localStorage.setItem('structure', JSON.stringify(ImportedData.structure));
    
    //location.reload();
    
  };

  /**
   *
   * @param input
   *
   * EVENT: on upload CSV
   *
   * 1. Remove localstorage content for start a new project
   * 2. Get the file
   * 3. Ge the tabulation
   * 4. Convert the blacklist, transactional e informational lists in arrays for
   * process later
   * 5.Get the information from CSV
   * 5.1 line contains high value set as transactional
   * 5.2 if keyword contains in list of informational set the keyword as informational
   * 5.3 if keyword contains in list of transactional set the keyword as transactional
   * 5.4 if keyword contains in blacklist set keyword as null for remove later
   * 5.4 if keyword volume is 0 set keyword as null for remove later
   *
   * 6. Remove all nulls keywords
   * 7. sort the keyword by volume
   * 8. Set the Ids based in index
   * 9. save all in localstorage as bdatabase
   */

  onInputFileLoadCSV = async (input: any) => {
    this.load_csv_status = 'Reseting localhost browser memory';
    localStorage.removeItem('keywords');
    localStorage.removeItem('project');
    localStorage.removeItem('structure');

    this.load_csv_status = 'Loading CSV';
    const file = input.target.files[0];
    const text = await file.text();
    const lines = text.split('\n');
    let separator = '\t';

    switch (this.input_select_SEPARATOR) {
      case 'Tabulations':
        separator = '\t';
        break;
      case 'Semicolon':
        separator = ';';
        break;
      case 'Comma':
        separator = ',';
        break;
      case 'Spaces':
        separator = ' ';
        break;
    }

    const BLACKLIST = this.textarea_blacklist.split(', ');
    const INFORMATIONAL = this.textarea_filter_informational.split(', ');
    const TRANSACTIONAL = this.textarea_filter_transactional.split(', ');

    let data = lines
      .slice(this.input_starting_line - 1)
      .map((line: any, index: number) => {
        const values = line.split(separator);

        //keyword by default is undefined
        let kw_type = '';

        let keyword = values[this.input_keyword_column - 1];

        //If people bid up for the keyword this is transactional
        if (values[this.input_ads_hight - 1] === '') kw_type = 'Transactional';

        //If keyword contains a word in INFORMATIONAL kw list, it's informational
        if (INFORMATIONAL[0] !== '') {
          if (
            INFORMATIONAL.some((f: string) =>
              values[this.input_keyword_column - 1].includes(f)
            )
          ) {
            kw_type = 'Informational';
          }
        }

        //If keyword contains a word in TRANSACTIONAL kw list, it's transactional
        if (TRANSACTIONAL[0] !== '') {
          if (
            TRANSACTIONAL.some((f: string) =>
              values[this.input_keyword_column - 1].includes(f)
            )
          ) {
            kw_type = 'Transactional';
          }
        }
        if (BLACKLIST[0] !== '') {
          if (
            BLACKLIST.some((bl: string) =>
              values[this.input_keyword_column - 1].includes(bl)
            )
          ) {
            keyword = 'null';
          }
        }

        //for remove keyword without search
        if (Number(values[this.input_volume_column - 1] < 1)) {
          keyword = 'null';
        }

        return {
          id: 0,
          keyword: keyword,
          volume: Number(values[this.input_volume_column - 1]),
          type: kw_type,
          url: '',
          selected: false,
        };
      });

    this.load_csv_status = 'Cleaning black-listed keywords';

    data = data.filter((e: any) => e.keyword !== 'null');

    this.load_csv_status = 'Organizing array by search volume';
    data.sort((a: any, b: any) => b.volume - a.volume);

    this.load_csv_status = 'Assigning Ids';
    //assigning Ids
    data.forEach((element: any, index: number) => {
      data[index].id = index;
    });

    localStorage.setItem('project', this.input_project);
    localStorage.setItem('keywords', JSON.stringify(data));
    localStorage.setItem(
      'structure',
      JSON.stringify([
        { id: 0, path: 'https://mysite.com', type: 'Transactional', volume: 0 },
        {
          id: 1,
          path: 'https://mysite.com/blog',
          type: 'Informational',
          volume: 0,
        },
      ])
    );
  

    this.input_select_PRESET = 'None';
    this.input_select_SEPARATOR = 'Tabulations';
    this.input_project = '';
    this.input_starting_line = 1;
    this.input_keyword_column = 1;
    this.input_volume_column = 1;
    this.input_ads_hight = 0;
    this.textarea_blacklist = '';
    this.textarea_filter_informational = '';
    this.textarea_filter_transactional = '';
    this.load_csv_status = 'CSV Loaded and ready for work';
    
    console.log(this.hasActiveProject)
  };

  /**
   * EVENT: on user change the selectbox of presets
   *
   * set the inputs as selected presets, this list will update in the future
   */

  onInputSelectPreset(): void {
    if (this.input_select_PRESET === 'Google Keyword Planner') {
      this.input_starting_line = 6;
      this.input_keyword_column = 1;
      this.input_volume_column = 4;
      this.input_ads_hight = 10;
      this.input_select_SEPARATOR = 'Tabulations';
    }
  }

  onInputTextOnlyNumbers(event: any): void {
    const regex = /^ [0-9]*$/;
    let AllIsGood = regex.test(event.target?.value);
    if (AllIsGood) {
      const input = parseInt(event.target.value);
      AllIsGood = input > 0;
    }

    if (!AllIsGood) {
      event.target.value = 1;
    }
  }
}
