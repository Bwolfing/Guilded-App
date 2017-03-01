import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from "angular2-universal";
import { AppModule } from './app.module';
import 'rxjs/add/operator/map';
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