import { IPermission } from "./IPermission";

export interface IApplicationRole
{
    id: string;
    name: string;
    concurrencyStamp: string;
    permissions: IPermission[];
}