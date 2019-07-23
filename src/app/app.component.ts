import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { ProductListServiceService } from './services/product-list-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cart = [];
  itemAdded = 0;

  constructor(private productListServiceService: ProductListServiceService, public dialog: MatDialog, private router: Router) {
    productListServiceService.cartProduct.subscribe(
      productList => {
        this.cart = productList;
        this.itemAdded = this.cart.length;
      });
  }

  openCartDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.minHeight = '150px';
    dialogConfig.maxHeight = '600px';
    dialogConfig.data = {
      products: this.cart
    };
    this.dialog.open(CartDialogComponent, dialogConfig);
  }
}

