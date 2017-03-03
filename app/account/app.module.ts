import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UniversalModule } from "angular2-universal";
import { NgSemanticModule } from "ng-semantic";

import { AccountRoutingModule } from "./app.routing";
import { AccountManagerModule } from "./manage/app.module";

import { SignInGuard } from "./sign-in-guard.service";
import { RegisterComponent } from "./register.component";
import { SignInComponent } from "./sign-in.component";

@NgModule({
    imports: [
        UniversalModule,
        NgSemanticModule,
        AccountRoutingModule,
        AccountManagerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RegisterComponent,
        SignInComponent,
    ],
    providers: [
        SignInGuard,
    ],
})
export class AccountModule
{
}