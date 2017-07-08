import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { StoreModule } from '@ngrx/store';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app.routing";
import { markerReducer } from "./store/markerReducer";
import { loginReducer } from "./store/loginReducer";
import { loginMapReducer } from "./store/loginMapReducer";

import { MapService } from './actions/action';

import { AppComponent } from "./app.component";

import { UserComponent } from "./components/userprofile/userprofile";
import { MapComponent } from "./components/map/map";
import { EventComponent } from "./components/event/event";
import { MakeComponent } from "./components/make/make";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule, NativeScriptFormsModule,
        NativeScriptHttpModule, StoreModule.provideStore({ mapData: markerReducer, loginData: loginReducer, comboData: loginMapReducer }),
        AppRoutingModule
    ],
    declarations: [
        UserComponent,
        AppComponent,
        MapComponent,
        EventComponent,
        MakeComponent
    ],
    providers: [
        MapService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
