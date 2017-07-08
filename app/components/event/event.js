"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUFpRDtBQUNqRCxzQ0FBbUg7QUFRbkgscUNBQW9DO0FBRXBDLCtDQUFpRDtBQUNqRCxzREFBK0Q7QUFRL0QsSUFBYSxjQUFjO0lBS3ZCLHdCQUFvQixLQUFxQixFQUFVLFVBQXNCLEVBQVUsZ0JBQWtDLEVBQVUsS0FBaUI7UUFBNUgsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDNUksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUdELGlDQUFRLEdBQVI7UUFBQSxpQkF5QkM7UUF4QkcsMkJBQTJCO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM5QixLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELHdEQUF3RDtnQkFDeEQsMkJBQTJCO2dCQUMzQix3Q0FBd0M7Z0JBQ3hDLGtDQUFrQztnQkFDbEMsc0NBQXNDO2dCQUN0QyxxQ0FBcUM7Z0JBQ3JDLHlFQUF5RTtnQkFDekUsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7Z0JBQ2hDLG1DQUFtQztnQkFDbkMsRUFBRTtnQkFDRixVQUFVO1lBQ2QsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVNLG1DQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLGNBQWM7S0FDOUIsQ0FBQztxQ0FNNkIsdUJBQWMsRUFBc0IsbUJBQVUsRUFBNEIseUJBQWdCLEVBQWlCLGFBQUs7R0FMbEksY0FBYyxDQXdDMUI7QUF4Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIEFmdGVyVmlld0NoZWNrZWQsIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuLy9pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuLy8gaW1wb3J0IHttYXBzTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiO1xyXG4vL2NvbnN0IG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcclxuLy8gL2ltcG9ydCB7RHVtYkNvbXBvbmVudH0gZnJvbSBcIi4vZHVtYi9kdW1iRXZlbnRcIjtcclxuaW1wb3J0IHttYXJrZXJ9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW50ZXJmYWNlL21hcmtlcic7XHJcbmltcG9ydCB7dXNlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvdXNlcic7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZX0gZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcImV2ZW50LWNvbXBvbmVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ldmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEV2ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBkZWxldGVkOiBib29sZWFuO1xyXG4gICAgbW9kZWxhbGw6IE9ic2VydmFibGU8QXJyYXk8bWFya2VyLk1hcE1hcmtlcj4+XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5tb2RlbHMgPSB0aGlzLm1vZGVsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCBldm9rZWRcIik7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgbWF0Y2hcIiArIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zWydpZCddKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtIGlkIG1hdGNoIGluICcgKyB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxhbGwgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0RXZlbnQodGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubWFwU2VydmljZS5nZXRFdmVudCh0aGlzLmlkKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YVswXS52ZW51ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vdGhpcy5tb2RlbCA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZGlyKGRhdGFbMF0udmVudWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvL2NvbnNvbGUuZGlyKGRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImlkIGZvciBmb3IgZGF0YSBpbiB0aGlzLm1vZGVscyA6IFwiICsgZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vdGhpcy5tb2RlbHMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLm1vZGVsYWxsID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy90aGlzLnRlc3RNb2RlbCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2tQYWdlKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19