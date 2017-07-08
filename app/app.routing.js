"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//import { Route  } from "@angular/router";
var userprofile_1 = require("./components/userprofile/userprofile");
var map_1 = require("./components/map/map");
var event_1 = require("./components/event/event");
var make_1 = require("./components/make/make");
var routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "map", component: map_1.MapComponent },
    { path: "event/:id", component: event_1.EventComponent },
    { path: "userprofile", component: userprofile_1.UserComponent },
    { path: "make", component: make_1.MakeComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFDdkUsMkNBQTJDO0FBQzNDLG9FQUFtRTtBQUVuRSw0Q0FBa0Q7QUFDbEQsa0RBQXdEO0FBQ3hELCtDQUFxRDtBQUdyRCxJQUFNLE1BQU0sR0FBRztJQUNYLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxrQkFBWSxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsc0JBQWMsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDJCQUFhLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxvQkFBYSxFQUFFO0NBQzdDLENBQUM7QUFPRixJQUFhLGdCQUFnQjtJQUE3QjtJQUFnQyxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQWpDLElBQWlDO0FBQXBCLGdCQUFnQjtJQUo1QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7S0FDdEMsQ0FBQztHQUNXLGdCQUFnQixDQUFJO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbi8vaW1wb3J0IHsgUm91dGUgIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtVc2VyQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3VzZXJwcm9maWxlL3VzZXJwcm9maWxlXCI7XG5pbXBvcnQge0FwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWFwQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL21hcC9tYXBcIjtcbmltcG9ydCB7RXZlbnRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZXZlbnQvZXZlbnRcIjtcbmltcG9ydCB7TWFrZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9tYWtlL21ha2VcIjtcblxuXG5jb25zdCByb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9tYXBcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxuICAgIHsgcGF0aDogXCJtYXBcIiwgY29tcG9uZW50OiBNYXBDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiZXZlbnQvOmlkXCIsIGNvbXBvbmVudDogRXZlbnRDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwidXNlcnByb2ZpbGVcIiwgY29tcG9uZW50OiBVc2VyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcIm1ha2VcIiwgY29tcG9uZW50OiBNYWtlQ29tcG9uZW50IH1cbl07XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH1cbiJdfQ==