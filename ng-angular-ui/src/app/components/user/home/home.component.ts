import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Transaction } from 'src/app/model/transaction';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  productList: Array<Product> = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  obs?: Observable<any>;
  errorMessage?: string;
  infoMessage?: string;
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit() {
    this.findAllProducts();
    this.obs = this.dataSource.connect();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.dataSource.paginator = this.paginator!;
    this.cdr.detectChanges();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  findAllProducts() {
    this.userService.findAllProducts().subscribe((data: Product[]) => {
      this.productList = data;
      this.dataSource.data = data;
    });
  }

  purchaseProduct(product: Product) {
    if (!this.currentUser) {
      this.errorMessage = 'You should sign in to purchase a product';
      return;
    }
    const transaction = new Transaction();
    transaction.product = product;
    transaction.user = this.currentUser;
    this.userService.purchaseProduct(transaction).subscribe(
      () => {
        this.infoMessage = 'Mission is completed.';
      },
      () => {
        this.errorMessage = 'Unexpected error occurred';
      }
    );
  }

  detail(product: Product) {
    localStorage.setItem('currentProduct', JSON.stringify(product));
    this.router.navigate(['/detail', product.id]);
  }
}
