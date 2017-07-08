"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tnsOAuthModule = require("nativescript-oauth");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var store_1 = require("@ngrx/store");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var action_1 = require("../../actions/action");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
element_registry_1.registerElement("MapView", function () { return nativescript_google_maps_sdk_1.MapView; });
var MapComponent = (function () {
    //@ViewChild("MapView") mapView: ElementRef;
    function MapComponent(store, router, mapService, routerExtensions) {
        this.store = store;
        this.router = router;
        this.mapService = mapService;
        this.routerExtensions = routerExtensions;
        this.returnedEvents = new observable_array_1.ObservableArray();
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
    MapComponent.prototype.searchSports = function (searchEntry) {
        var words = searchEntry.object.text;
        console.dir(words);
        var matchEvents = [];
        if (words.length >= 2) {
            for (var i in this.markers) {
                var search1 = this.markers[i].group.name.toLowerCase().search(words.toLowerCase());
                var search2 = this.markers[i].description.toLowerCase().search(words.toLowerCase());
                if (search1 !==
                    -1 || search2 !== -1) {
                    matchEvents.push(this.markers[i]);
                    console.log('match found!');
                }
            }
        }
        this.returnedEvents = new observable_array_1.ObservableArray(matchEvents);
    };
    MapComponent.prototype.onClear = function () {
        this.searchPhrase = "";
        this.returnedEvents = new observable_array_1.ObservableArray();
        // this.arrayItems.forEach(item => {
        //     this.myItems.push(item);
        // });
    };
    MapComponent.prototype.goBackPage = function () {
        this.routerExtensions.back();
    };
    MapComponent.prototype.goProfilePage = function () {
        var _this = this;
        tnsOAuthModule.ensureValidToken()
            .then(function (token) {
            _this.mapService.loginUser(token)
                .subscribe(function (value) { return console.log("here's user data coming"); }, function (error) { return console.log("Tried Logged into facebook but..:" + error); }, function () { return console.log('successfully logged in'); });
            console.log('token: ' + token);
            _this.router.navigate(['/userprofile/']);
        })
            .then(function () {
        })
            .catch(function (er) {
            console.error('error testing ');
            console.log(er);
        });
    };
    MapComponent.prototype.ngOnInit = function () {
    };
    MapComponent.prototype.ngOnDestroy = function () {
        //  this.subscription.unsubscribe();
    };
    MapComponent.prototype.onSearchLayoutLoaded = function (event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    };
    MapComponent.prototype.onSearchBarLoaded = function (event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    };
    /**
     * [ icon maker: picks image icon based on group, can expand to add more * *sources, used as icon for map markers ]
     * @param  {string} group [source group(user events, meetup)]
     * @param  {string} sport [sport to match icon name]
     * @return {[string]}
     */
    MapComponent.prototype.iconMaker = function (group, sport) {
        if (group == 'facebook') {
            return sport ? 'res://images/bluesporticons/sporticons-original_' + sport + '.bmp' : 'res://images/bluesporticons/sporticons-original_sport.bmp';
        }
        else {
            return sport ? 'res://images/redsporticons/sporticons-original_' + sport + '.bmp' : 'res://images/redsporticons/sporticons-original_sport.bmp';
        }
    };
    MapComponent.prototype.onMarkerSelect = function (event) {
        //console.dir(event.marker);
        var urlExt = "/event/" + event.marker.userData.id;
        this.router.navigate([urlExt]);
    };
    MapComponent.prototype.onSelectEvent = function (event) {
        console.dir(event);
    };
    // Map events
    MapComponent.prototype.onMapReady = function (args) {
        var _this = this;
        // if (this.mapView || !args.object) return;
        var gmap = args.object;
        this.mapService.getMapData().subscribe(function (value) {
            _this.markers = value;
            _this.gmapMarkers = value.map(function (mark) {
                console.log("Setting a marker..." + mark.id);
                var marker = new nativescript_google_maps_sdk_1.Marker();
                //let image = new Image();
                //let srcImage = //imageSource.fromFile(this.iconMaker(mark.group.who, mark.sport));
                //image.src = srcImage;
                //console.dir(image);
                //console.log(srcImage);
                //console.log(srcImage);
                //console.log("Tried to get images");
                //let marker;
                marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(mark.venue.lat, mark.venue.lon);
                marker.title = mark.name;
                //marker.icon = srcImage,
                marker.rotation = 0;
                marker.userData = mark;
                gmap.addMarker(marker);
                return marker;
            });
            // setupMarkerCluster(gmap, this.gmapMarkers);
            //  console.log("got something: " + value[0].id);
            //  this.store.dispatch({
            //      type: 'MARKER_RENEW', payload: { markers: value }
            //  });
            //console.dir(this.markers[0].name);
        }, function (error) {
            console.log("map Ready error: " + error);
        });
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "map-component",
        templateUrl: "./map.html",
    }),
    __metadata("design:paramtypes", [store_1.Store, router_1.Router, action_1.MapService, router_2.RouterExtensions])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVFO0FBS3ZFLG1EQUFxRDtBQUNyRCwwRUFBbUY7QUFDbkYsNkVBQWtGO0FBSWxGLHFDQUFvQztBQUVwQywyRUFBdUU7QUFDdkUsK0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxzREFBeUY7QUFFekYsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFRMUMsSUFBYSxZQUFZO0lBUXhCLDRDQUE0QztJQUV6QyxzQkFBb0IsS0FBaUIsRUFBVSxNQUFjLEVBQVUsVUFBc0IsRUFBUyxnQkFBa0M7UUFBcEgsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNwSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksa0NBQWUsRUFBb0IsQ0FBQztRQUc5RCxpQ0FBaUM7UUFDakMsMEJBQTBCO1FBQzFCLGtDQUFrQztRQUNsQyxnQ0FBZ0M7UUFDaEMsNkJBQTZCO1FBQzdCLCtCQUErQjtRQUMvQixrREFBa0Q7UUFDbEQsMERBQTBEO1FBQzFELDJCQUEyQjtRQUMzQiwyQ0FBMkM7UUFDM0MsMkNBQTJDO1FBQzNDLHdFQUF3RTtRQUN4RSxzQ0FBc0M7UUFDdEMsMkNBQTJDO1FBQzNDLHNHQUFzRztRQUN0Ryx5QkFBeUI7UUFDekIsb0RBQW9EO1FBQ3BELG9CQUFvQjtRQUNwQixFQUFFO1FBQ0Ysa0JBQWtCO1FBQ2xCLEVBQUU7UUFDRixZQUFZO1FBQ1osVUFBVTtJQUNkLENBQUM7SUFPRDs7O09BR0c7SUFDSCxtQ0FBWSxHQUFaLFVBQWEsV0FBZ0I7UUFDekIsSUFBSSxLQUFLLEdBQW1CLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BE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WSxZQUFZO0lBTHhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLFlBQVk7S0FDNUIsQ0FBQztxQ0FXNkIsYUFBSyxFQUF1QixlQUFNLEVBQXNCLG1CQUFVLEVBQTJCLHlCQUFnQjtHQVYvSCxZQUFZLENBMkx4QjtBQTNMWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7R3JpZExheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7SW1hZ2V9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbmltcG9ydCAqIGFzIHRuc09BdXRoTW9kdWxlIGZyb20gJ25hdGl2ZXNjcmlwdC1vYXV0aCc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCwgVmlld0NsYXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb259IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xyXG5pbXBvcnQge3NldHVwTWFya2VyQ2x1c3Rlcn0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXV0aWxzJztcclxuaW1wb3J0IHttYXJrZXJ9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW50ZXJmYWNlL21hcmtlcic7XHJcbmltcG9ydCB7dXNlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvdXNlcic7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gIGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgTWFwU2VydmljZX0gZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuZGVjbGFyZSB2YXIgb3JnOiBhbnk7XHJcbnJlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gTWFwVmlldyk7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibWFwLWNvbXBvbmVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXAuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBtYXJrZXJzOiBBcnJheTxtYXJrZXIuTWFwTWFya2VyPjtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uO1xyXG4gICAgcHVibGljIHRlc3Q7XHJcbiAgICBwdWJsaWMgZ21hcE1hcmtlcnM7XHJcbiAgICBwdWJsaWMgcmV0dXJuZWRFdmVudHM6IE9ic2VydmFibGVBcnJheTxtYXJrZXIuTWFwTWFya2VyPjtcclxuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcclxuXHJcbiAvL0BWaWV3Q2hpbGQoXCJNYXBWaWV3XCIpIG1hcFZpZXc6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwdWJsaWMgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIHRoaXMucmV0dXJuZWRFdmVudHMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PG1hcmtlci5NYXBNYXJrZXI+KCk7XHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmVcclxuICAgICAgICAvLyAgICAgLnNlbGVjdCgnbWFpbkRhdGEnKVxyXG4gICAgICAgIC8vICAgICAuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGRhdGEpO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJoaVwiKTtcclxuICAgICAgICAvLyAgICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWVlY2lldmVkIG1hcmtlcnMhXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMubWFya2VycyA9IGRhdGEubWFya2Vycy5tYXAoKG1hcmspID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxhdDogbWFyay52ZW51ZS5sYXQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsbmc6IG1hcmsudmVudWUubG9uLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6IHRoaXMuaWNvbk1ha2VyKG1hcmsuZ3JvdXAsIG1hcmsuc3BvcnQpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGE6IG1hcmssXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBvblRhcDogKG1hcmtlcikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmxFeHQgPSBcIi9ldmVudC9cIiArIG1hcmsuaWQ7IHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbdXJsRXh0XSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy9vbkNhbGxvdXRUYXA6IHRoaXMudGFwQ2FsbCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtzZWFyY2hTcG9ydHMgc29ydHMgc2VhcmNoIGJhciByZXN1bHRzIGFuZCByZXR1cm4gbWF0Y2hpbmcgZXZlbnRzXVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaEVudHJ5IFtzZWFyY2ggYmFyIGV2ZW50IHRyaWdnZXJlZCBieSBrZXkgdXBdXHJcbiAgICAgKi9cclxuICAgIHNlYXJjaFNwb3J0cyhzZWFyY2hFbnRyeTogYW55KSB7XHJcbiAgICAgICAgbGV0IHdvcmRzOiBhbnkgPSA8U2VhcmNoQmFyPnNlYXJjaEVudHJ5Lm9iamVjdC50ZXh0O1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHdvcmRzKTtcclxuICAgICAgICBsZXQgbWF0Y2hFdmVudHM6IEFycmF5PG1hcmtlci5NYXBNYXJrZXI+ID0gW107XHJcbiAgICAgICAgaWYgKHdvcmRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5tYXJrZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoMSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzW2ldLmdyb3VwLm5hbWUudG9Mb3dlckNhc2UoKS5zZWFyY2god29yZHMudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoMiA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzW2ldLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuc2VhcmNoKHdvcmRzLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2gxICE9PVxyXG4gICAgICAgICAgICAgICAgICAgIC0xIHx8IHNlYXJjaDIgIT09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoRXZlbnRzLnB1c2godGhpcy5tYXJrZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWF0Y2ggZm91bmQhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXR1cm5lZEV2ZW50cyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8bWFya2VyLk1hcE1hcmtlcj4obWF0Y2hFdmVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnJldHVybmVkRXZlbnRzID0gbmV3IE9ic2VydmFibGVBcnJheTxtYXJrZXIuTWFwTWFya2VyPigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmFycmF5SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5teUl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFja1BhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnb1Byb2ZpbGVQYWdlKCkge1xyXG4gICB0bnNPQXV0aE1vZHVsZS5lbnN1cmVWYWxpZFRva2VuKClcclxuICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5sb2dpblVzZXIodG9rZW4pXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPT4gIGNvbnNvbGUubG9nKFwiaGVyZSdzIHVzZXIgZGF0YSBjb21pbmdcIiksXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyaWVkIExvZ2dlZCBpbnRvIGZhY2Vib29rIGJ1dC4uOlwiICsgZXJyb3IpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ3N1Y2Nlc3NmdWxseSBsb2dnZWQgaW4nKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2tlbjogJyArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3VzZXJwcm9maWxlLyddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHRlc3RpbmcgJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcik7XHJcbiAgICAgICAgICAgIH0pOyAgICB9XHJcblxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5zZXRGb2N1c2FibGVJblRvdWNoTW9kZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFsgaWNvbiBtYWtlcjogcGlja3MgaW1hZ2UgaWNvbiBiYXNlZCBvbiBncm91cCwgY2FuIGV4cGFuZCB0byBhZGQgbW9yZSAqICpzb3VyY2VzLCB1c2VkIGFzIGljb24gZm9yIG1hcCBtYXJrZXJzIF1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZ3JvdXAgW3NvdXJjZSBncm91cCh1c2VyIGV2ZW50cywgbWVldHVwKV1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3BvcnQgW3Nwb3J0IHRvIG1hdGNoIGljb24gbmFtZV1cclxuICAgICAqIEByZXR1cm4ge1tzdHJpbmddfVxyXG4gICAgICovXHJcbiAgICBpY29uTWFrZXIoZ3JvdXA6IHN0cmluZywgc3BvcnQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChncm91cCA9PSAnZmFjZWJvb2snKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcG9ydCA/ICdyZXM6Ly9pbWFnZXMvYmx1ZXNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF8nICsgc3BvcnQgKyAnLmJtcCcgOiAncmVzOi8vaW1hZ2VzL2JsdWVzcG9ydGljb25zL3Nwb3J0aWNvbnMtb3JpZ2luYWxfc3BvcnQuYm1wJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gc3BvcnQgPyAncmVzOi8vaW1hZ2VzL3JlZHNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF8nICsgc3BvcnQgKyAnLmJtcCcgOiAncmVzOi8vaW1hZ2VzL3JlZHNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF9zcG9ydC5ibXAnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1hcmtlclNlbGVjdChldmVudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5kaXIoZXZlbnQubWFya2VyKTtcclxuICAgICAgICBsZXQgdXJsRXh0ID0gXCIvZXZlbnQvXCIgKyBldmVudC5tYXJrZXIudXNlckRhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybEV4dF0pO1xyXG4gICAgfVxyXG4gICAgb25TZWxlY3RFdmVudChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYXAgZXZlbnRzXHJcbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5tYXBWaWV3IHx8ICFhcmdzLm9iamVjdCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBnbWFwID0gYXJncy5vYmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXBEYXRhKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcnMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ21hcE1hcmtlcnMgPSB2YWx1ZS5tYXAoKG1hcmspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIiArIG1hcmsuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBzcmNJbWFnZSA9IC8vaW1hZ2VTb3VyY2UuZnJvbUZpbGUodGhpcy5pY29uTWFrZXIobWFyay5ncm91cC53aG8sIG1hcmsuc3BvcnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ltYWdlLnNyYyA9IHNyY0ltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5kaXIoaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUcmllZCB0byBnZXQgaW1hZ2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IG1hcmtlcjtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobWFyay52ZW51ZS5sYXQsIG1hcmsudmVudWUubG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBtYXJrLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXJrZXIuaWNvbiA9IHNyY0ltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLnVzZXJEYXRhID0gbWFyaztcclxuICAgICAgICAgICAgICAgICAgICBnbWFwLmFkZE1hcmtlcihtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXBNYXJrZXJDbHVzdGVyKGdtYXAsIHRoaXMuZ21hcE1hcmtlcnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwiZ290IHNvbWV0aGluZzogXCIgKyB2YWx1ZVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgLy8gIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgIC8vICAgICAgdHlwZTogJ01BUktFUl9SRU5FVycsIHBheWxvYWQ6IHsgbWFya2VyczogdmFsdWUgfVxyXG4gICAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5kaXIodGhpcy5tYXJrZXJzWzBdLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCBSZWFkeSBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==