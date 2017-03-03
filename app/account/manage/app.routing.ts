import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

import { ManagerGuard } from "./manager-guard.service";
import { HomeComponent } from "./home.component";

const ROUTES: Route[] = [
    {
        path: "account",
        children: [
            {
                path: "manage",
                canActivateChild: [
                    ManagerGuard,
                ],
                data: {
                    meta: {
                        description: "Manage your account",
                    }
                },
                children: [
                    {
                        path: "",
                        redirectTo: "home",
                        pathMatch: "full",
                    },
                    {
                        path: "home",
                        component: HomeComponent,
                        data: {
                            meta: {
                                title: "Account Management - Selama Ashal'anore!",
                            },
                        },
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        ManagerGuard,
    ],
})
export class RoutingModule
{
}