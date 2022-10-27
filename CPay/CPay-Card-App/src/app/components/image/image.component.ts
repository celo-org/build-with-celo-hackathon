import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  imageSrc: string = "assets/account.png";

  constructor(private imageService: ImageService) { }

  ngOnInit() {}

  async takePhoto() {
    await this.imageService.takePhoto();
    this.imageSrc = this.imageService.image.webPath;
    console.log(this.imageService.image);
  }

}
