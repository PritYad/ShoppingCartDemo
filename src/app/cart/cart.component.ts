import { Component, OnInit } from '@angular/core';
import { sumBy } from 'lodash';
import { ICartProduct } from '../products/Products';
import { ProductListServiceService } from '../services/product-list-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../app.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  totalCartValue = 0;
  constructor(private productListServiceService: ProductListServiceService) { }

  ngOnInit() {
    this.cartItems = this.productListServiceService.cartList;
    this.calculateCartTotal();
  }

  calculateCartTotal(): void {
    this.cartItems.forEach(item => item.totalPrice = item.quantity > 1 ? item.quantity * item.price : item.price);
    this.totalCartValue = sumBy(this.cartItems, item => item.price * item.quantity);
  }

  removeProduct(product: ICartProduct): void {
    this.productListServiceService.updateCart(product, 'remove');
    this.calculateCartTotal();
  }

  updateQuantity(quantity: number, product: ICartProduct) {
    product.quantity = Number(quantity);
    this.calculateCartTotal();
  }
}
