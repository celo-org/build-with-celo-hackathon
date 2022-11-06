import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public image: any;

  public async takePhoto() {
    this.image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    console.log(this.image);
  }
  
}

export interface Image {
  filePath: string;
  webViewPath: string;
}