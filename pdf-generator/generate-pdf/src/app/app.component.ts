import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { UploadResult } from './upload-result';
import { jsPDF } from "jspdf";
import * as marked from 'marked';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LMarkdownEditorModule,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'generate-pdf';
  content:any;

  constructor(private toastr: ToastrService) {
    this.doUpload = this.doUpload.bind(this);  // This is very important.
  }
  
  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // do upload file by yourself
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
  }
  showSuccess() {
    this.toastr.success('Pdf downloadsed successfully', 'Success');
  }

  generatePDF(){
    console.log(this.content);
    const htmlContent = marked.parse(this.content);
    const pdf = new jsPDF();

    pdf.setFontSize(10); // Set font size to 8 (small)

    // Add text content to the PDF
    pdf.text(this.content, 10, 10); 
  
    // Save the PDF
    pdf.save('MarkdownContent.pdf');

    if(pdf){
      this.showSuccess();
    }
  }
  
}

