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
  isRecording = false;
  play = false;
  audioUrls: SafeResourceUrl[];
  togglePlay: Subject<any>;
  toggleRecording: Subject<any>;
  toggleStopAll= new Subject<any>();
  panValue:0;
  recLabel:string;
  flashing: string;
  constructor(private recordService:RecordService){
    this.togglePlay = new Subject<boolean>();
    this.toggleRecording = new Subject<boolean>();
  }

  ngOnInit(){
    this.recordService.audioUrlsChanged.subscribe(list => this.audioUrls = list);
    //load default sample track
    this.recordService.addUrl("/assets/130_indie_florian_chaillou.wav");
    this.recLabel = "Start Recording"
  }

  onToggleRecording(){
    if(!this.isRecording){
      this.recordService.audioRecorder.start()
      this.toggleRecording.next(true);
      this.isRecording = true;
      this.recLabel = "Stop Recording";
      this.flashing = "flashing"
    } else if (this.isRecording){
      this.recordService.audioRecorder.stop()
      this.isRecording = false;
      this.recLabel = "Start Recording"
      this.flashing = "";
    }
  }

  onPlay(){
    if (this.play) {this.play = false}
    else if (!this.play) {this.play = true};
    this.togglePlay.next(this.play);
  }
  onStopAll(){
    this.toggleStopAll.next();
  }
}
