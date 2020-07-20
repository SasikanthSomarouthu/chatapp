import { Component, OnInit ,OnChanges} from '@angular/core';
import { ChatService } from "../services/chat.service";

import { ChatMessage } from "../../models/chat-message.model";
import { analytics } from 'firebase';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit ,OnChanges{
  feed:Observable<any[]>;


  constructor(private chat:ChatService) { }

  ngOnInit(): void {
    
    this.feed=this.chat.getMessages().valueChanges();
  }

   ngOnChanges(){
    this.feed=this.chat.getMessages().valueChanges();
    console.log("getting messages");
    console.log(this.feed)
;
   }

}
