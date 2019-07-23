import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { clone, get } from 'lodash';
import { ProductListServiceService } from '../services/product-list-service.service';
import { IProduct, Products } from './Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../app.component.css']
})

export class ProductsComponent implements OnInit {
  private quantity = 1;
  private hideProductList: boolean;
  private productList: [IProduct];
  private selectedProduct: IProduct;
  private hideButtons = true;

  constructor(private productListServiceService: ProductListServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.hideProductList = false;
    this.fetchProductList();
  }

  updateQuantity(quantity: number) {
    this.quantity = Number(quantity);
  }

  fetchProductList() {
    this.productListServiceService.getOptions('warrants').subscribe(data => {
      const response = new Products(data);
      this.productList = get(response, 'productList', []);
    });
  }

  showDetails(product: IProduct) {
    this.hideProductList = true;
    this.selectedProduct = product;
  }

  addToCart(selectedProduct: IProduct) {
    const product = clone(selectedProduct);
    product.quantity = this.quantity;
    this.productListServiceService.updateCart(product, 'add');
    this.hideProductList = false;
  }
}
