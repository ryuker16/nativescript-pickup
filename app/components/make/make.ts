
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
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
  selector: 'make-event',
  templateUrl: './make.html',
})
export class MakeComponent implements OnInit {

  // get user profiles
  //@Input() userInfo: user.UserProfile;
  //find our search input to get google maps auto complete
 // @ViewChild("searchPlace")
  //public searchElementRef: ElementRef;
  // sports list
  sports: string[] = this.mapService.listSports.sort();
  //ngInit will use this to store place results
  //place: google.maps.places.PlaceResult;
  // our form group
  eventForm: FormGroup;
  //form success
  formSubmitted: boolean = false;


  constructor(private mapService: MapService, private fb: FormBuilder, private routerExtensions: RouterExtensions) {

    this.eventForm = fb.group({
      title: [''],
      duration: [''],
      chooseSport: [''],
      description: [''],
      phone: [''],
      email: [''],
      locationHelp: [''],
      searchPlace: [''],
      startTime: ['']
    });

  }

  public goBackPage() {
    this.routerExtensions.back();
  }

  /**
   * [ngOnInit adding the google map search bar to angular2-google-map, sets listener to get results from gmap API]
   */
  ngOnInit(): void {

    this.formSubmitted = false;
    //    // this.mapsAPILoader.load().then(() => {
    //    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //         types: ["address"]
    //       });

    //       autocomplete.addListener("place_changed", () => {
    //         //get/set the place result
    //         this.place = autocomplete.getPlace();
    //         console.log(this.place);

    //       });
    //     });

  }
  /**
   * [makeEvent used to create event & mapMarker combing form data with venue]
   * @param  {any}                            fv  [form values]
   * @param  {google.maps.places.PlaceResult} ven [google map address results]
   * @return {marker.MapMarker}                   [finished event]
   */
  //   private makeEvent(fv: any, ven: google.maps.places.PlaceResult): marker.MapMarker {
  //     return {
  //       venue: {
  //         lat: ven.geometry.location.lat(),
  //         lon: ven.geometry.location.lng(),
  //         address_1: ven.formatted_address,
  //         name: ven.name,
  //       },
  //       headcount: 0,

  //       id: this.userInfo.facebook + Date.now(),
  //       waitlist_count: 0,
  //       maybe_rsvp_count: 0,
  //       description: fv.description,
  //       how_to_find_us: fv.locationHelp,
  //       email: fv.email,
  //       phone: fv.phone,
  //       yes_rsvp_count: 1,
  //       name: fv.title,
  //       created: Date.now(),
  //       time: fv.startTime,
  //       sport: fv.chooseSport,
  //       group: {
  //         id: +this.userInfo.facebook,
  //         facebookId: this.userInfo.facebook,
  //         name: this.userInfo.displayName,
  //         who: 'facebook',
  //         group_photo: {
  //           thumb_link: this.userInfo.picture,
  //           //photo_link: this.userInfo.bigPicture,
  //           type: 'facebook',
  //           base_url: this.userInfo.link,
  //         }
  //       },
  //       status: 'user',
  //       rsvp_sample: [{
  //         member_photo: {
  //           thumb_link: this.userInfo.picture,
  //           //photo_link: this.userInfo.bigPicture,
  //           type: 'facebook',
  //           base_url: this.userInfo.link,
  //         },
  //         member: {
  //           name: this.userInfo.displayName,
  //           member_id: +this.userInfo.facebook,
  //           facebookId: this.userInfo.facebook
  //         }
  //       }],
  //       options: { visible: true }
  //     };
  //   }
  /**
   * `[submitForm submits form and creates event on locally after sending to
   * server]`
   * @param {any} formValues [form values for submission]
   */
     submitForm(formValues: any): void {
  //    // let newEvent = this.makeEvent(formValues, this.place);
  //     this.formSubmitted = true;
  //     this.mapService.postEvent(newEvent)
  //       .subscribe({
  //         next: (value) => {
  //           console.log(value);
  //         },
  //         error: (err: any) => console.log(err),
  //         complete: () => { console.log("event sent"); }
  //       });

  //     console.log(newEvent);
     }

}
