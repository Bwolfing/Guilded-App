import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, Response } from "@angular/http";
import { ConfigService } from "@nglibs/config";
import { AuthHttp, JwtHelper, tokenNotExpired } from "angular2-jwt";
import "rxjs/add/operator/share";
import "rxjs/add/operator/do";

const TOKEN_KEY = "id_token";

export class RegisterUserModel
{
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
}
export class SignInModel
{
    Email: string;
    Password: string;
    RememberMe: boolean = false;
}

const CLAIM_TYPES = {
    Username: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
};

@Injectable()
export class AuthService
{
    private readonly apiUrl: string;
    private signInEndpoint: string = "/account/sign-in";
    private signOutEndpoint: string = "/account/sign-out";
    private registerEndpoint: string = "/account/register";
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http,
        private authHttp: AuthHttp,
        private config: ConfigService)
    {
        this.apiUrl = this.config.getSettings("apiUrl");
    }

    public signIn(user: SignInModel)
    {
        let logInObservable = this.post(this.signInEndpoint, user);
        return logInObservable.do(result => this.storeAccessToken(result), err => console.error(err));
    }
    private storeAccessToken(result: Response)
    {
        let accessToken: AccessToken = result.json() as AccessToken;
        localStorage.setItem(TOKEN_KEY, accessToken.access_token);
    }

    public register(user: RegisterUserModel)
    {
        let registerObservable = this.post(this.registerEndpoint, user);
        return registerObservable.do(result => this.storeAccessToken(result), err => console.error(err));
    }

    public signOut()
    {
        if (!this.isSignedIn)
        {
            return null;
        }
        let signOutObservable = this.post(this.signOutEndpoint, {});
        return signOutObservable.do(result => localStorage.removeItem(TOKEN_KEY), err => console.error(err));    
    }

    public get isSignedIn(): boolean
    {
        return tokenNotExpired();
    }

    public get(endpoint: string, options?: RequestOptionsArgs)
    {
        const endpointUrl = this.apiUrl + this.ensureEndpointLeadingSlash(endpoint);
        if (this.isSignedIn)
        {
            return this.authHttp.get(endpointUrl, options).share();
        }
        else
        {
            return this.http.get(endpointUrl, options).share();
        }
    }
    private ensureEndpointLeadingSlash(url: string): string
    {
        if (!url.startsWith("/"))
        {
            return "/" + url;
        }
        return url;
    }

    public delete(endpoint: string, options?: RequestOptionsArgs)
    {
        const endpointUrl = this.apiUrl + this.ensureEndpointLeadingSlash(endpoint);
        if (this.isSignedIn)
        {
            return this.authHttp.delete(endpointUrl).share();
        }
        else
        {
            return this.http.delete(endpointUrl).share
        }
    }

    public post(endpoint: string, body: any, options?: RequestOptionsArgs)
    {
        const endpointUrl = this.apiUrl + this.ensureEndpointLeadingSlash(endpoint);
        if (this.isSignedIn)
        {
            return this.authHttp.post(endpointUrl, body, options).share();
        }
        else
        {
            return this.http.post(endpointUrl, body, options).share();
        }
    }

    public get currentUser(): AppUser
    {
        let storedJwt = localStorage.getItem(TOKEN_KEY);
        if (storedJwt)
        {
            let decoded = this.jwtHelper.decodeToken(storedJwt);
            return {
                Username: decoded[CLAIM_TYPES.Username],
            }
        }
        return null;
    }
}
export interface AppUser
{
    Username: string;
}

interface AccessToken
{
    access_token: string;
    expires_in: number;
}