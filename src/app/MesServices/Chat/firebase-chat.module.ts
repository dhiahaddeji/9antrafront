import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environement } from 'src/environement/environement.dev';
import { ChatService } from './chat.service';

@NgModule({
  imports: [AngularFireModule.initializeApp(environement.firebase)],
  providers: [ChatService],
})
export class FirebaseChatModule {}
