import { Component } from "@angular/core";
//import { NSDockMonitor } from "ngrx-devtools-nativescript";
import { Observable } from 'rxjs/Observable';
import * as tnsOAuthModule from 'nativescript-oauth';
import { Router } from "@angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import { MapView } from "nativescript-google-maps-sdk";
import { Store } from '@ngrx/store';
import {MapService} from './actions/action';
//registerElement("MapView", () => MapView);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    constructor(private router: Router, private store: Store<any>, private mapService: MapService) { }
    public onTapLogin() {
        tnsOAuthModule.login()
            .then((data: any) => {
              let token = tnsOAuthModule.accessToken();
                console.log('logged in attempt');
                console.log(token);
                
            })
            .catch((er) => {
                console.log('didnt log in via facebook successfully');
                console.error('error logging in');
                console.log(er);
                //do something with the error
            });
    }
    public onTapTest() {
     // this.router.navigate(['/userprofile/']);

        tnsOAuthModule.ensureValidToken()
            .then((token: string) => {
                this.mapService.loginUser(token)
                .subscribe(
                value =>  console.log("here's user data coming"),
                error => console.log("Tried Logged into facebook but..:" + error),
                () => console.log('successfully logged in')
              );
                
                console.log('token: ' + token);
                this.router.navigate(['/userprofile/']);
            })
            .then(() => {


            })
            .catch((er) => {
                console.error('error testing ');
                console.log(er);
            });
    }

    public onTapLogout() {
        tnsOAuthModule.logout()
            .then(() => {console.log('logged out');
            this.mapService.logoutUser();
          })
            .catch((er) => {
                console.error('error logging out');
                console.log(er);
            });
    }
}
