import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from "@angular/core";
import { MdProgressBar } from "@angular/material";
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from "@angular/router";

import { ProgressBarService } from "./core/progress-bar.service";
import { AuthService } from "./core/auth.service";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: require("./core/templates/app.component.html"),
    styles: [require("./core/templates/app.component.scss")]
})
export class AppComponent implements AfterViewChecked
{
    @ViewChild(MdProgressBar)
    progressBar: MdProgressBar;

    constructor(private authService: AuthService,
        private router: Router,
        private progressBarService: ProgressBarService)
    {
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
