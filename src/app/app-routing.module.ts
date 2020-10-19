import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CrudGameComponent } from './components/pages/crud-game/crud-game.component';
import { SearchComponent } from './components/pages/search/search.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './components/pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search/:text', component: SearchComponent },

  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'crud-game', component: CrudGameComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
