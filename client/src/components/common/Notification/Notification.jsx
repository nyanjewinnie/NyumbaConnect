import "./Notification.css";

function Notification({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>

      <button onClick={onClose}>
        ✖
      </button>
    </div>
  );
}

export default Notification;