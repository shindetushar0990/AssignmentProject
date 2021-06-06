import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './component/template/role/role.component';
import { MenuComponent } from './component/template/menu/menu.component';
import { MaterialModule } from './modules/material/material.module';
import { FooterComponent } from './component/template/footer/footer.component';
import { HeaderComponent } from './component/template/header/header.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    RoleComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RoleComponent,
    MenuComponent,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
