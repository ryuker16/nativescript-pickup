import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
//import { Route  } from "@angular/router";
import {UserComponent} from "./components/userprofile/userprofile";
import {AppComponent } from "./app.component";
import {MapComponent} from "./components/map/map";
import {EventComponent} from "./components/event/event";

const routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "map", component: MapComponent },
    { path: "event/:id", component: EventComponent },
    { path: "userprofile", component: UserComponent }
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
