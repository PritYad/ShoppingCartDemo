import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { ProductListServiceService } from './services/product-list-service.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CartDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  entryComponents: [
    CartDialogComponent
  ],
  providers: [ProductListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
