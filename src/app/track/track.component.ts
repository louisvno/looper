import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
//TODO optional loop optional reverb and other effects
//Pan right left
export class TrackComponent implements OnInit {
  @Input() audioUrl: SafeUrl;
  @Input() togglePlay: Subject<boolean>;
  @ViewChild('audio') audio: any;
  constructor() { }

  ngOnInit() {
    this.togglePlay.subscribe(play => {
      if(play)this.audio.nativeElement.play();
      else this.audio.nativeElement.stop();
    });
  }
  ngOnDestroy(){
    this.togglePlay.unsubscribe();
  }
}
