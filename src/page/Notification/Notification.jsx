import { RiDeleteBin5Line } from "react-icons/ri";
import Navigate from "../../Navigate";

const notifications = [
  { id: 1, title: "New Order Received", message: "A new custom jewelry order (#123456) has been placed. Review the details now.", time: "Just Now" },
  { id: 2, title: "Payment Confirmed", message: "Payment for order #123456 has been successfully received. Proceed with processing.", time: "5 min ago" },
  { id: 3, title: "Order In Progress", message: "Custom jewelry order #123456 is now being crafted. Keep track of progress.", time: "30 min ago" },
  { id: 4, title: "Repair Request Submitted", message: "A new repair request (#789012) has been received. Review the issue.", time: "6 hours ago" },
  { id: 5, title: "Order Completed", message: "The order #123456 has been successfully delivered. Mark as completed.", time: "8 hours ago" },
];

const Notification = () => {
  return (
    <div className=" p-4 bg-white ">
      <Navigate title={'Notifications'}></Navigate>
      <h2 className="text-lg font-semibold mb-4 mt-5">Total {notifications.length} Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
            <div>
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
            <div className="flex gap-2 items-center">
            <div className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</div>
            <RiDeleteBin5Line  className="text-xl text-red-500"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
