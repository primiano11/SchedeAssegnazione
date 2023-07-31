import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DialogContentDip, RisorseComponent } from './risorse/risorse.component';
import { AreeComponent, DialogContentAree } from './aree/aree.component';
import { DialogContentOi, DialogContentOs, ObiettiviComponent } from './obiettivi/obiettivi.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { DialogContentDipendenti, DipendentiComponent } from './dipendenti/dipendenti.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RisorseComponent,
    AreeComponent,
    ObiettiviComponent,
    DialogContentOs,
    DialogContentOi,
    DialogContentDip,
    DialogContentAree,
    DipendentiComponent,
    DialogContentDipendenti
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
