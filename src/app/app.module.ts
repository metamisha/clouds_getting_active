import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonService } from './common.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskContainerComponent } from './task-container/task-container.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TaskContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ CommonService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
