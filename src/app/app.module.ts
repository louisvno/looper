import { WindowRefService } from './window-ref.service';
import { RecordService } from './record.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RecordService,WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
