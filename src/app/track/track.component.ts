import { SelectItem } from 'primeng/components/common/selectitem';
import * as RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
import { AudioContextService } from './../audio-context.service';
import  * as WaveSurfer from 'wavesurfer.js';
import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PanelModule, InputSwitchModule } from 'primeng/primeng';
import { RecordService } from '../record.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {
  delayNode: any;
  @Input() audioUrl: SafeResourceUrl;
  @Input() togglePlay: Subject<boolean>;
  @Input() toggleRecording: Subject<boolean>;
  @Input() stopAll:Subject<any>;
  @Input() trackName:string;
  @ViewChild('audio') audio: any;
  @ViewChild('wavesurfer') container:any;
  distortion:any;
  source: any;
  panNode:any;
  gainNode:any;
  panValue:number;
  delayValue:number;
  gainValue:number;
  waveSurfer: any;
  trackEnabled:boolean;
  playSubscription:Subscription;
  recordingSubscription:Subscription;
  stopAllSub:Subscription;
  bpm=130;
  time=4;
  bars:SelectItem[];
  barsSelected:number;

  constructor(private recordService: RecordService) { 
    this.panValue = 0;
    this.delayValue = 0.0;
    this.gainValue = 100;
    this.bars = [
      {label:'0',value:0},
      {label:'1/4',value:0.25},
      {label:'1/2',value:0.5},
      {label:'1',value:1},
      {label:'2',value:2},
      {label:'4',value:4},
      {label:'8',value:8},
      {label:'16',value:16}
    ]
  }

  ngOnInit() {
    this.waveSurfer = WaveSurfer.create({
      container: this.container.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple',
      plugins:[RegionsPlugin.create({})] 
    })
   
    this.panNode = this.waveSurfer.backend.ac.createStereoPanner();
    this.delayNode = this.waveSurfer.backend.ac.createDelay();
    this.waveSurfer.backend.setFilters([this.panNode,this.delayNode]);

    this.panNode.pan.value = this.panValue; 
    this.delayNode.delayTime.value = this.delayValue; 
    this.waveSurfer.setVolume(1);

    this.initSubscriptions();
    this.trackEnabled =true;
    this.waveSurfer.on('ready',() =>{ 
      
    })
    this.waveSurfer.on('region-updated',(region: any)=>{
      console.log(region.end - region.start)
    })
  }
  
  onLoopLengthSelect(){
    this.waveSurfer.clearRegions();
    this.waveSurfer.addRegion({
      start: 0, // time in seconds
      end: (this.barsSelected*this.time)/(this.bpm/60), // time in seconds
      loop:true,
      color: 'hsla(100, 100%, 30%, 0.1)'
    })
  }

  initSubscriptions(){
    this.playSubscription = this.togglePlay.subscribe(play => {
      if(play)this.waveSurfer.play();
      if(!play) this.waveSurfer.pause();
    });

    this.recordingSubscription = this.toggleRecording.subscribe(record =>{
      if(record){
        this.waveSurfer.stop();
        this.waveSurfer.play();
      } else{
        this.waveSurfer.stop();
      }
    })
    this.stopAllSub = this.stopAll.subscribe(stop => {
      this.waveSurfer.stop();
    })
  }

  ngOnDestroy(){
    this.playSubscription.unsubscribe();
    this.recordingSubscription.unsubscribe();
  }

  onPan(){
    this.panNode.pan.value = + this.panValue / 100; 
  }
  onDelay(){
    this.delayNode.delayTime.value = this.delayValue / 1000; 
  }
  onGain(){
    this.waveSurfer.setVolume(this.gainValue / 100);
  }
  onDelete(){
    this.recordService.removeUrl(this.audioUrl);
  }
  onPlayPause(){
    this.waveSurfer.playPause();
  }
  onSwitchOnOff(){
    if(this.trackEnabled){
      this.initSubscriptions();
    } else {
      this.waveSurfer.stop();
      this.playSubscription.unsubscribe();
      this.recordingSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.audio.nativeElement.src, true);
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
    if (xhr.status == 200) {
      var myBlob = xhr.response;
      this.waveSurfer.loadBlob(myBlob)
      // myBlob is now the blob that the object URL pointed to.
    }
    };
    xhr.send();
  }
}
