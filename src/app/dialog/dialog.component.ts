import { Component, OnInit ,inject, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"]
  ProductForm !: FormGroup;
  actionBtn : string="save";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api : ApiService,private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.ProductForm=this.formBuilder.group({
      productname : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      date : ['',Validators.required],
      comment : ['',Validators.required],
    });
     if(this.editData){
       this.actionBtn = "update";
       this.ProductForm.controls['productName'].setValue(this.editData.productName);
       this.ProductForm.controls['category'].setValue(this.editData.category);
       this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
       this.ProductForm.controls['price'].setValue(this.editData.price);
       this.ProductForm.controls['date'].setValue(this.editData.date);
       this.ProductForm.controls['comment'].setValue(this.editData.comment);
     }

  }


addproduct(){
 if(!this.editData){
  if(this.ProductForm.valid){
    this.api.postproduct(this.ProductForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product added successfully")
        this.ProductForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error while adding the product")
      }
    })
  }
 }else{
   this.updateProduct()
 }
}
updateProduct(){
  this.api.putProduct(this.ProductForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
    alert("Product update successfully");
    this.ProductForm.reset();
    this.dialogRef.close('update');
  },
  error:()=>{
    alert("Error while updating the record!!");
  }
  })
}

}