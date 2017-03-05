import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from "@angular/router";
import { MetaService } from "@nglibs/meta";
import * as $ from "jquery";
import { SemanticSidebarComponent, SemanticDropdownComponent } from "ng-semantic";

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

    public get currentUser()
    {
        return this.authService.currentUser;
    }

    constructor(private authService: AuthService,
        private router: Router,
        private meta: MetaService)
    {
    }

    ngAfterViewInit()
    {
        $(".sidebar.menu .item:not(.dropdown)").on("click", () => this.sidebar.hide());
    }

    public get isSignedIn(): boolean
    {
        return this.authService.isSignedIn;
    }

    public signOut(): void
    {
        if (this.isSignedIn)
        {
            this.authService.signOut()
                .subscribe(result => this.router.navigate(["/home"]));
        }
    }
}
