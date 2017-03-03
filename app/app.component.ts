import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from "@angular/router";
import { MetaService } from "@nglibs/meta";
import * as $ from "jquery";
import { SemanticSidebarComponent } from "ng-semantic";

import { AuthService } from "./core/auth.service";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: require("./core/templates/app.component.html"),
    styles: [require("./core/templates/app.component.scss")]
})
export class AppComponent implements AfterViewInit
{
    @ViewChild(SemanticSidebarComponent)
    sidebar: SemanticSidebarComponent;

    constructor(private authService: AuthService,
        private router: Router,
        private meta: MetaService)
    {
    }

    ngAfterViewInit()
    {
        $(".sidebar.menu .item").on("click", () => this.sidebar.hide());
    }

    public get isLoggedIn(): boolean
    {
        return this.authService.isLoggedIn;
    }

    public logOut(): void
    {
        if (this.isLoggedIn)
        {
            this.authService.logOut()
                .subscribe(result => this.router.navigate(["/home"]));
        }
    }
}
