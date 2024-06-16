import { notification } from 'antd';
type NotificationType = 'success' | 'error';
function useNotification() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type: NotificationType, mess?: string) => {
        api[type]({
            message: 'Thông báo',
            description: mess,
        });
    };
    return {contextHolder:contextHolder, openNotification};
}

export default useNotification;