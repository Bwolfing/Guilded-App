import { Component, ViewChild, AfterViewChecked, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { MdProgressBar } from "@angular/material";
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from "@angular/router";
import * as $ from "jquery";
import { SemanticSidebarComponent } from "ng-semantic";

import { ProgressBarService } from "./core/progress-bar.service";
import { AuthService } from "./core/auth.service";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: require("./core/templates/app.component.html"),
    styles: [require("./core/templates/app.component.scss")]
})
export class AppComponent implements AfterViewInit, AfterViewChecked
{
    @ViewChild(MdProgressBar)
    progressBar: MdProgressBar;

    @ViewChild(SemanticSidebarComponent)
    sidebar: SemanticSidebarComponent;

    constructor(private authService: AuthService,
        private router: Router,
        private progressBarService: ProgressBarService)
    {
    }

    ngAfterViewInit()
    {
        $(".sidebar.menu .item").on("click", () => this.sidebar.hide());
    }

    ngAfterViewChecked()
    {
        this.progressBarService.setProgressBar(this.progressBar);
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
