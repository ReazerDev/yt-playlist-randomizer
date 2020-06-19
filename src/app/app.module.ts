import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { PlaylistVideoComponent } from './components/playlist-video/playlist-video.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PlaylistComponent,
    PlaylistVideoComponent,
    VideoPlayerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    VideoPlayerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
