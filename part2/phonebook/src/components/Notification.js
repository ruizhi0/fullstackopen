const Notification = ({ message, isSuccess }) => {
  if (!message) {
    return null;
  }

  const style = isSuccess ? successMessageStyle : failedMessageStyle;

  return (
    <div id="notification" style={style}>
      {message}
    </div>
  );
};

const baseStyle = {
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const successMessageStyle = {
  ...baseStyle,
  color: "green",
};

const failedMessageStyle = {
  ...baseStyle,
  color: "red",
};

export default Notification;
