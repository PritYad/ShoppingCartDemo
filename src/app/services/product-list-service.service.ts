import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartProduct } from '../products/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductListServiceService {
  public cartList = [];
  private cartSource = new Subject<any[]>();
  public cartProduct = this.cartSource.asObservable();
  private productsUrl = '../../assets/mockData/products.json';
  constructor(private http: HttpClient) { }

  getOptions(urlType: string) {
    // mock response for fetching products
    return this.http.get(this.productsUrl);
  }

  updateCart(product: ICartProduct, action: string): void {
    const findProductIndex = this.cartList.findIndex(item => item.title === product.title && item.brand === product.brand);
    if (findProductIndex > - 1 && action === 'add') {
      this.cartList[findProductIndex].quantity = this.cartList[findProductIndex].quantity + product.quantity;
    } else if (findProductIndex > - 1 && action === 'remove') {
      this.cartList.splice(findProductIndex, 1);
    } else {
      this.cartList.push(product);
    }
    this.cartSource.next(this.cartList);
  }
}
