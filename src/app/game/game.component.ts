import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateModel } from '../models/state-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http: HttpClient) { }
  $transferData!: Observable<StateModel[]>;
  ngOnInit() {
     this.signalRService.startConnection().then(()=>{
        this.$transferData = this.signalRService.GetTransferStateData();
        this.$transferData.subscribe({next(d) {console.log(d)}})
     });

  }

  onRelease() : void {
    this.http.get('https://travel.isnot.dev/api/next/' )
      .subscribe(res => {
        console.log(res);
      })
  }

}
