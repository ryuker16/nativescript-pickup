Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var store_1 = require("@ngrx/store");
var http_1 = require("nativescript-angular/http");
var forms_1 = require("nativescript-angular/forms");
var userprofile_1 = require("./components/userprofile/userprofile");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
//import {MapsModule} from 'nativescript-google-maps-sdk';
var markerReducer_1 = require("./store/markerReducer");
var action_1 = require("./actions/action");
//import {routes} from "./routerConfig";
var map_1 = require("./components/map/map");
var event_1 = require("./components/event/event");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule, forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule, store_1.StoreModule.provideStore({ mapData: markerReducer_1.mapReducer, loginData: markerReducer_1.loginReducer }),
            app_routing_1.AppRoutingModule
        ],
        declarations: [
            userprofile_1.UserComponent,
            app_component_1.AppComponent,
            map_1.MapComponent,
            event_1.EventComponent
        ],
        providers: [
            action_1.MapService
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFDOUUscUNBQTBDO0FBQzFDLGtEQUFtRTtBQUNuRSxvREFBcUU7QUFDckUsb0VBQW9FO0FBQ3BFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsMERBQTBEO0FBQzFELHVEQUFnRTtBQUNoRSwyQ0FBNEM7QUFDNUMsd0NBQXdDO0FBQ3hDLDRDQUFrRDtBQUNsRCxrREFBd0Q7QUF1QnhELElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQXRCckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNMLHdDQUFrQixFQUFFLCtCQUF1QjtZQUMzQyw2QkFBc0IsRUFBRSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBVSxFQUFFLFNBQVMsRUFBRSw0QkFBWSxFQUFDLENBQUM7WUFDakcsOEJBQWdCO1NBQ25CO1FBQ0QsWUFBWSxFQUFFO1lBQ1osMkJBQWE7WUFDWCw0QkFBWTtZQUNaLGtCQUFZO1lBQ1osc0JBQWM7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDUCxtQkFBVTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IFN0b3JlTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgVXNlckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy91c2VycHJvZmlsZS91c2VycHJvZmlsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG4vL2ltcG9ydCB7TWFwc01vZHVsZX0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5pbXBvcnQge21hcFJlZHVjZXIsIGxvZ2luUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL21hcmtlclJlZHVjZXJcIjtcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSAnLi9hY3Rpb25zL2FjdGlvbic7XG4vL2ltcG9ydCB7cm91dGVzfSBmcm9tIFwiLi9yb3V0ZXJDb25maWdcIjtcbmltcG9ydCB7TWFwQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL21hcC9tYXBcIjtcbmltcG9ydCB7RXZlbnRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZXZlbnQvZXZlbnRcIjtcbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLCBTdG9yZU1vZHVsZS5wcm92aWRlU3RvcmUoeyBtYXBEYXRhOiBtYXBSZWR1Y2VyLCBsb2dpbkRhdGE6IGxvZ2luUmVkdWNlcn0pLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIFVzZXJDb21wb25lbnQsXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgTWFwQ29tcG9uZW50LFxuICAgICAgICBFdmVudENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1hcFNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19