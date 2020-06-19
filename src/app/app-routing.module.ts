import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistComponent } from './views/playlist/playlist.component';


const routes: Routes = [
  { path: '', redirectTo: 'playlist', pathMatch: 'full' },
  { path: 'playlist', component: PlaylistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
