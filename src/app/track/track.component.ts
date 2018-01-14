import { AudioContextService } from './../audio-context.service';
import  * as WaveSurfer from 'wavesurfer.js';
import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PanelModule, InputSwitchModule } from 'primeng/primeng';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
//TODO optional loop optional reverb and other effects
//Pan right left
export class TrackComponent implements OnInit {
  delayNode: any;
  @Input() audioUrl: SafeUrl;
  @Input() togglePlay: Subject<boolean>;
  @ViewChild('audio') audio: any;
  @ViewChild('wavesurfer') container:any;
  distortion:any;
  source: any;
  panNode:any;
  panValue:number;
  delayValue:number
  waveSurfer: any;
  trackEnabled:boolean;

  constructor(private audioCtxService: AudioContextService) { 
    this.panValue = 0;
    this.delayValue = 0.0;
  }

  ngOnInit() {
    this.waveSurfer = WaveSurfer.create({
      container: this.container.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple', 
      audioContext:this.audioCtxService.audioCtx
    })
   
    //this.source = this.audioCtxService.audioCtx.createMediaElementSource(this.audio.nativeElement);
    this.panNode = this.waveSurfer.backend.ac.createStereoPanner();
    this.waveSurfer.backend.setFilter(this.panNode);
    this.delayNode = this.waveSurfer.backend.ac.createDelay();
    this.waveSurfer.backend.setFilter(this.delayNode);

    //this.source.connect(this.delayNode)
              // .connect(this.panNode) 
              // .connect(this.audioCtxService.audioCtx.destination);
    this.panNode.pan.value = this.panValue; 
    this.delayNode.delayTime.value = this.delayValue; 

    this.togglePlay.subscribe(play => {
      if(play)this.waveSurfer.play();
      if(!play) this.waveSurfer.pause();
    });

    this.trackEnabled =true;
  }
  ngOnDestroy(){
    this.togglePlay.unsubscribe();
  }

  onPan(){
    this.panNode.pan.value = this.panValue / 100; 
  }
  onDelay(){
    this.delayNode.delayTime.value = this.delayValue / 10; 
  }
  ngAfterViewInit(){
    var xhr = new XMLHttpRequest();
    console.log(this.audio.nativeElement.src)
    xhr.open('GET', this.audio.nativeElement.src, true);
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
    if (xhr.status == 200) {
      var myBlob = xhr.response;
      console.log("yooo")
      console.log(xhr.response)
      this.waveSurfer.loadBlob(myBlob)
      // myBlob is now the blob that the object URL pointed to.
    }
    };
    xhr.send();
  }
}
