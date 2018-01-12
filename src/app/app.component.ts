import { RecordService } from './record.service';
import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  audioUrls: SafeResourceUrl[];
  togglePlay: Subject<any>

  constructor(private recordService:RecordService){
    this.togglePlay = new Subject<boolean>();
  }

  ngOnInit(){
    this.recordService.audioUrlsChanged.subscribe(list => this.audioUrls = list);
  }

  startRecording(){
    if(this.recordService.audioRecorder){
      this.recordService.audioRecorder.start()
      console.log(this.recordService.audioRecorder.state);
    }
  }

  stopRecording(){
    if(this.recordService.audioRecorder){
      this.recordService.audioRecorder.stop()
      console.log(this.recordService.audioRecorder.state);
    }
  }

  onPlay(){
    this.togglePlay.next(true);
  }
}
