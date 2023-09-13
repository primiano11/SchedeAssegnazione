import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RisorseComponent } from './risorse/risorse.component';
import { AreeComponent } from './aree/aree.component';
import { ObiettiviComponent } from './obiettivi/obiettivi.component';
import { DipendentiComponent } from './dipendenti/dipendenti.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './utils/authservice';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component:HomeComponent, children: [
    {path: '', redirectTo: 'welcome', pathMatch: 'full' },
    {path: 'aree', component:AreeComponent, canActivate: [AuthGuard]},
    {path: 'obiettivi', component:ObiettiviComponent, canActivate: [AuthGuard]},
    {path: 'dipendenti', component:DipendentiComponent, canActivate: [AuthGuard]},
    {path: 'welcome', component:WelcomeComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
