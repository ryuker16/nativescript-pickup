"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var action_1 = require("../../actions/action");
var router_1 = require("nativescript-angular/router");
var MakeComponent = (function () {
    function MakeComponent(mapService, fb, routerExtensions) {
        this.mapService = mapService;
        this.fb = fb;
        this.routerExtensions = routerExtensions;
        // get user profiles
        //@Input() userInfo: user.UserProfile;
        //find our search input to get google maps auto complete
        // @ViewChild("searchPlace")
        //public searchElementRef: ElementRef;
        // sports list
        this.sports = this.mapService.listSports.sort();
        //form success
        this.formSubmitted = false;
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
    MakeComponent.prototype.goBackPage = function () {
        this.routerExtensions.back();
    };
    /**
     * [ngOnInit adding the google map search bar to angular2-google-map, sets listener to get results from gmap API]
     */
    MakeComponent.prototype.ngOnInit = function () {
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
    };
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
    MakeComponent.prototype.submitForm = function (formValues) {
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
    };
    return MakeComponent;
}());
MakeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'make-event',
        templateUrl: './make.html',
    }),
    __metadata("design:paramtypes", [action_1.MapService, forms_1.FormBuilder, router_1.RouterExtensions])
], MakeComponent);
exports.MakeComponent = MakeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1ha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBZ0Y7QUFDaEYsd0NBQXdEO0FBT3hELCtDQUFrRDtBQUlsRCxzREFBeUY7QUFPekYsSUFBYSxhQUFhO0lBaUJ4Qix1QkFBb0IsVUFBc0IsRUFBVSxFQUFlLEVBQVUsZ0JBQWtDO1FBQTNGLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWYvRyxvQkFBb0I7UUFDcEIsc0NBQXNDO1FBQ3RDLHdEQUF3RDtRQUN6RCw0QkFBNEI7UUFDM0Isc0NBQXNDO1FBQ3RDLGNBQWM7UUFDZCxXQUFNLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFLckQsY0FBYztRQUNkLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN4QixLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDZCxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDakIsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ2pCLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNsQixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ2hCLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBUSxHQUFSO1FBRUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsK0NBQStDO1FBQy9DLHdHQUF3RztRQUN4Ryw2QkFBNkI7UUFDN0IsWUFBWTtRQUVaLDBEQUEwRDtRQUMxRCxxQ0FBcUM7UUFDckMsZ0RBQWdEO1FBQ2hELG1DQUFtQztRQUVuQyxZQUFZO1FBQ1osVUFBVTtJQUVaLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILHdGQUF3RjtJQUN4RixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLDRDQUE0QztJQUM1Qyw0Q0FBNEM7SUFDNUMsNENBQTRDO0lBQzVDLDBCQUEwQjtJQUMxQixXQUFXO0lBQ1gsc0JBQXNCO0lBRXRCLGlEQUFpRDtJQUNqRCwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLHFDQUFxQztJQUNyQyx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QiwyQkFBMkI7SUFDM0Isd0JBQXdCO0lBQ3hCLDZCQUE2QjtJQUM3Qiw0QkFBNEI7SUFDNUIsK0JBQStCO0lBQy9CLGlCQUFpQjtJQUNqQix1Q0FBdUM7SUFDdkMsOENBQThDO0lBQzlDLDJDQUEyQztJQUMzQywyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLDBDQUEwQztJQUMxQyxZQUFZO0lBQ1osV0FBVztJQUNYLHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLDBDQUEwQztJQUMxQyxhQUFhO0lBQ2Isb0JBQW9CO0lBQ3BCLDZDQUE2QztJQUM3QyxnREFBZ0Q7SUFDaEQsK0NBQStDO0lBQy9DLFlBQVk7SUFDWixZQUFZO0lBQ1osbUNBQW1DO0lBQ25DLFNBQVM7SUFDVCxNQUFNO0lBQ047Ozs7T0FJRztJQUNBLGtDQUFVLEdBQVYsVUFBVyxVQUFlO1FBQzdCLCtEQUErRDtRQUMvRCxpQ0FBaUM7UUFDakMsMENBQTBDO1FBQzFDLHFCQUFxQjtRQUNyQiw2QkFBNkI7UUFDN0IsZ0NBQWdDO1FBQ2hDLGFBQWE7UUFDYixpREFBaUQ7UUFDakQseURBQXlEO1FBQ3pELFlBQVk7UUFFWiw2QkFBNkI7SUFDMUIsQ0FBQztJQUVOLG9CQUFDO0FBQUQsQ0FBQyxBQXRJRCxJQXNJQztBQXRJWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLGFBQWE7S0FDM0IsQ0FBQztxQ0FrQmdDLG1CQUFVLEVBQWMsbUJBQVcsRUFBNEIseUJBQWdCO0dBakJwRyxhQUFhLENBc0l6QjtBQXRJWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XHJcbmltcG9ydCB7IG1hcmtlciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW50ZXJmYWNlL21hcmtlcic7XHJcbmltcG9ydCB7IHVzZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ludGVyZmFjZS91c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbic7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdtYWtlLWV2ZW50JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFrZS5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1ha2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvLyBnZXQgdXNlciBwcm9maWxlc1xyXG4gIC8vQElucHV0KCkgdXNlckluZm86IHVzZXIuVXNlclByb2ZpbGU7XHJcbiAgLy9maW5kIG91ciBzZWFyY2ggaW5wdXQgdG8gZ2V0IGdvb2dsZSBtYXBzIGF1dG8gY29tcGxldGVcclxuIC8vIEBWaWV3Q2hpbGQoXCJzZWFyY2hQbGFjZVwiKVxyXG4gIC8vcHVibGljIHNlYXJjaEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgLy8gc3BvcnRzIGxpc3RcclxuICBzcG9ydHM6IHN0cmluZ1tdID0gdGhpcy5tYXBTZXJ2aWNlLmxpc3RTcG9ydHMuc29ydCgpO1xyXG4gIC8vbmdJbml0IHdpbGwgdXNlIHRoaXMgdG8gc3RvcmUgcGxhY2UgcmVzdWx0c1xyXG4gIC8vcGxhY2U6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcclxuICAvLyBvdXIgZm9ybSBncm91cFxyXG4gIGV2ZW50Rm9ybTogRm9ybUdyb3VwO1xyXG4gIC8vZm9ybSBzdWNjZXNzXHJcbiAgZm9ybVN1Ym1pdHRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblxyXG4gICAgdGhpcy5ldmVudEZvcm0gPSBmYi5ncm91cCh7XHJcbiAgICAgIHRpdGxlOiBbJyddLFxyXG4gICAgICBkdXJhdGlvbjogWycnXSxcclxuICAgICAgY2hvb3NlU3BvcnQ6IFsnJ10sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBbJyddLFxyXG4gICAgICBwaG9uZTogWycnXSxcclxuICAgICAgZW1haWw6IFsnJ10sXHJcbiAgICAgIGxvY2F0aW9uSGVscDogWycnXSxcclxuICAgICAgc2VhcmNoUGxhY2U6IFsnJ10sXHJcbiAgICAgIHN0YXJ0VGltZTogWycnXVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvQmFja1BhZ2UoKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogW25nT25Jbml0IGFkZGluZyB0aGUgZ29vZ2xlIG1hcCBzZWFyY2ggYmFyIHRvIGFuZ3VsYXIyLWdvb2dsZS1tYXAsIHNldHMgbGlzdGVuZXIgdG8gZ2V0IHJlc3VsdHMgZnJvbSBnbWFwIEFQSV1cclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcclxuICAgIC8vICAgIC8vIHRoaXMubWFwc0FQSUxvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAvLyAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSh0aGlzLnNlYXJjaEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwge1xyXG4gICAgLy8gICAgICAgICB0eXBlczogW1wiYWRkcmVzc1wiXVxyXG4gICAgLy8gICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgYXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKFwicGxhY2VfY2hhbmdlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIC8vZ2V0L3NldCB0aGUgcGxhY2UgcmVzdWx0XHJcbiAgICAvLyAgICAgICAgIHRoaXMucGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2codGhpcy5wbGFjZSk7XHJcblxyXG4gICAgLy8gICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgKiBbbWFrZUV2ZW50IHVzZWQgdG8gY3JlYXRlIGV2ZW50ICYgbWFwTWFya2VyIGNvbWJpbmcgZm9ybSBkYXRhIHdpdGggdmVudWVdXHJcbiAgICogQHBhcmFtICB7YW55fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdiAgW2Zvcm0gdmFsdWVzXVxyXG4gICAqIEBwYXJhbSAge2dvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdH0gdmVuIFtnb29nbGUgbWFwIGFkZHJlc3MgcmVzdWx0c11cclxuICAgKiBAcmV0dXJuIHttYXJrZXIuTWFwTWFya2VyfSAgICAgICAgICAgICAgICAgICBbZmluaXNoZWQgZXZlbnRdXHJcbiAgICovXHJcbiAgLy8gICBwcml2YXRlIG1ha2VFdmVudChmdjogYW55LCB2ZW46IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCk6IG1hcmtlci5NYXBNYXJrZXIge1xyXG4gIC8vICAgICByZXR1cm4ge1xyXG4gIC8vICAgICAgIHZlbnVlOiB7XHJcbiAgLy8gICAgICAgICBsYXQ6IHZlbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAvLyAgICAgICAgIGxvbjogdmVuLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpLFxyXG4gIC8vICAgICAgICAgYWRkcmVzc18xOiB2ZW4uZm9ybWF0dGVkX2FkZHJlc3MsXHJcbiAgLy8gICAgICAgICBuYW1lOiB2ZW4ubmFtZSxcclxuICAvLyAgICAgICB9LFxyXG4gIC8vICAgICAgIGhlYWRjb3VudDogMCxcclxuXHJcbiAgLy8gICAgICAgaWQ6IHRoaXMudXNlckluZm8uZmFjZWJvb2sgKyBEYXRlLm5vdygpLFxyXG4gIC8vICAgICAgIHdhaXRsaXN0X2NvdW50OiAwLFxyXG4gIC8vICAgICAgIG1heWJlX3JzdnBfY291bnQ6IDAsXHJcbiAgLy8gICAgICAgZGVzY3JpcHRpb246IGZ2LmRlc2NyaXB0aW9uLFxyXG4gIC8vICAgICAgIGhvd190b19maW5kX3VzOiBmdi5sb2NhdGlvbkhlbHAsXHJcbiAgLy8gICAgICAgZW1haWw6IGZ2LmVtYWlsLFxyXG4gIC8vICAgICAgIHBob25lOiBmdi5waG9uZSxcclxuICAvLyAgICAgICB5ZXNfcnN2cF9jb3VudDogMSxcclxuICAvLyAgICAgICBuYW1lOiBmdi50aXRsZSxcclxuICAvLyAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLFxyXG4gIC8vICAgICAgIHRpbWU6IGZ2LnN0YXJ0VGltZSxcclxuICAvLyAgICAgICBzcG9ydDogZnYuY2hvb3NlU3BvcnQsXHJcbiAgLy8gICAgICAgZ3JvdXA6IHtcclxuICAvLyAgICAgICAgIGlkOiArdGhpcy51c2VySW5mby5mYWNlYm9vayxcclxuICAvLyAgICAgICAgIGZhY2Vib29rSWQ6IHRoaXMudXNlckluZm8uZmFjZWJvb2ssXHJcbiAgLy8gICAgICAgICBuYW1lOiB0aGlzLnVzZXJJbmZvLmRpc3BsYXlOYW1lLFxyXG4gIC8vICAgICAgICAgd2hvOiAnZmFjZWJvb2snLFxyXG4gIC8vICAgICAgICAgZ3JvdXBfcGhvdG86IHtcclxuICAvLyAgICAgICAgICAgdGh1bWJfbGluazogdGhpcy51c2VySW5mby5waWN0dXJlLFxyXG4gIC8vICAgICAgICAgICAvL3Bob3RvX2xpbms6IHRoaXMudXNlckluZm8uYmlnUGljdHVyZSxcclxuICAvLyAgICAgICAgICAgdHlwZTogJ2ZhY2Vib29rJyxcclxuICAvLyAgICAgICAgICAgYmFzZV91cmw6IHRoaXMudXNlckluZm8ubGluayxcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICB9LFxyXG4gIC8vICAgICAgIHN0YXR1czogJ3VzZXInLFxyXG4gIC8vICAgICAgIHJzdnBfc2FtcGxlOiBbe1xyXG4gIC8vICAgICAgICAgbWVtYmVyX3Bob3RvOiB7XHJcbiAgLy8gICAgICAgICAgIHRodW1iX2xpbms6IHRoaXMudXNlckluZm8ucGljdHVyZSxcclxuICAvLyAgICAgICAgICAgLy9waG90b19saW5rOiB0aGlzLnVzZXJJbmZvLmJpZ1BpY3R1cmUsXHJcbiAgLy8gICAgICAgICAgIHR5cGU6ICdmYWNlYm9vaycsXHJcbiAgLy8gICAgICAgICAgIGJhc2VfdXJsOiB0aGlzLnVzZXJJbmZvLmxpbmssXHJcbiAgLy8gICAgICAgICB9LFxyXG4gIC8vICAgICAgICAgbWVtYmVyOiB7XHJcbiAgLy8gICAgICAgICAgIG5hbWU6IHRoaXMudXNlckluZm8uZGlzcGxheU5hbWUsXHJcbiAgLy8gICAgICAgICAgIG1lbWJlcl9pZDogK3RoaXMudXNlckluZm8uZmFjZWJvb2ssXHJcbiAgLy8gICAgICAgICAgIGZhY2Vib29rSWQ6IHRoaXMudXNlckluZm8uZmFjZWJvb2tcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICB9XSxcclxuICAvLyAgICAgICBvcHRpb25zOiB7IHZpc2libGU6IHRydWUgfVxyXG4gIC8vICAgICB9O1xyXG4gIC8vICAgfVxyXG4gIC8qKlxyXG4gICAqIGBbc3VibWl0Rm9ybSBzdWJtaXRzIGZvcm0gYW5kIGNyZWF0ZXMgZXZlbnQgb24gbG9jYWxseSBhZnRlciBzZW5kaW5nIHRvXHJcbiAgICogc2VydmVyXWBcclxuICAgKiBAcGFyYW0ge2FueX0gZm9ybVZhbHVlcyBbZm9ybSB2YWx1ZXMgZm9yIHN1Ym1pc3Npb25dXHJcbiAgICovXHJcbiAgICAgc3VibWl0Rm9ybShmb3JtVmFsdWVzOiBhbnkpOiB2b2lkIHtcclxuICAvLyAgICAvLyBsZXQgbmV3RXZlbnQgPSB0aGlzLm1ha2VFdmVudChmb3JtVmFsdWVzLCB0aGlzLnBsYWNlKTtcclxuICAvLyAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcclxuICAvLyAgICAgdGhpcy5tYXBTZXJ2aWNlLnBvc3RFdmVudChuZXdFdmVudClcclxuICAvLyAgICAgICAuc3Vic2NyaWJlKHtcclxuICAvLyAgICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbiAgLy8gICAgICAgICB9LFxyXG4gIC8vICAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4gY29uc29sZS5sb2coZXJyKSxcclxuICAvLyAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiZXZlbnQgc2VudFwiKTsgfVxyXG4gIC8vICAgICAgIH0pO1xyXG5cclxuICAvLyAgICAgY29uc29sZS5sb2cobmV3RXZlbnQpO1xyXG4gICAgIH1cclxuXHJcbn1cclxuIl19