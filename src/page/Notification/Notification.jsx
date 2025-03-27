import { RiDeleteBin5Line } from "react-icons/ri";
import Navigate from "../../Navigate";
import { useGetNotificationQuery } from "../redux/api/manageApi";

const Notification = () => {
  const { data: notifications, isLoading, error } = useGetNotificationQuery();

  if (isLoading) {
    return <div className="p-4 bg-white">Loading notifications...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white text-red-500">Failed to load notifications.</div>;
  }

  return (
    <div className="p-4 bg-white">
      <Navigate title={'Notifications'} />
      <h2 className="text-lg font-semibold mb-4 mt-5">
        Total {notifications?.length || 0} Notifications
      </h2>
      <div className="space-y-2">
        {notifications?.map((notification) => (
          <div key={notification._id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
            <div>
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.details}</p>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
