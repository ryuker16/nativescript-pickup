"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var store_1 = require("@ngrx/store");
var http_1 = require("nativescript-angular/http");
var forms_1 = require("nativescript-angular/forms");
var app_routing_1 = require("./app.routing");
var markerReducer_1 = require("./store/markerReducer");
var loginReducer_1 = require("./store/loginReducer");
var loginMapReducer_1 = require("./store/loginMapReducer");
var action_1 = require("./actions/action");
var app_component_1 = require("./app.component");
var userprofile_1 = require("./components/userprofile/userprofile");
var map_1 = require("./components/map/map");
var event_1 = require("./components/event/event");
var make_1 = require("./components/make/make");
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
            http_1.NativeScriptHttpModule, store_1.StoreModule.provideStore({ mapData: markerReducer_1.markerReducer, loginData: loginReducer_1.loginReducer, comboData: loginMapReducer_1.loginMapReducer }),
            app_routing_1.AppRoutingModule
        ],
        declarations: [
            userprofile_1.UserComponent,
            app_component_1.AppComponent,
            map_1.MapComponent,
            event_1.EventComponent,
            make_1.MakeComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHFDQUEwQztBQUMxQyxrREFBbUU7QUFDbkUsb0RBQXFFO0FBQ3JFLDZDQUFpRDtBQUNqRCx1REFBc0Q7QUFDdEQscURBQW9EO0FBQ3BELDJEQUEwRDtBQUUxRCwyQ0FBOEM7QUFFOUMsaURBQStDO0FBRS9DLG9FQUFxRTtBQUNyRSw0Q0FBb0Q7QUFDcEQsa0RBQTBEO0FBQzFELCtDQUF1RDtBQXlCdkQsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBdkJyQixlQUFRLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDUCw0QkFBWTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCLEVBQUUsK0JBQXVCO1lBQzNDLDZCQUFzQixFQUFFLG1CQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUFhLEVBQUUsU0FBUyxFQUFFLDJCQUFZLEVBQUUsU0FBUyxFQUFFLGlDQUFlLEVBQUUsQ0FBQztZQUNqSSw4QkFBZ0I7U0FDbkI7UUFDRCxZQUFZLEVBQUU7WUFDViwyQkFBYTtZQUNiLDRCQUFZO1lBQ1osa0JBQVk7WUFDWixzQkFBYztZQUNkLG9CQUFhO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsbUJBQVU7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBTdG9yZU1vZHVsZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgbWFya2VyUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL21hcmtlclJlZHVjZXJcIjtcbmltcG9ydCB7IGxvZ2luUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL2xvZ2luUmVkdWNlclwiO1xuaW1wb3J0IHsgbG9naW5NYXBSZWR1Y2VyIH0gZnJvbSBcIi4vc3RvcmUvbG9naW5NYXBSZWR1Y2VyXCI7XG5cbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuL2FjdGlvbnMvYWN0aW9uJztcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBVc2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy91c2VycHJvZmlsZS91c2VycHJvZmlsZVwiO1xuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9tYXAvbWFwXCI7XG5pbXBvcnQgeyBFdmVudENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvZXZlbnQvZXZlbnRcIjtcbmltcG9ydCB7IE1ha2VDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21ha2UvbWFrZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLCBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSwgU3RvcmVNb2R1bGUucHJvdmlkZVN0b3JlKHsgbWFwRGF0YTogbWFya2VyUmVkdWNlciwgbG9naW5EYXRhOiBsb2dpblJlZHVjZXIsIGNvbWJvRGF0YTogbG9naW5NYXBSZWR1Y2VyIH0pLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVXNlckNvbXBvbmVudCxcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBNYXBDb21wb25lbnQsXG4gICAgICAgIEV2ZW50Q29tcG9uZW50LFxuICAgICAgICBNYWtlQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTWFwU2VydmljZVxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=