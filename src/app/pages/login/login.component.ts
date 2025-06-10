import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import User from '../../classes/User';
import { LogService } from '../../services/log.service';
import { Router } from '@angular/router';
import Log from '../../classes/Log';
import { LiaisonBackService } from '../../backService/liaison-back.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private logService:LogService,
    private router:Router,
    private liaisonService:LiaisonBackService
  ){
    // sessionStorage.clear()
    this.loginForm = this.formBuilder.group({
      userName:'',
      userPassword:''
    })
    // console.log(localStorage.getItem('token'));
  }
  validate(){
    const login = new Log(this.loginForm.get('userName')?.value, this.loginForm.get('userPassword')?.value)
    this.liaisonService.logToApp(login).then(data => data.subscribe(element=> {
      if(typeof(element)!='string'){
        
        console.log('connecté');
        this.logService.setUserEnCours(element).then(data => {
          let user = new User()
          // user.userId = this.loginForm.get('userName')?.value
          user.userId = element.id
          this.logService.setUser(user).then(
            data => {
              sessionStorage.setItem('token','token')
              this.router.navigate(['/home'])
            }
          )
        })
      }
    }))
    
    // let user = new User()
    // user.userId = this.loginForm.get('userName')?.value
    // this.logService.setUser(user).then(
    //   data => {
    //     this.router.navigate(['/home'])
    //   }
    // )
  }
}
