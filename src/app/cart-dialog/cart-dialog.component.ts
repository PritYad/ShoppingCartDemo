import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { sumBy } from 'lodash';
import { ICartProduct } from '../products/Products';
import { ProductListServiceService } from '../services/product-list-service.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['../app.component.css']
})

export class CartDialogComponent implements OnInit {
  totalCartValue: 0;
  constructor(
    private productListServiceService: ProductListServiceService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) { }

  ngOnInit(): void {
    this.calculateCartTotal();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calculateCartTotal(): void {
    this.totalCartValue = sumBy(this.data.products, item => item.price * item.quantity);
  }

  removeProduct(product: ICartProduct): void {
    this.productListServiceService.updateCart(product, 'remove');
    this.calculateCartTotal();
  }

  navigateToViewCart() {
    this.onNoClick();
    this.router.navigate(['/cart']);
  }

}
