import { NgModule } from "@angular/core";
import { UniversalModule } from "angular2-universal";
import { NgSemanticModule } from "ng-semantic";

import { RoutingModule } from "./app.routing";

import { RolesComponent } from "./roles.component";

@NgModule({
    imports: [
        UniversalModule,
        NgSemanticModule,
        RoutingModule,
    ],
    declarations: [
        RolesComponent,
    ],
})
export class ManagerAppModule
{
}