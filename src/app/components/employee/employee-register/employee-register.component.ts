import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {

  Registration: any = FormGroup;
  genderList: [] = []
  email_exist = false

  villageList: any = []    //set Data for Filter
  districtList: any = []  //set Data for filter
  provinceList: any = [] //set Data for Filter

  CompanyList: any = []    //set Data for Filter
  DepartmentList: any = []  //set Data for filter
  PositionList: any = [] //set Data for Filter
  MajorList: any = [] //set Data for Filter

  company_data: any = []  //Represent Data Filtered
  major_data: any = [] //Represent Data Filtered
  position_data: any = [] //Represent Data Filtered

  province_data: any = []  //Represent Data Filtered
  district_data: any = [] //Represent Data Filtered
  village_data: any = [] //Represent Data Filtered


  employee_district = '' //give default value for Show Selected option default
  employee_village = '' //give default value for Show Selected option default

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef,public authService: AuthService,) { }

  ngOnInit(): void {
    this.Registration = this.fb.group({
      employee_code: [null, Validators.required],
      employee_name: [null, Validators.required],
      employee_surname: [null, Validators.required],
      employee_gender: [null, Validators.required],
      employee_password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm_password: [null, Validators.compose([Validators.required])],
      // image: [null, Validators.required],
      employee_email: [null, Validators.compose([Validators.required, Validators.email])],
      employee_dob: [null, Validators.required],
      company_id: [null, Validators.required],
      department_id: [null, Validators.required],
      major_id: [null, Validators.required],
      position_id: [null, Validators.required],
      id_village: [null, Validators.required],
      id_district: [null, Validators.required],
      id_province: [null, Validators.required],
      employee_phonenumber: [null, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
    }, {
      validators: this.MustMatch('employee_password', 'confirm_password') //Corfirm password function
    })

    this.authService.province().subscribe(response=>{
      // console.log(response.data)
      this.provinceList=response.data
    })
    this.authService.district().subscribe(response=>{
      // console.log(response.data)
      this.districtList=response.data
    })
    this.authService.village().subscribe(response=>{
      // console.log(response.data)
      this.villageList=response.data
    })
    this.authService.company().subscribe(response=>{
      // console.log(response.data)
      this.CompanyList=response.data
    })
    this.authService.department().subscribe(response=>{
      // console.log(response.data)
      this.DepartmentList=response.data
    })
    this.authService.major().subscribe(response=>{
      console.log(response.data)
      this.MajorList=response.data
    })
    this.authService.position().subscribe(response=>{
      // console.log(response.data)
      this.PositionList=response.data
    })

  }

  get f() { return this.Registration.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (Registration: FormGroup) => {
      const control = Registration.controls[controlName]
      const matchingControl = Registration.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  submit_registration() {

    if (this.Registration.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Form is Invalid',
        text: 'Please input all Fill',
      })
    } else {
      // const data = new FormData(); //Create Data Store by FormData()
      // Object.entries(this.Registration.value).forEach(([key, value]: any[]) => {
      //   data.set(key, value)
      // })
      console.log(this.Registration.value)
      // this.authService.signUp(data).subscribe(response=>{
      //   console.log(response)
      // })
      this.authService.register(this.Registration.value).subscribe(response=>{
            console.log(response)
            if (response.status ==0 ) {
              this.email_exist=true
              Swal.fire({
                icon: 'error',
                title: 'Email is already exist',
                text: 'Try other email',
                })
            }else if (response.error == true) {
              Swal.fire({
                icon: 'error',
                title: 'Sonething went wrong',
                text: 'Please contact supporter',
                })
            }
          })
    }

  }

  onSelectprovince(province: any) {
    let data = this.districtList.filter((res: { id_province: string; }) => {
      return res.id_province.toLowerCase().match(province.target.value.toLocaleLowerCase())
    })
    this.district_data = data
    this.village_data = null
    this.employee_district = ''
    this.employee_village = ''
  }

  onSelectdistrict(district: any) {
    let data = this.villageList.filter((res: { id_district: string; }) => {
      return res.id_district.toLowerCase().match(district.target.value.toLocaleLowerCase())
    })
    this.village_data = data
    this.employee_village = ''
  }

  onFIleSelect(event: any, field: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.Registration.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.Registration.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }
}
