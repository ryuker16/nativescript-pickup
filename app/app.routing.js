Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//import { Route  } from "@angular/router";
var userprofile_1 = require("./components/userprofile/userprofile");
var map_1 = require("./components/map/map");
var event_1 = require("./components/event/event");
var routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "map", component: map_1.MapComponent },
    { path: "event/:id", component: event_1.EventComponent },
    { path: "userprofile", component: userprofile_1.UserComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
        exports: [router_1.NativeScriptRouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUN2RSwyQ0FBMkM7QUFDM0Msb0VBQW1FO0FBRW5FLDRDQUFrRDtBQUNsRCxrREFBd0Q7QUFFeEQsSUFBTSxNQUFNLEdBQUc7SUFDWCxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsa0JBQVksRUFBRTtJQUN4QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHNCQUFjLEVBQUU7SUFDaEQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwyQkFBYSxFQUFFO0NBQ3BELENBQUM7QUFPRixJQUFhLGdCQUFnQjtJQUE3QjtJQUFnQyxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQWpDLElBQWlDO0FBQXBCLGdCQUFnQjtJQUo1QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7S0FDdEMsQ0FBQztHQUNXLGdCQUFnQixDQUFJO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbi8vaW1wb3J0IHsgUm91dGUgIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtVc2VyQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3VzZXJwcm9maWxlL3VzZXJwcm9maWxlXCI7XG5pbXBvcnQge0FwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWFwQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL21hcC9tYXBcIjtcbmltcG9ydCB7RXZlbnRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZXZlbnQvZXZlbnRcIjtcblxuY29uc3Qgcm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbWFwXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7IHBhdGg6IFwibWFwXCIsIGNvbXBvbmVudDogTWFwQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImV2ZW50LzppZFwiLCBjb21wb25lbnQ6IEV2ZW50Q29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInVzZXJwcm9maWxlXCIsIGNvbXBvbmVudDogVXNlckNvbXBvbmVudCB9XG5dO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9XG4iXX0=