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
    const {data:roles , isLoading} = useAppSelector(selectRoles)
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
            title: 'Chức năng',
            key: 'Action',
            render:(_,record)=>(
                <a onClick={()=>navigate(`/role/edit/${record.id}`)}>Sửa</a>
            )
        }
    ]
    return <div>
        <Table loading={isLoading} columns={columns} dataSource={roles}/>
    </div>;
}

export default RoleList;