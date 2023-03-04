import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { product } from '../product';
import Validation from '../validations'
import { AbstractControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {


  addProductForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    productName: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    rating: new FormControl(),
    brand: new FormControl(),
    owner: new FormControl(),
    // prlat: new FormControl(),
    // prlong: new FormControl(),
    address: new FormControl(),
  })
  formSubmitted: boolean;
  error: string;
  nomatch: boolean = false;
  status: boolean = false;
  constructor(private userService: UserserviceService, private route: Router, private formbuilder: FormBuilder, private uploadService: UploadService) {
    this.formSubmitted = false;
    this.error = '';
  }

  ngOnInit(): void {
  }

  selectedFiles: any = '';
  imageSrc: any = '';

  private selectedFileToUpload: File | null | undefined;

  public upload() {
    if (!this.selectedFiles) {
      alert('Please select a file first!'); // or any other message to the user to choose a file
      return;
    }

    this.imageSrc = "https://acqu.s3.us-east-2.amazonaws.com/" + this.uploadService.uploadFile(this.selectedFiles).body.name;
    console.log("Upload done Image src = " + this.imageSrc)
  }

  selectFile(event: Event) {

    const target = event.target as HTMLInputElement;
    const FILE: File = (target.files as FileList)[0];
    this.selectedFiles = FILE;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addProductForm.controls;
  }
  get category() {
    return this.addProductForm.get('category');
  }

  get productName() {
    return this.addProductForm.get('category');
  }
  get image() {
    return this.imageSrc;
  }
  get price() {
    return this.addProductForm.get('price');
  }
  get rating() {
    return this.addProductForm.get('rating');
  }
  get brand() {
    return this.addProductForm.get('brand');
  }
  get owner() {
    return this.addProductForm.get('owner');
  }
  get address() {
    return this.addProductForm.get('address');
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addProductForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
    return invalid;
  }


  onSubmit() {

    if (this.addProductForm.invalid) {
      this.findInvalidControls();
      return;
    }
    this.formSubmitted = true;

    const newProduct: product = {
      productName: this.addProductForm.value['productName'],
      category: this.addProductForm.value['category'],
      image: this.imageSrc,
      price: this.addProductForm.value['price'],
      rating: this.addProductForm.value['rating'],
      brand: this.addProductForm.value['brand'],
      owner: this.addProductForm.value['owner'],
      //prlong:this.addProductForm.value['prlong'],
      address: this.addProductForm.value['address'],

    };
    console.log(newProduct),
      this.userService.addProduct(newProduct).subscribe({
        error: (error) => {
          this.status = true;
          this.error = error.error.message;
          if (error.error.errors != null) {
            this.error = error.error.errors[0];
          }
        },
        next: (data) => {
          this.status = false;
          this.route.navigate(['home'])
        }

      });
    this.addProductForm.reset();

  }
}
