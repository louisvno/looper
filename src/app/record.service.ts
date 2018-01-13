import { NgZone } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { Injectable, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
declare var MediaRecorder: any;

@Injectable()
export class RecordService {
  
  audioRecorder:any;
  chunks:any[] = [];
  audioUrls:SafeResourceUrl[] = [];
  audioUrlsChanged= new Subject<SafeResourceUrl[]>();
  
  constructor(private windowRef:WindowRefService, private domSanitizer: DomSanitizer, private zone: NgZone) { 
    this.audioRecorder = this.windowRef.nativeWindow.navigator.mediaDevices.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      }).then(
        stream => {
          this.audioRecorder = new MediaRecorder(stream);
        
          this.audioRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          }
  
          this.audioRecorder.onstop = (e) => {
            this.zone.run(() => {
              let blob = new Blob(this.chunks, { 'type' : 'audio/wav;' });
              this.chunks = []; //reset buffer
              let url:SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.windowRef.nativeWindow.URL.createObjectURL(blob));
              this.audioUrls.push(url);
              this.audioUrlsChanged.next(this.audioUrls.slice());   
            })     
          }
      });     
  }
  

}
