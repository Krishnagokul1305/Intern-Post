import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule],
  providers: [AuthService],
})
export class AuthModule {}
