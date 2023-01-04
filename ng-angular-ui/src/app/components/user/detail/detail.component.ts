import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  productId?: string;
  currentProduct: Product;

  constructor(private route: ActivatedRoute) {
    this.currentProduct = JSON.parse(localStorage.getItem("currentProduct") as string);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.productId = params.get('id')!;
      }
    });
  }

}
