import * as request from '../utils/request';
import { RoleType } from './ResType';
export const getRoles = async () => {
    try {
        const res = await request.get(`/role`);
        const resultObj: RoleType[] = res.resultObj;
        return resultObj
    } catch{
        return undefined;
    }
};