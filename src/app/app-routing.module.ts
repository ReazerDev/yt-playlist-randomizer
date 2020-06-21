import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { SearchComponent } from './views/search/search.component';
import { SettingsComponent } from './views/settings/settings.component';


const routes: Routes = [
  { path: '', redirectTo: 'playlist', pathMatch: 'full' },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:list', component: PlaylistComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:keyword', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
