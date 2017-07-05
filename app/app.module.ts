import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { StoreModule } from '@ngrx/store';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { UserComponent} from "./components/userprofile/userprofile";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
//import {MapsModule} from 'nativescript-google-maps-sdk';
import {mapReducer, loginReducer } from "./store/markerReducer";
import {MapService} from './actions/action';
//import {routes} from "./routerConfig";
import {MapComponent} from "./components/map/map";
import {EventComponent} from "./components/event/event";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule, NativeScriptFormsModule,
        NativeScriptHttpModule, StoreModule.provideStore({ mapData: mapReducer, loginData: loginReducer}),
        AppRoutingModule
    ],
    declarations: [
      UserComponent,
        AppComponent,
        MapComponent,
        EventComponent
    ],
    providers: [
        MapService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
