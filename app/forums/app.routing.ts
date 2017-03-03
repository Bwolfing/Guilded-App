import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";

const ROUTES: Route[] = [
    {
        path: "forums",
        
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
                        title: "Forums - Selama Ashal'anore!",
                        description: "Guild member created content and discussion",
                    },
                },
            },
            {
                path: "**",
                redirectTo: "",
                pathMatch: "full",
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
    ]
})
export class RoutingModule
{
}