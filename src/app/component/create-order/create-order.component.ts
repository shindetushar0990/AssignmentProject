import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from './../../model/order.model';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {


  constructor(
    private _fb:FormBuilder,
    private router:Router,
    private toastrService: ToastrService) {
    this.minDate = new Date();
   }
  orderForm:FormGroup;
  order:Order; 
  orderList:Order[] = [];
  minDate: Date;
  ngOnInit(): void {
   this.orderForm  = this._fb.group(
      {
        orderNo:['',[Validators.required,Validators.pattern('[0-9]{1,}')]],
        purchaseDate:['',[Validators.required]],
        customerName:['',[Validators.required,Validators.pattern('[a-zA-Z ]{1,}')]],
        totalAmount:['',[Validators.required,Validators.pattern('[0-9.]{1,}')]],
        items:this._fb.array([
         this._fb.group({
          itemName:['',Validators.required],
          itemQuantity:['',[Validators.required,Validators.pattern('[0-9.]{1,}')]],
          itemUnitprice:['',[Validators.required,Validators.pattern('[0-9.]{1,}')]],
          TotalPrice:['',[Validators.required,Validators.pattern('[0-9.]{1,}')]] 
         })
        ])
      
      });
        
  }
get items(){ //it return formarray
  return this.orderForm.get('items') as FormArray;
}  
AddItems(){ //fetch existing record and push new record
  this.items.push(
    this._fb.group({
      itemName:[''],
      itemQuantity:[''],
      itemUnitprice:[''],
      TotalPrice:[''] 
     })
  )}

deleteItems(index){
this.items.removeAt(index);
}
saveItem(orderForm){
this.order = orderForm.value; // assignment from reactive form to model
let tempOrderList = [];
tempOrderList = JSON.parse(localStorage.getItem('order'));//this logic is used to check for existing order
if(tempOrderList == null){
 tempOrderList = []; // reinitialize
}
tempOrderList.push(this.order);
localStorage.setItem('order',JSON.stringify(tempOrderList));
this.router.navigateByUrl('view');
this.toastrService.success('Customers SaveItem Successfully', 'AssignmentProject');
////////////
//   console.log(this.userForm.value);
//   let currentUser: User = this.userForm.value;
//   let result: boolean = this.invalidUser(currentUser);
//   if (!result) {
//     this.userService.createUser(currentUser).subscribe(
//       (user: User) => {
//         // this.notificationOfUser('User Created Successfully', 'create');
//       });
  
// }

//////
}
calculateTotalPrice(index){
   let itemQuantity:number = this.items.at(index).get('itemQuantity').value;  
  let itemUnitprice:number = this.items.at(index).get('itemUnitprice').value;  
  let totalPrice =  itemQuantity * itemUnitprice;
  this.items.at(index).get('TotalPrice').setValue(totalPrice);
}
resetItem(){
this.orderForm.get('orderNo').reset('');
this.orderForm.get('purchaseDate').reset('');
//this.orderForm.get('purchaseDate').setValue('');
this.orderForm.get('customerName').reset('');
//this.orderForm.get('customerName').setValue('');
this.orderForm.get('totalAmount').reset('');
console.log('inn');

}
}
