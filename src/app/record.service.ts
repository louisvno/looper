import { WindowRefService } from './window-ref.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecordService {
  
  audioRecorder:MediaRecorder;
  
  constructor(private windowRef:WindowRefService) { 
      this.audioRecorder = this.windowRef.nativeWindow.navigator.mediaDevices.getUserMedia (
        // constraints - only audio needed for this app
        {
           audio: true
        }
      ).then(stream => this.audioRecorder = new MediaRecorder(stream));
  }

 
}
