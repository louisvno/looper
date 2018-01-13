import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AudioContextService } from '../audio-context.service';

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
  distortion:any;
  source: any;
  panNode:any;
  panValue:number;
  constructor(private audioCtxService: AudioContextService) { 
    this.panValue = 0;
  }

  ngOnInit() {
    this.source = this.audioCtxService.audioCtx.createMediaElementSource(this.audio.nativeElement);
    this.panNode = this.audioCtxService.audioCtx.createStereoPanner();
    this.source.connect(this.panNode)
               .connect(this.audioCtxService.audioCtx.destination);
    this.panNode.pan.value = this.panValue; 

    this.togglePlay.subscribe(play => {
      if(play)this.audio.nativeElement.play();
      else this.audio.nativeElement.stop();
    });
  }
  ngOnDestroy(){
    this.togglePlay.unsubscribe();
  }

  onPan(){
    this.panNode.pan.value = this.panValue / 100; 
  }
}
