import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  base64textString: string;
  imageUrl: string;
  ishiddenImage: boolean;
  @Input() defaultImage: string;
  @Input() imageWidth: string;
  @Input() imageHeight: string;
  @Input() onErrorImage: string;
  constructor() {
  }

  ngOnInit() {
    if(this.defaultImage){
      this.imageUrl='https://drive.google.com/thumbnail?id='+this.defaultImage;
    }
    else {
      this.imageUrl = this.onErrorImage;
    }
    this.ishiddenImage = false;
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      this.convertToBinaryString(file);
      this.convertToDataURL(file);
    } else {
      alert('invalid format!');
    }
  }

  convertToBinaryString(file: File) {
    let readerForBinarySring = new FileReader();
    readerForBinarySring.onload = this._handleReaderLoaded.bind(this);
    readerForBinarySring.readAsBinaryString(file);
  }

  convertToDataURL(file: File) {
    this.ishiddenImage = true;
    let readerForDataUrl = new FileReader();
    readerForDataUrl.readAsDataURL(file);
    readerForDataUrl.onload = (event) => {
      this.imageUrl = event.target.result;
      this.ishiddenImage = false;
    };
  }

   _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.valueChange.emit(this.base64textString);
  }

}
