import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";

import { AuthService, SignInModel } from "../core/auth.service";

@Component({
    selector: "account-sign-in",
    template: require("./templates/sign-in.html"),
    styles: [
        require("./templates/sign-in.scss"),
    ],
})
export class SignInComponent implements OnInit
{
    signInForm: FormGroup;
    isLoading: boolean = false;
    formErrors: SignInErrors = new SignInErrors();

    public get signInModel(): SignInModel
    {
        if (!this.signInForm)
        {
            return ;
        }
        return {
            Email: this.signInForm.controls.Email.value,
            Password: this.signInForm.controls.Password.value,
            RememberMe: this.signInForm.controls.RememberMe.value,
        };
    }

    public get isFormErrorFree()
    {
        return this.signInForm.valid && this.formErrors.hasNoErrors;
    }

    constructor(private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder)
    {
    }

    public ngOnInit()
    {
        this.buildForm();
        this.signInForm.valueChanges.subscribe(data => this.onFormValueChanges(data));
        this.onFormValueChanges();
    }
    private buildForm()
    {
        this.signInForm = this.formBuilder.group({
            Email: [
                "", [
                    Validators.required,
                    CustomValidators.email,
                ]
            ],
            Password: [
                "",
                Validators.required,
            ],
            RememberMe: [false],
        });
    }
    private onFormValueChanges(data?: any)
    {
        if (!this.signInForm)
        {
            return;
        }
        const form = this.signInForm;

        for (const field in this.formErrors)
        {
            if (field !== "Email" && field !== "Password")
            {
                continue;
            }
            this.formErrors[field] = [];
            const control = form.get(field);
            if (control && control.dirty && !control.valid)
            {
                const messages = SignInErrors.ErrorMessages[field];
                for (const key in control.errors)
                {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    public logIn(): void
    {
        if (!this.isLoading)
        {
            this.isLoading = true;
            this.formErrors.clearErrors();
            this.authService.signIn(this.signInModel)
                .finally(() => 
                {
                    this.isLoading = false;
                })
                .subscribe(
                    result => this.router.navigate(["/home"]),
                    errors => this.parseErrors(errors.json()),
                );
        }
    }
    private parseErrors(errors: any): void
    {
        this.formErrors.Model = errors[""] || [];
        this.formErrors.Email = errors.Email || [];
        this.formErrors.Password = errors.Password || [];
        if (this.formErrors.hasNoErrors)
        {
            this.formErrors.Model = ["An error occurred. Please try again"];
        }
    }
}

class SignInErrors
{
    static ErrorMessages: Object = {
        Email: {
            required: "Email is required",
            email: "Must be a valid email address format"
        },
        Password: {
            required: "Password is required",
        },
    };

    Model: string[] = [];
    Email: string[] = [];
    Password: string[] = [];

    public get hasNoErrors()
    {
        return !this.Model.length && !this.Email.length && !this.Password.length;
    }
    
    public clearErrors(): void
    {
        this.Model = [];
        this.Email = [];
        this.Password = [];
    }
}