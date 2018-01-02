import { RecordService } from './record.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private recordService:RecordService){

  }

  ngOnInit(){

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
}
