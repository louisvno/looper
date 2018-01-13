import { AudioContextService } from './audio-context.service';
import { WindowRefService } from './window-ref.service';
import { RecordService } from './record.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SliderModule, ButtonModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    SliderModule,
    FormsModule,
    ButtonModule
  ],
  providers: [RecordService,WindowRefService,AudioContextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
