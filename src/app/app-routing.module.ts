import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RisorseComponent } from './risorse/risorse.component';
import { AreeComponent } from './aree/aree.component';
import { ObiettiviComponent } from './obiettivi/obiettivi.component';
import { DipendentiComponent } from './dipendenti/dipendenti.component';


const routes: Routes = [
  {path: '', component:HomeComponent, children: [
    {path: '', redirectTo: 'risorse', pathMatch: 'full' },
    {path: 'risorse', component:RisorseComponent},
    {path: 'aree', component:AreeComponent},
    {path: 'obiettivi', component:ObiettiviComponent},
    {path: 'dipendenti', component:DipendentiComponent}
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
