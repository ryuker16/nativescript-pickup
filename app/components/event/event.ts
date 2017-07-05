import { ActivatedRoute } from '@angular/router';
import {Component, ElementRef, ViewChild, AfterViewChecked, OnInit, OnChanges, AfterViewInit} from '@angular/core';
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
//import {registerElement} from "nativescript-angular/element-registry";
// import {mapsModule} from "nativescript-google-maps-sdk";
//const mapsModule = require("nativescript-google-maps-sdk");
// /import {DumbComponent} from "./dumb/dumbEvent";
import {marker} from '../../components/interface/marker';
import {user} from '../../components/interface/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MapService} from '../../actions/action';
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    moduleId: module.id,
    selector: "event-component",
    templateUrl: "./event.html"
})
export class EventComponent implements OnInit {
    id: number;
    deleted: boolean;
    modelall: Observable<Array<marker.MapMarker>>

    constructor(private route: ActivatedRoute, private mapService: MapService, private routerExtensions: RouterExtensions, private store: Store<any>) {
        this.deleted = false;
    }


    ngOnInit() {
        //this.models = this.model;
        console.log("init evoked");
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log("Found match" + this.id);
            if (params['id']) {
                console.log(params);
                console.log('param id match in ' + this.id);
                this.modelall = this.mapService.getEvent(this.id);
                // this.subscription = this.mapService.getEvent(this.id)
                //     .subscribe(data => {
                //         //console.log(data[0].venue);
                //         //this.model = data[0];
                //         console.dir(data[0].venue);
                //         //console.dir(data[0].id);
                //         console.log("id for for data in this.models : " + data[0].id);
                //         //this.models = data;
                //         this.modelall = data;
                //         //this.testModel = data;
                //
                //     });
            }
        });

    }

    public goBackPage() {
        this.routerExtensions.back();
    }
}
