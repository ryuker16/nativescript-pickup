Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var action_1 = require("../../actions/action");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var UserComponent = (function () {
    function UserComponent(store, router, mapService, routerExtensions) {
        this.store = store;
        this.router = router;
        this.mapService = mapService;
        this.routerExtensions = routerExtensions;
        this.markers = store.select('mapData');
        //console.dir(this.markers);
        this.userData = store.select('loginData');
        //console.dir(this.userData);
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.goToEvent = function (event) {
        var urlExt = "/event/" + event.bindingContext.id;
        this.router.navigate([urlExt]);
    };
    /**
     * [setMarkers idenfify User Made events then set user attending/maybe going events for user profile]
     * @param {string} userId [user id string]
     */
    UserComponent.prototype.setMarkers = function (userId) {
        // return first user match value/object
        var findGoing = function (element) {
            return element.member.facebookId === userId;
        };
        var newMaybeMarkers = [];
        var newAttendingMarkers = [];
        var newUserMarkers = [];
        for (var i in this.markers) {
            if (this.markers[i].group.who === 'facebook') {
                if (this.markers[i].group.facebookId === userId) {
                    newUserMarkers.push(this.markers[i]);
                }
                else {
                    var attending = this.markers[i].rsvp_sample.find(findGoing);
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
    ;
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "user-component",
        styles: ['.odd { background-color: red;}',
            '.even {background-color: blue;}'
        ],
        templateUrl: "./userprofile.html",
    }),
    __metadata("design:paramtypes", [store_1.Store, router_1.Router, action_1.MapService, router_2.RouterExtensions])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VycHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlFO0FBR3pFLHFDQUFvQztBQUlwQywrQ0FBa0Q7QUFDbEQsMENBQXlDO0FBR3pDLHNEQUF5RjtBQVV6RixJQUFhLGFBQWE7SUFjdEIsdUJBQW9CLEtBQWlCLEVBQVUsTUFBYyxFQUFVLFVBQXNCLEVBQVMsZ0JBQWtDO1FBQXBILFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDcEksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsNkJBQTZCO0lBR2hDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBR0EsQ0FBQztJQUVELGlDQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ1gsSUFBSSxNQUFNLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsa0NBQVUsR0FBVixVQUFXLE1BQWM7UUFDckIsdUNBQXVDO1FBQ3ZDLElBQUksU0FBUyxHQUFHLFVBQUMsT0FBMEI7WUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztRQUNoRCxDQUFDLENBQUM7UUFFRixJQUFJLGVBQWUsR0FBdUIsRUFBRSxDQUFDO1FBQzdDLElBQUksbUJBQW1CLEdBQXVCLEVBQUUsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBdUIsRUFBRSxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDOUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxTQUFTLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUEsQ0FBQztJQUlOLG9CQUFDO0FBQUQsQ0FBQyxBQXRFRCxJQXNFQztBQXRFWSxhQUFhO0lBUnpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixNQUFNLEVBQUUsQ0FBQyxnQ0FBZ0M7WUFDN0MsaUNBQWlDO1NBQ2hDO1FBQ0csV0FBVyxFQUFFLG9CQUFvQjtLQUNwQyxDQUFDO3FDQWU2QixhQUFLLEVBQXVCLGVBQU0sRUFBc0IsbUJBQVUsRUFBMkIseUJBQWdCO0dBZC9ILGFBQWEsQ0FzRXpCO0FBdEVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xyXG5pbXBvcnQgeyBtYXJrZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ludGVyZmFjZS9tYXJrZXInO1xyXG5pbXBvcnQgeyB1c2VyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvdXNlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucywgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwidXNlci1jb21wb25lbnRcIixcclxuICAgIHN0eWxlczogWycub2RkIHsgYmFja2dyb3VuZC1jb2xvcjogcmVkO30nLFxyXG4nLmV2ZW4ge2JhY2tncm91bmQtY29sb3I6IGJsdWU7fSdcclxuXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdXNlcnByb2ZpbGUuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvLyB1c2VyIG1hcmtlcnNcclxuICAgIG1hcmtlcnM6IE9ic2VydmFibGU8QXJyYXk8bWFya2VyLk1hcE1hcmtlcj4+O1xyXG4gICAgLy8gc3RvcmVkIHByb2ZpbGUgZGF0YS5cclxuICAgIHVzZXJEYXRhOiBPYnNlcnZhYmxlPHVzZXIuVXNlclByb2ZpbGU+O1xyXG4gICAgLy9PYnNlcnZhYmxlPEFycmF5PHVzZXIuVXNlclByb2ZpbGU+PjtcclxuICAgIC8vdXNlci5Vc2VyUHJvZmlsZTtcclxuICAgIC8vIHVzZXIgbWFkZSBtYXJrZXJzIHRvIGxpc3QgaW4gcHJvZmlsZS5cclxuICAgIHVzZXJNYXJrZXJzOiBtYXJrZXIuTWFwTWFya2VyW107XHJcbiAgICAvLyB1c2VyIGF0dGVuZGluZyBldmVudCBtYXJrZXJzIHRvIGxpc3QgaW4gcHJvZmlsZS5cclxuICAgIHVzZXJBdHRlbmRpbmc6IG1hcmtlci5NYXBNYXJrZXJbXTtcclxuICAgIC8vIHVzZXIgbWF5YmUgYXR0ZW5kaW5nIG1hcmtlcnMgdG8gbGlzdCBpbiBwcm9maWxlLlxyXG4gICAgdXNlck1heWJlOiBtYXJrZXIuTWFwTWFya2VyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwdWJsaWMgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIHRoaXMubWFya2VycyA9IHN0b3JlLnNlbGVjdCgnbWFwRGF0YScpO1xyXG4gICAgICAgIC8vY29uc29sZS5kaXIodGhpcy5tYXJrZXJzKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhID0gc3RvcmUuc2VsZWN0KCdsb2dpbkRhdGEnKTtcclxuICAgICAgIC8vY29uc29sZS5kaXIodGhpcy51c2VyRGF0YSk7XHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnb1RvRXZlbnQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgdXJsRXh0ID0gXCIvZXZlbnQvXCIgKyBldmVudC5iaW5kaW5nQ29udGV4dC5pZDtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdXJsRXh0XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbc2V0TWFya2VycyBpZGVuZmlmeSBVc2VyIE1hZGUgZXZlbnRzIHRoZW4gc2V0IHVzZXIgYXR0ZW5kaW5nL21heWJlIGdvaW5nIGV2ZW50cyBmb3IgdXNlciBwcm9maWxlXVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCBbdXNlciBpZCBzdHJpbmddXHJcbiAgICAgKi9cclxuXHJcbiAgICBzZXRNYXJrZXJzKHVzZXJJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy8gcmV0dXJuIGZpcnN0IHVzZXIgbWF0Y2ggdmFsdWUvb2JqZWN0XHJcbiAgICAgICAgbGV0IGZpbmRHb2luZyA9IChlbGVtZW50OiBtYXJrZXIuUnN2cFNhbXBsZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5tZW1iZXIuZmFjZWJvb2tJZCA9PT0gdXNlcklkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBuZXdNYXliZU1hcmtlcnM6IG1hcmtlci5NYXBNYXJrZXJbXSA9IFtdO1xyXG4gICAgICAgIGxldCBuZXdBdHRlbmRpbmdNYXJrZXJzOiBtYXJrZXIuTWFwTWFya2VyW10gPSBbXTtcclxuICAgICAgICBsZXQgbmV3VXNlck1hcmtlcnM6IG1hcmtlci5NYXBNYXJrZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubWFya2Vycykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXJrZXJzW2ldLmdyb3VwLndobyA9PT0gJ2ZhY2Vib29rJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2Vyc1tpXS5ncm91cC5mYWNlYm9va0lkID09PSB1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyTWFya2Vycy5wdXNoKHRoaXMubWFya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbmRpbmc6IGFueSA9IHRoaXMubWFya2Vyc1tpXS5yc3ZwX3NhbXBsZS5maW5kKGZpbmRHb2luZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0ZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ZW5kaW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QXR0ZW5kaW5nTWFya2Vycy5wdXNoKHRoaXMubWFya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXNlck1hcmtlcnMgPSBuZXdVc2VyTWFya2VycztcclxuICAgICAgICB0aGlzLnVzZXJBdHRlbmRpbmcgPSBuZXdBdHRlbmRpbmdNYXJrZXJzO1xyXG4gICAgICAgIHRoaXMudXNlck1heWJlID0gbmV3TWF5YmVNYXJrZXJzO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnVXNlciBFdmVudHM6ICcgKyB0aGlzLnVzZXJBdHRlbmRpbmcpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxufVxyXG4iXX0=