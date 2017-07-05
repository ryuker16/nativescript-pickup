Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var action_1 = require("../../actions/action");
var router_2 = require("nativescript-angular/router");
var EventComponent = (function () {
    function EventComponent(route, mapService, routerExtensions, store) {
        this.route = route;
        this.mapService = mapService;
        this.routerExtensions = routerExtensions;
        this.store = store;
        this.deleted = false;
    }
    EventComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.models = this.model;
        console.log("init evoked");
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log("Found match" + _this.id);
            if (params['id']) {
                console.log(params);
                console.log('param id match in ' + _this.id);
                _this.modelall = _this.mapService.getEvent(_this.id);
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
    };
    EventComponent.prototype.goBackPage = function () {
        this.routerExtensions.back();
    };
    return EventComponent;
}());
EventComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "event-component",
        templateUrl: "./event.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, action_1.MapService, router_2.RouterExtensions, store_1.Store])
], EventComponent);
exports.EventComponent = EventComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMENBQWlEO0FBQ2pELHNDQUFtSDtBQVFuSCxxQ0FBb0M7QUFFcEMsK0NBQWlEO0FBQ2pELHNEQUErRDtBQVEvRCxJQUFhLGNBQWM7SUFLdkIsd0JBQW9CLEtBQXFCLEVBQVUsVUFBc0IsRUFBVSxnQkFBa0MsRUFBVSxLQUFpQjtRQUE1SCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUM1SSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBR0QsaUNBQVEsR0FBUjtRQUFBLGlCQXlCQztRQXhCRywyQkFBMkI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzlCLEtBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEQsd0RBQXdEO2dCQUN4RCwyQkFBMkI7Z0JBQzNCLHdDQUF3QztnQkFDeEMsa0NBQWtDO2dCQUNsQyxzQ0FBc0M7Z0JBQ3RDLHFDQUFxQztnQkFDckMseUVBQXlFO2dCQUN6RSxnQ0FBZ0M7Z0JBQ2hDLGdDQUFnQztnQkFDaEMsbUNBQW1DO2dCQUNuQyxFQUFFO2dCQUNGLFVBQVU7WUFDZCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsY0FBYztLQUM5QixDQUFDO3FDQU02Qix1QkFBYyxFQUFzQixtQkFBVSxFQUE0Qix5QkFBZ0IsRUFBaUIsYUFBSztHQUxsSSxjQUFjLENBd0MxQjtBQXhDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG4vL2ltcG9ydCB7cmVnaXN0ZXJFbGVtZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG4vLyBpbXBvcnQge21hcHNNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCI7XHJcbi8vY29uc3QgbWFwc01vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpO1xyXG4vLyAvaW1wb3J0IHtEdW1iQ29tcG9uZW50fSBmcm9tIFwiLi9kdW1iL2R1bWJFdmVudFwiO1xyXG5pbXBvcnQge21hcmtlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvbWFya2VyJztcclxuaW1wb3J0IHt1c2VyfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ludGVyZmFjZS91c2VyJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlfSBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbic7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwiZXZlbnQtY29tcG9uZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2V2ZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIGRlbGV0ZWQ6IGJvb2xlYW47XHJcbiAgICBtb2RlbGFsbDogT2JzZXJ2YWJsZTxBcnJheTxtYXJrZXIuTWFwTWFya2VyPj5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy90aGlzLm1vZGVscyA9IHRoaXMubW9kZWw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0IGV2b2tlZFwiKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBtYXRjaFwiICsgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXNbJ2lkJ10pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFyYW0gaWQgbWF0Y2ggaW4gJyArIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbGFsbCA9IHRoaXMubWFwU2VydmljZS5nZXRFdmVudCh0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5tYXBTZXJ2aWNlLmdldEV2ZW50KHRoaXMuaWQpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhWzBdLnZlbnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy90aGlzLm1vZGVsID0gZGF0YVswXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZGF0YVswXS52ZW51ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vY29uc29sZS5kaXIoZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiaWQgZm9yIGZvciBkYXRhIGluIHRoaXMubW9kZWxzIDogXCIgKyBkYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy90aGlzLm1vZGVscyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubW9kZWxhbGwgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvL3RoaXMudGVzdE1vZGVsID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFja1BhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=