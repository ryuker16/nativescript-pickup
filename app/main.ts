// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import {enableProdMode} from '@angular/core';
import { AppModule } from "./app.module";
import * as tnsOAuthModule from 'nativescript-oauth';
var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '164197200662441',
    clientSecret: '9dab3afbc7a079b137fbe321ddef5916',
    scope: ['email', 'public_profile'],
};
tnsOAuthModule.initFacebook(facebookInitOptions);
enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
