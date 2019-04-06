import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webUI';
  base64textString:any;
  imageData:any;
  ocr:any;
  val:any;
  arg:any;
  arr:any[];
  inputText:string;

  orignalText:any;
  currentText:any;
  status:any;
  accuracy:any;


  constructor(http: Http,  private authService: AuthService){}

  selectFile(event){
    var files = event.target.files;
    var file = files[0];
    

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleFile.bind(this);

      reader.readAsBinaryString(file);
  }
}

handleFile(event) {
  var binaryString = event.target.result;
         this.base64textString= btoa(binaryString);
         
         this.imageData = btoa(binaryString);
 }

 sendString(){
  this.ocr = this.imageData;

  const ocrString = {
    img:this.ocr,
    inputText:this.inputText
  }

  // console.log(ocrString);
  this.authService.sendOcrDetails(ocrString).subscribe(data => {
    // this.arr = data;
    
     console.log(data);
     this.orignalText = data['orignalTxt']
     this.currentText = data['currentTxt']
     this.status = data['status']
     this.accuracy = data['accuracy']


  });
 }
}
