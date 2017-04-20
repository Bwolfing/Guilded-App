import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UniversalModule } from "angular2-universal";
import { NgSemanticModule } from "ng-semantic";

import { RoutingModule } from "./app.routing";

import { RolesComponent } from "./roles.component";
import { RoleEditorComponent } from "./role-editor.component";

@NgModule({
    imports: [
        UniversalModule,
        NgSemanticModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RolesComponent,
        RoleEditorComponent,
    ],
})
export class AdminModule
{
}