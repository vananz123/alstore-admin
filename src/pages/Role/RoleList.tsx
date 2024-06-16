import { RoleType } from "@/api/ResType";
import { Table, TableColumnsType } from "antd";
import { loadRoles } from '@/app/feature/role/action';
import { selectRoles } from '@/app/feature/role/reducer';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function RoleList() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {data:roles} = useAppSelector(selectRoles)
    useEffect(() => {
        dispatch(loadRoles())
    }, [dispatch]);
    const columns : TableColumnsType<RoleType> = [
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },{
            title: 'Action',
            key: 'Action',
            render:(_,record)=>(
                <a onClick={()=>navigate(`/role/edit/${record.id}`)}>Edit</a>
            )
        }
    ]
    return <div>
        <Table columns={columns} dataSource={roles}/>
    </div>;
}

export default RoleList;