"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var action_1 = require("../../actions/action");
var router_1 = require("@angular/router");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var router_2 = require("nativescript-angular/router");
var UserComponent = (function () {
    function UserComponent(store, router, mapService, routerExtensions) {
        this.store = store;
        this.router = router;
        this.mapService = mapService;
        this.routerExtensions = routerExtensions;
        //Observable<Array<user.UserProfile>>;
        // user made markers to list in profile.
        this.userMarkers = new observable_array_1.ObservableArray();
        // user attending event markers to list in profile.
        this.userAttending = new observable_array_1.ObservableArray();
        // user maybe attending markers to list in profile.
        this.userMaybe = new observable_array_1.ObservableArray();
        this.userData = store.select('loginData');
        // this.markers = store.select('mapData');
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select('comboData').subscribe(function (data) {
            _this.setMarkers(data.loginReducer.facebook, data.markerReducer);
        });
    };
    UserComponent.prototype.goBackPage = function () {
        this.routerExtensions.back();
    };
    UserComponent.prototype.goToEvent = function (event) {
        console.log(event.bindingContext.id);
        var urlExt = "/event/" + event.bindingContext.id;
        this.router.navigate([urlExt]);
    };
    /**
     * [setMarkers idenfify User Made events then set user attending/maybe going events for user profile]
     * @param {string} userId [user id string]
     */
    UserComponent.prototype.setMarkers = function (userId, markers) {
        // return first user match value/object
        var findGoing = function (element) {
            return element.member.facebookId === userId;
        };
        for (var i in markers) {
            if (markers[i] && markers[i].group) {
                console.log(markers[i].group.who);
                if (markers[i].group.who === 'facebook') {
                    if (markers[i].group.facebookId === userId) {
                        this.userAttending.push(markers[i]);
                    }
                    else {
                        var attending = markers[i].rsvp_sample.find(findGoing);
                        console.log(attending);
                        if (attending !== undefined) {
                            this.userMarkers.push(markers[i]);
                        }
                    }
                }
            }
        }
    };
    ;
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "user-component",
        templateUrl: "./userprofile.html",
    }),
    __metadata("design:paramtypes", [store_1.Store, router_1.Router, action_1.MapService, router_2.RouterExtensions])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VycHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUd6RSxxQ0FBb0M7QUFJcEMsK0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QywyRUFBeUU7QUFFekUsc0RBQXlGO0FBT3pGLElBQWEsYUFBYTtJQWF0Qix1QkFBb0IsS0FBaUIsRUFBVSxNQUFjLEVBQVUsVUFBc0IsRUFBUyxnQkFBa0M7UUFBcEgsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVJ4SSxzQ0FBc0M7UUFDdEMsd0NBQXdDO1FBQ3hDLGdCQUFXLEdBQUcsSUFBSSxrQ0FBZSxFQUFvQixDQUFDO1FBQ3RELG1EQUFtRDtRQUNuRCxrQkFBYSxHQUFHLElBQUksa0NBQWUsRUFBb0IsQ0FBQztRQUN4RCxtREFBbUQ7UUFDbkQsY0FBUyxHQUFHLElBQUksa0NBQWUsRUFBb0IsQ0FBQztRQUloRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsMENBQTBDO0lBQzlDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFTO1lBQy9DLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGtDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsS0FBSztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLE1BQU0sR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFFSCxrQ0FBVSxHQUFWLFVBQVcsTUFBYyxFQUFFLE9BQWdDO1FBQ3ZELHVDQUF1QztRQUN2QyxJQUFJLFNBQVMsR0FBRyxVQUFDLE9BQTBCO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUM7UUFDaEQsQ0FBQyxDQUFDO1FBRUYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxTQUFTLEdBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDO0lBSU4sb0JBQUM7QUFBRCxDQUFDLEFBbEVELElBa0VDO0FBbEVZLGFBQWE7SUFMekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQztxQ0FjNkIsYUFBSyxFQUF1QixlQUFNLEVBQXNCLG1CQUFVLEVBQTJCLHlCQUFnQjtHQWIvSCxhQUFhLENBa0V6QjtBQWxFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcclxuaW1wb3J0IHsgbWFya2VyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvbWFya2VyJztcclxuaW1wb3J0IHsgdXNlciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW50ZXJmYWNlL3VzZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvYWN0aW9uJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucywgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwidXNlci1jb21wb25lbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdXNlcnByb2ZpbGUuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvLyB1c2VyIG1hcmtlcnNcclxuICAgIC8vbWFya2VyczogT2JzZXJ2YWJsZTxBcnJheTxtYXJrZXIuTWFwTWFya2VyPj47XHJcbiAgICAvLyBzdG9yZWQgcHJvZmlsZSBkYXRhLlxyXG4gICAgdXNlckRhdGE6IE9ic2VydmFibGU8dXNlci5Vc2VyUHJvZmlsZT47XHJcbiAgICAvL09ic2VydmFibGU8QXJyYXk8dXNlci5Vc2VyUHJvZmlsZT4+O1xyXG4gICAgLy8gdXNlciBtYWRlIG1hcmtlcnMgdG8gbGlzdCBpbiBwcm9maWxlLlxyXG4gICAgdXNlck1hcmtlcnMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PG1hcmtlci5NYXBNYXJrZXI+KCk7XHJcbiAgICAvLyB1c2VyIGF0dGVuZGluZyBldmVudCBtYXJrZXJzIHRvIGxpc3QgaW4gcHJvZmlsZS5cclxuICAgIHVzZXJBdHRlbmRpbmcgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PG1hcmtlci5NYXBNYXJrZXI+KCk7XHJcbiAgICAvLyB1c2VyIG1heWJlIGF0dGVuZGluZyBtYXJrZXJzIHRvIGxpc3QgaW4gcHJvZmlsZS5cclxuICAgIHVzZXJNYXliZSA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8bWFya2VyLk1hcE1hcmtlcj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+LCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHB1YmxpYyByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBzdG9yZS5zZWxlY3QoJ2xvZ2luRGF0YScpO1xyXG4gICAgICAgIC8vIHRoaXMubWFya2VycyA9IHN0b3JlLnNlbGVjdCgnbWFwRGF0YScpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuc2VsZWN0KCdjb21ib0RhdGEnKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1hcmtlcnMoZGF0YS5sb2dpblJlZHVjZXIuZmFjZWJvb2ssIGRhdGEubWFya2VyUmVkdWNlcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrUGFnZSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9FdmVudChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmJpbmRpbmdDb250ZXh0LmlkKTtcclxuICAgICAgICBsZXQgdXJsRXh0ID0gXCIvZXZlbnQvXCIgKyBldmVudC5iaW5kaW5nQ29udGV4dC5pZDtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdXJsRXh0XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbc2V0TWFya2VycyBpZGVuZmlmeSBVc2VyIE1hZGUgZXZlbnRzIHRoZW4gc2V0IHVzZXIgYXR0ZW5kaW5nL21heWJlIGdvaW5nIGV2ZW50cyBmb3IgdXNlciBwcm9maWxlXVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCBbdXNlciBpZCBzdHJpbmddXHJcbiAgICAgKi9cclxuXHJcbiAgICBzZXRNYXJrZXJzKHVzZXJJZDogc3RyaW5nLCBtYXJrZXJzOiBBcnJheTxtYXJrZXIuTWFwTWFya2VyPik6IHZvaWQge1xyXG4gICAgICAgIC8vIHJldHVybiBmaXJzdCB1c2VyIG1hdGNoIHZhbHVlL29iamVjdFxyXG4gICAgICAgIGxldCBmaW5kR29pbmcgPSAoZWxlbWVudDogbWFya2VyLlJzdnBTYW1wbGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQubWVtYmVyLmZhY2Vib29rSWQgPT09IHVzZXJJZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIG1hcmtlcnMpIHtcclxuICAgICAgICAgICAgaWYgKG1hcmtlcnNbaV0gJiYgbWFya2Vyc1tpXS5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWFya2Vyc1tpXS5ncm91cC53aG8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlcnNbaV0uZ3JvdXAud2hvID09PSAnZmFjZWJvb2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlcnNbaV0uZ3JvdXAuZmFjZWJvb2tJZCA9PT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckF0dGVuZGluZy5wdXNoKG1hcmtlcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbmRpbmc6IGFueSA9IG1hcmtlcnNbaV0ucnN2cF9zYW1wbGUuZmluZChmaW5kR29pbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ZW5kaW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlck1hcmtlcnMucHVzaChtYXJrZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcbn1cclxuIl19