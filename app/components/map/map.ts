import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import {Image} from "tns-core-modules/ui/image";
import * as tnsOAuthModule from 'nativescript-oauth';
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { MapView, Marker, Polyline, Position} from 'nativescript-google-maps-sdk';
import {setupMarkerCluster} from 'nativescript-google-maps-utils';
import {marker} from '../../components/interface/marker';
import {user} from '../../components/interface/user';
import { Store } from '@ngrx/store';
import { Observable }  from 'rxjs/Observable';
import {ObservableArray} from "tns-core-modules/data/observable-array";
import { MapService} from '../../actions/action';
import { Router } from "@angular/router";
import { RouterExtensions, NativeScriptRouterModule } from "nativescript-angular/router";
declare var org: any;
registerElement("MapView", () => MapView);


@Component({
    moduleId: module.id,
    selector: "map-component",
    templateUrl: "./map.html",
})
export class MapComponent implements OnInit {
    public markers: Array<marker.MapMarker>;
    private subscription;
    public test;
    public gmapMarkers;
    public returnedEvents: ObservableArray<marker.MapMarker>;
    public searchPhrase: string;

 //@ViewChild("MapView") mapView: ElementRef;

    constructor(private store: Store<any>, private router: Router, private mapService: MapService, public routerExtensions: RouterExtensions) {
        this.returnedEvents = new ObservableArray<marker.MapMarker>();


        // this.subscription = this.store
        //     .select('mainData')
        //     .subscribe((data: any) => {
        //         // console.dir(data);
        //         console.log("hi");
        //         if (data !== null) {
        //             console.log("reeecieved markers!");
        //             this.markers = data.markers.map((mark) => {
        //                 return {
        //                     lat: mark.venue.lat,
        //                     lng: mark.venue.lon,
        //                     iconPath: this.iconMaker(mark.group, mark.sport),
        //                     userData: mark,
        //                     onTap: (marker) => {
        //                         let urlExt = "/event/" + mark.id; this.routerExtensions.navigate([urlExt]);
        //                     },
        //                     //onCalloutTap: this.tapCall,
        //                 }
        //
        //             });
        //
        //         }
        //     });
    }






    /**
     * [searchSports sorts search bar results and return matching events]
     * @param {string} searchEntry [search bar event triggered by key up]
     */
    searchSports(searchEntry: any) {
        let words: any = <SearchBar>searchEntry.object.text;
        console.dir(words);
        let matchEvents: Array<marker.MapMarker> = [];
        if (words.length >= 2) {
            for (let i in this.markers) {
                let search1 =
                    this.markers[i].group.name.toLowerCase().search(words.toLowerCase());
                let search2 =
                    this.markers[i].description.toLowerCase().search(words.toLowerCase());

                if (search1 !==
                    -1 || search2 !== -1) {

                    matchEvents.push(this.markers[i]);
                    console.log('match found!');
                }
            }
        }
        this.returnedEvents = new ObservableArray<marker.MapMarker>(matchEvents);
    }

    public onClear() {
        this.searchPhrase = "";
        this.returnedEvents = new ObservableArray<marker.MapMarker>();

        // this.arrayItems.forEach(item => {
        //     this.myItems.push(item);
        // });
    }

    public goBackPage() {
        this.routerExtensions.back();
    }
    public goProfilePage() {
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
            });    }


    ngOnInit() {


    }
    ngOnDestroy() {
        //  this.subscription.unsubscribe();
    }

    onSearchLayoutLoaded(event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    }

    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    }

    /**
     * [ icon maker: picks image icon based on group, can expand to add more * *sources, used as icon for map markers ]
     * @param  {string} group [source group(user events, meetup)]
     * @param  {string} sport [sport to match icon name]
     * @return {[string]}
     */
    iconMaker(group: string, sport?: string): string {
        if (group == 'facebook') {
            return sport ? 'res://images/bluesporticons/sporticons-original_' + sport + '.bmp' : 'res://images/bluesporticons/sporticons-original_sport.bmp';
        } else {
            return sport ? 'res://images/redsporticons/sporticons-original_' + sport + '.bmp' : 'res://images/redsporticons/sporticons-original_sport.bmp';
        }
    }

    onMarkerSelect(event) {
        //console.dir(event.marker);
        let urlExt = "/event/" + event.marker.userData.id;
        this.router.navigate([urlExt]);
    }
    onSelectEvent(event) {
        console.dir(event);
    }

    // Map events
    onMapReady(args) {
        // if (this.mapView || !args.object) return;
        let gmap = args.object;

        this.mapService.getMapData().subscribe(
            value => {
                this.markers = value;
                this.gmapMarkers = value.map((mark) => {
                    console.log("Setting a marker..." + mark.id);
                    let marker = new Marker();
                    //let image = new Image();
                    //let srcImage = //imageSource.fromFile(this.iconMaker(mark.group.who, mark.sport));
                    //image.src = srcImage;
                    //console.dir(image);
                    //console.log(srcImage);
                    //console.log(srcImage);
                    //console.log("Tried to get images");
                    //let marker;
                    marker.position = Position.positionFromLatLng(mark.venue.lat, mark.venue.lon);
                    marker.title = mark.name;
                    //marker.icon = srcImage,
                    marker.rotation = 0;
                    marker.userData = mark;
                    gmap.addMarker(marker);
                    return marker
                });
                // setupMarkerCluster(gmap, this.gmapMarkers);
                //  console.log("got something: " + value[0].id);
              //  this.store.dispatch({
              //      type: 'MARKER_RENEW', payload: { markers: value }
              //  });
                //console.dir(this.markers[0].name);
            },
            error => {
                console.log("map Ready error: " + error);
            }
        );
    }
}
