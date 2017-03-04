import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";

import { AuthService } from "../../core/auth.service";

@Injectable()
export class ManagerGuard implements CanActivateChild
{
    constructor(private router: Router, private authService: AuthService)
    {
    }

    public canActivateChild()
    {
        let isLoggedIn = this.authService.isSignedIn;
        if (!isLoggedIn)
        {
            this.router.navigate(["/account/sign-in"]);
        }
        return isLoggedIn;
    }
}