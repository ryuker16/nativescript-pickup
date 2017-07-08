import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Store } from '@ngrx/store';
import { marker } from '../../components/interface/marker';
import { user } from '../../components/interface/user';
import { Observable } from 'rxjs/Observable';
import { MapService } from '../../actions/action';
import { Router } from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListView } from "tns-core-modules/ui/list-view";
import { RouterExtensions, NativeScriptRouterModule } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "user-component",
    templateUrl: "./userprofile.html",
})
export class UserComponent implements OnInit {
    // user markers
    //markers: Observable<Array<marker.MapMarker>>;
    // stored profile data.
    userData: Observable<user.UserProfile>;
    //Observable<Array<user.UserProfile>>;
    // user made markers to list in profile.
    userMarkers = new ObservableArray<marker.MapMarker>();
    // user attending event markers to list in profile.
    userAttending = new ObservableArray<marker.MapMarker>();
    // user maybe attending markers to list in profile.
    userMaybe = new ObservableArray<marker.MapMarker>();

    constructor(private store: Store<any>, private router: Router, private mapService: MapService, public routerExtensions: RouterExtensions) {

        this.userData = store.select('loginData');
        // this.markers = store.select('mapData');
    }

    ngOnInit() {
        this.store.select('comboData').subscribe((data: any) => {
            this.setMarkers(data.loginReducer.facebook, data.markerReducer);
        })
    }

    public goBackPage() {
        this.routerExtensions.back();
    }

    goToEvent(event) {
        console.log(event.bindingContext.id);
        let urlExt = "/event/" + event.bindingContext.id;
        this.router.navigate([urlExt]);
    }

    /**
     * [setMarkers idenfify User Made events then set user attending/maybe going events for user profile]
     * @param {string} userId [user id string]
     */

    setMarkers(userId: string, markers: Array<marker.MapMarker>): void {
        // return first user match value/object
        let findGoing = (element: marker.RsvpSample) => {
            return element.member.facebookId === userId;
        };

        for (let i in markers) {
            if (markers[i] && markers[i].group) {
                console.log(markers[i].group.who);
                if (markers[i].group.who === 'facebook') {
                    if (markers[i].group.facebookId === userId) {
                        this.userAttending.push(markers[i]);
                    } else {
                        let attending: any = markers[i].rsvp_sample.find(findGoing);
                        console.log(attending);
                        if (attending !== undefined) {
                            this.userMarkers.push(markers[i]);
                        }
                    }
                }
            }
        }
    };



}
