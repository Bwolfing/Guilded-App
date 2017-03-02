import "angular2-universal-polyfills/browser";
import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from "angular2-universal";
import { AppModule } from './app.module';
import 'rxjs/add/operator/map';
import "bootstrap";
import "../assets/semantic/dist/semantic.js";
enableProdMode();

const platform = platformUniversalDynamic();
const bootApp = () => {
    platform.bootstrapModule(AppModule).catch(err => console.error(err));
}

if (document.readyState === "complete")
{
    bootApp();
}
else
{
    document.addEventListener("DOMContentLoaded", bootApp);
}