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

import { RouterExtensions, NativeScriptRouterModule } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "user-component",
    styles: ['.odd { background-color: red;}',
'.even {background-color: blue;}'
],
    templateUrl: "./userprofile.html",
})
export class UserComponent implements OnInit {
    // user markers
    markers: Observable<Array<marker.MapMarker>>;
    // stored profile data.
    userData: Observable<user.UserProfile>;
    //Observable<Array<user.UserProfile>>;
    //user.UserProfile;
    // user made markers to list in profile.
    userMarkers: marker.MapMarker[];
    // user attending event markers to list in profile.
    userAttending: marker.MapMarker[];
    // user maybe attending markers to list in profile.
    userMaybe: marker.MapMarker[];

    constructor(private store: Store<any>, private router: Router, private mapService: MapService, public routerExtensions: RouterExtensions) {
        this.markers = store.select('mapData');
        //console.dir(this.markers);
        this.userData = store.select('loginData');
       //console.dir(this.userData);

       
    }

    ngOnInit() {


    }

    goToEvent(event) {
        let urlExt = "/event/" + event.bindingContext.id;
        this.router.navigate([urlExt]);
    }

    /**
     * [setMarkers idenfify User Made events then set user attending/maybe going events for user profile]
     * @param {string} userId [user id string]
     */

    setMarkers(userId: string): void {
        // return first user match value/object
        let findGoing = (element: marker.RsvpSample) => {
            return element.member.facebookId === userId;
        };

        let newMaybeMarkers: marker.MapMarker[] = [];
        let newAttendingMarkers: marker.MapMarker[] = [];
        let newUserMarkers: marker.MapMarker[] = [];

        for (let i in this.markers) {
            if (this.markers[i].group.who === 'facebook') {
                if (this.markers[i].group.facebookId === userId) {
                    newUserMarkers.push(this.markers[i]);
                } else {
                    let attending: any = this.markers[i].rsvp_sample.find(findGoing);
                    console.log(attending);
                    if (attending !== undefined) {
                        newAttendingMarkers.push(this.markers[i]);
                    }
                }
            }
        }
        this.userMarkers = newUserMarkers;
        this.userAttending = newAttendingMarkers;
        this.userMaybe = newMaybeMarkers;

        console.log('User Events: ' + this.userAttending);
    };



}
