import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   uploadedFiles: Array<File>;
  constructor(
    public documentService: DocumentService,
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.documentService.getApiDocument().subscribe((resolve) => {
      console.log('This is resolve', resolve);
    });
  }
  async uploadDocument() {
    console.log('METHOD UPLOAD DOCUMENT');
    console.log(this.uploadedFiles);
    let formdata = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formdata.append(
        'uploads[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    console.log(formdata);
    //CALL
    await this.documentService.postApiDocument(formdata).subscribe((res) => {
      console.log('Response: ', res);
    });
  }
  onFileChange(event) {
    this.uploadedFiles = event.target.files;
    console.log('METHOD ONFILE DOCUMENT', event.target.files[0]);
  }

}
