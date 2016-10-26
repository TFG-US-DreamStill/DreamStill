import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';
 
@Component({
    moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'private.component.html'
})
 
export class PrivateComponent {
 
    constructor(
        private _service:AuthenticationService){}
 
    ngOnInit(){
        this._service.checkCredentials();
    }
 
    logout() {
        this._service.logout();
    }
}