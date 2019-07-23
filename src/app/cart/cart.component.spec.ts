import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { ProductListServiceService } from '../services/product-list-service.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cloneDeep } from 'lodash';

// To run this test case add f before below describe like (fdescribe) and run ng test from console on this project.

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: ProductListServiceService;
  const mockData = {
    title: 'Blue Stripe Stoneware Plate',
    brand: 'Kiriko',
    price: 40,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    image: 'blue-stripe-stoneware-plate.jpg',
    showButtons: true,
    quantity: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [MatCardModule, HttpClientTestingModule],
      providers: [ProductListServiceService]
    })
      .compileComponents();
    service = TestBed.get(ProductListServiceService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('View Test Cases', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the title of the cart page', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.cart-title').textContent).toContain('Shopping Cart');
    });

    it('should show the empty state message when no items is present in the cart', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.mat-card-content').textContent).toContain('There are no items in your cart. Please select and add items from the view products page.');
    });
  });

  describe('testing each function', () => {
    it('should fetch the cart list items and calculate the total on calling ngOnInit', () => {
      service.cartList = [mockData];
      component.calculateCartTotal = jasmine.createSpy();
      component.ngOnInit();
      expect(component.cartItems).toEqual(service.cartList);
      expect(component.calculateCartTotal).toHaveBeenCalled();
    });

    it('should remove the product when removeProduct is called', () => {
      service.updateCart = jasmine.createSpy('updateCart');
      component.calculateCartTotal = jasmine.createSpy('calculateCartTotal');
      component.removeProduct(mockData);
      expect(service.updateCart).toHaveBeenCalledWith(mockData, 'remove');
      expect(component.calculateCartTotal).toHaveBeenCalled();
    });

    it('should calculate the total cart value when calculateCartTotal is called', () => {
      component.cartItems = [mockData];
      component.calculateCartTotal();
      expect(component.totalCartValue).toEqual(40);
    });

    it('should update the product quantity when updateQuantity is called', () => {
      const data = cloneDeep(mockData);
      component.calculateCartTotal = jasmine.createSpy('calculateCartTotal');
      component.updateQuantity(3, data);
      expect(data.quantity).toEqual(3);
      expect(component.calculateCartTotal).toHaveBeenCalled();
    });
  });

});
