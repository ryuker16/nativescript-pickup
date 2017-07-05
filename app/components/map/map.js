Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import {ImageSource} from "image-source";
//var imageSource = require("image-source");
var element_registry_1 = require("nativescript-angular/element-registry");
//import {mapsModule} from "nativescript-google-maps-sdk";
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var store_1 = require("@ngrx/store");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var action_1 = require("../../actions/action");
var router_1 = require("@angular/router");
//"data/observable-array"
var router_2 = require("nativescript-angular/router");
// var mapbox = require("nativescript-mapbox");
// registerElement("Mapbox", () => mapbox.Mapbox);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBdUU7QUFLdkUsMkNBQTJDO0FBQzNDLDRDQUE0QztBQUM1QywwRUFBbUY7QUFDbkYsMERBQTBEO0FBQzFELDZFQUFrRjtBQUlsRixxQ0FBb0M7QUFFcEMsMkVBQXVFO0FBQ3ZFLCtDQUFpRDtBQUNqRCwwQ0FBeUM7QUFDekMseUJBQXlCO0FBQ3pCLHNEQUF5RjtBQUV6RiwrQ0FBK0M7QUFDL0Msa0RBQWtEO0FBQ2xELGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsWUFBWTtJQVF4Qiw0Q0FBNEM7SUFFekMsc0JBQW9CLEtBQWlCLEVBQVUsTUFBYyxFQUFVLFVBQXNCLEVBQVMsZ0JBQWtDO1FBQXBILFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDcEksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGtDQUFlLEVBQW9CLENBQUM7UUFHOUQsaUNBQWlDO1FBQ2pDLDBCQUEwQjtRQUMxQixrQ0FBa0M7UUFDbEMsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3QiwrQkFBK0I7UUFDL0Isa0RBQWtEO1FBQ2xELDBEQUEwRDtRQUMxRCwyQkFBMkI7UUFDM0IsMkNBQTJDO1FBQzNDLDJDQUEyQztRQUMzQyx3RUFBd0U7UUFDeEUsc0NBQXNDO1FBQ3RDLDJDQUEyQztRQUMzQyxzR0FBc0c7UUFDdEcseUJBQXlCO1FBQ3pCLG9EQUFvRDtRQUNwRCxvQkFBb0I7UUFDcEIsRUFBRTtRQUNGLGtCQUFrQjtRQUNsQixFQUFFO1FBQ0YsWUFBWTtRQUNaLFVBQVU7SUFDZCxDQUFDO0lBT0Q7OztPQUdHO0lBQ0gsbUNBQVksR0FBWixVQUFh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LElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFDSCw4Q0FBOEM7WUFDOUMsaURBQWlEO1lBQ25ELHlCQUF5QjtZQUN6Qix5REFBeUQ7WUFDekQsT0FBTztZQUNMLG9DQUFvQztRQUN4QyxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUF0S0QsSUFzS0M7QUF0S1ksWUFBWTtJQUx4QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSxZQUFZO0tBQzVCLENBQUM7cUNBVzZCLGFBQUssRUFBdUIsZUFBTSxFQUFzQixtQkFBVSxFQUEyQix5QkFBZ0I7R0FWL0gsWUFBWSxDQXNLeEI7QUF0S1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQge0dyaWRMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQge0ltYWdlfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG4vL2ltcG9ydCB7SW1hZ2VTb3VyY2V9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuLy92YXIgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQsIFZpZXdDbGFzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbi8vaW1wb3J0IHttYXBzTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiO1xyXG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbn0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XHJcbmltcG9ydCB7c2V0dXBNYXJrZXJDbHVzdGVyfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtdXRpbHMnO1xyXG5pbXBvcnQge21hcmtlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvbWFya2VyJztcclxuaW1wb3J0IHt1c2VyfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ludGVyZmFjZS91c2VyJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSAgZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlfSBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbic7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuLy9cImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiXHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuZGVjbGFyZSB2YXIgb3JnOiBhbnk7XHJcbi8vIHZhciBtYXBib3ggPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKTtcclxuLy8gcmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IG1hcGJveC5NYXBib3gpO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IE1hcFZpZXcpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm1hcC1jb21wb25lbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWFwLmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgbWFya2VyczogQXJyYXk8bWFya2VyLk1hcE1hcmtlcj47XHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjtcclxuICAgIHB1YmxpYyB0ZXN0O1xyXG4gICAgcHVibGljIGdtYXBNYXJrZXJzO1xyXG4gICAgcHVibGljIHJldHVybmVkRXZlbnRzOiBPYnNlcnZhYmxlQXJyYXk8bWFya2VyLk1hcE1hcmtlcj47XHJcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XHJcblxyXG4gLy9AVmlld0NoaWxkKFwiTWFwVmlld1wiKSBtYXBWaWV3OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSwgcHVibGljIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgICB0aGlzLnJldHVybmVkRXZlbnRzID0gbmV3IE9ic2VydmFibGVBcnJheTxtYXJrZXIuTWFwTWFya2VyPigpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlXHJcbiAgICAgICAgLy8gICAgIC5zZWxlY3QoJ21haW5EYXRhJylcclxuICAgICAgICAvLyAgICAgLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmRpcihkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiaGlcIik7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVlZWNpZXZlZCBtYXJrZXJzIVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLm1hcmtlcnMgPSBkYXRhLm1hcmtlcnMubWFwKChtYXJrKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsYXQ6IG1hcmsudmVudWUubGF0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbG5nOiBtYXJrLnZlbnVlLmxvbixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiB0aGlzLmljb25NYWtlcihtYXJrLmdyb3VwLCBtYXJrLnNwb3J0KSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhOiBtYXJrLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgb25UYXA6IChtYXJrZXIpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsRXh0ID0gXCIvZXZlbnQvXCIgKyBtYXJrLmlkOyB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3VybEV4dF0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vb25DYWxsb3V0VGFwOiB0aGlzLnRhcENhbGwsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbc2VhcmNoU3BvcnRzIHNvcnRzIHNlYXJjaCBiYXIgcmVzdWx0cyBhbmQgcmV0dXJuIG1hdGNoaW5nIGV2ZW50c11cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hFbnRyeSBbc2VhcmNoIGJhciBldmVudCB0cmlnZ2VyZWQgYnkga2V5IHVwXVxyXG4gICAgICovXHJcbiAgICBzZWFyY2hTcG9ydHMoc2VhcmNoRW50cnk6IGFueSkge1xyXG4gICAgICAgIGxldCB3b3JkczogYW55ID0gPFNlYXJjaEJhcj5zZWFyY2hFbnRyeS5vYmplY3QudGV4dDtcclxuICAgICAgICBjb25zb2xlLmRpcih3b3Jkcyk7XHJcbiAgICAgICAgbGV0IG1hdGNoRXZlbnRzOiBBcnJheTxtYXJrZXIuTWFwTWFya2VyPiA9IFtdO1xyXG4gICAgICAgIGlmICh3b3Jkcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubWFya2Vycykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaDEgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2Vyc1tpXS5ncm91cC5uYW1lLnRvTG93ZXJDYXNlKCkuc2VhcmNoKHdvcmRzLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaDIgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2Vyc1tpXS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLnNlYXJjaCh3b3Jkcy50b0xvd2VyQ2FzZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoMSAhPT1cclxuICAgICAgICAgICAgICAgICAgICAtMSB8fCBzZWFyY2gyICE9PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaEV2ZW50cy5wdXNoKHRoaXMubWFya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21hdGNoIGZvdW5kIScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmV0dXJuZWRFdmVudHMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PG1hcmtlci5NYXBNYXJrZXI+KG1hdGNoRXZlbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5yZXR1cm5lZEV2ZW50cyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8bWFya2VyLk1hcE1hcmtlcj4oKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5hcnJheUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXlJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2tQYWdlKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5zZXRGb2N1c2FibGVJblRvdWNoTW9kZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFsgaWNvbiBtYWtlcjogcGlja3MgaW1hZ2UgaWNvbiBiYXNlZCBvbiBncm91cCwgY2FuIGV4cGFuZCB0byBhZGQgbW9yZSAqICpzb3VyY2VzLCB1c2VkIGFzIGljb24gZm9yIG1hcCBtYXJrZXJzIF1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZ3JvdXAgW3NvdXJjZSBncm91cCh1c2VyIGV2ZW50cywgbWVldHVwKV1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gc3BvcnQgW3Nwb3J0IHRvIG1hdGNoIGljb24gbmFtZV1cclxuICAgICAqIEByZXR1cm4ge1tzdHJpbmddfVxyXG4gICAgICovXHJcbiAgICBpY29uTWFrZXIoZ3JvdXA6IHN0cmluZywgc3BvcnQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChncm91cCA9PSAnZmFjZWJvb2snKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcG9ydCA/ICdyZXM6Ly9pbWFnZXMvYmx1ZXNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF8nICsgc3BvcnQgKyAnLmJtcCcgOiAncmVzOi8vaW1hZ2VzL2JsdWVzcG9ydGljb25zL3Nwb3J0aWNvbnMtb3JpZ2luYWxfc3BvcnQuYm1wJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gc3BvcnQgPyAncmVzOi8vaW1hZ2VzL3JlZHNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF8nICsgc3BvcnQgKyAnLmJtcCcgOiAncmVzOi8vaW1hZ2VzL3JlZHNwb3J0aWNvbnMvc3BvcnRpY29ucy1vcmlnaW5hbF9zcG9ydC5ibXAnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1hcmtlclNlbGVjdChldmVudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5kaXIoZXZlbnQubWFya2VyKTtcclxuICAgICAgICBsZXQgdXJsRXh0ID0gXCIvZXZlbnQvXCIgKyBldmVudC5tYXJrZXIudXNlckRhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybEV4dF0pO1xyXG4gICAgfVxyXG4gICAgb25TZWxlY3RFdmVudChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYXAgZXZlbnRzXHJcbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5tYXBWaWV3IHx8ICFhcmdzLm9iamVjdCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBnbWFwID0gYXJncy5vYmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXBEYXRhKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcnMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ21hcE1hcmtlcnMgPSB2YWx1ZS5tYXAoKG1hcmspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIiArIG1hcmsuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBzcmNJbWFnZSA9IC8vaW1hZ2VTb3VyY2UuZnJvbUZpbGUodGhpcy5pY29uTWFrZXIobWFyay5ncm91cC53aG8sIG1hcmsuc3BvcnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ltYWdlLnNyYyA9IHNyY0ltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5kaXIoaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUcmllZCB0byBnZXQgaW1hZ2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IG1hcmtlcjtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobWFyay52ZW51ZS5sYXQsIG1hcmsudmVudWUubG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBtYXJrLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXJrZXIuaWNvbiA9IHNyY0ltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLnVzZXJEYXRhID0gbWFyaztcclxuICAgICAgICAgICAgICAgICAgICBnbWFwLmFkZE1hcmtlcihtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXBNYXJrZXJDbHVzdGVyKGdtYXAsIHRoaXMuZ21hcE1hcmtlcnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwiZ290IHNvbWV0aGluZzogXCIgKyB2YWx1ZVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgLy8gIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgIC8vICAgICAgdHlwZTogJ01BUktFUl9SRU5FVycsIHBheWxvYWQ6IHsgbWFya2VyczogdmFsdWUgfVxyXG4gICAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5kaXIodGhpcy5tYXJrZXJzWzBdLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCBSZWFkeSBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==