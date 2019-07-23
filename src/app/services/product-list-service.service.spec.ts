import { TestBed } from '@angular/core/testing';

import { ProductListServiceService } from './product-list-service.service';

describe('ProductListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListServiceService = TestBed.get(ProductListServiceService);
    expect(service).toBeTruthy();
  });
});
