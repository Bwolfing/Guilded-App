import { IPermission } from "./IPermission";

export interface IApplicationRole
{
    id: string;
    name: string;
    permissions: IPermission[];
}