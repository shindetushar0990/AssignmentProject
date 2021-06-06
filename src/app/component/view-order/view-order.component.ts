import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from './../../model/order.model';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['orderNo', 'customerName', 'purchaseDate', 'totalAmount'];
  displayedColumns1: string[] = ['ItemName', 'ItemQuantity', 'ItemPrice', 'orderNo'];
  dataSource = new MatTableDataSource<Order>();
  dataSource1 = new MatTableDataSource<OrderDto>();
  tempOrderDtoArray :OrderDto[] = [];
  constructor() { }

  ngOnInit(): void {   
let  tempOrderList = JSON.parse(localStorage.getItem('order')); //data from localstorage
if(tempOrderList != null){
  this.dataSource = new MatTableDataSource<Order>(tempOrderList);
  tempOrderList.forEach((order:Order) => { //iteration to order
    if(order != null){
      order.items.forEach(item => { //iteration for order items
        let period = new OrderDto();
        period.orderNo = order.orderNo;
        period.itemName = item.itemName;  
        period.itemPrice = item.itemUnitprice;
        period.itemQuantity = item.itemQuantity;
        this.tempOrderDtoArray.push(period);
      });

    }
  });
  this.dataSource1 = new MatTableDataSource<OrderDto>(this.tempOrderDtoArray);
}
}
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
  }
}

export class OrderDto {
  orderNo: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
}

