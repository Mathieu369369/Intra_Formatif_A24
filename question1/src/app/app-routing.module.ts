import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { normalCatLoverGuard } from './guards/normal-cat-lover.guard';
import { dogGuard } from './guards/dog.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate:[dogGuard,normalCatLoverGuard] },
  { path: 'dog', component: DogComponent, canActivate:[normalCatLoverGuard]  },
  { path: 'home', component: HomeComponent, canActivate:[normalCatLoverGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
