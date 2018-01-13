import { Injectable } from '@angular/core';

@Injectable()
export class AudioContextService {
  audioCtx;
  
  constructor() {
    this.audioCtx = new AudioContext();
  }

}
