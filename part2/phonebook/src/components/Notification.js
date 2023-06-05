const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div id="notification" style={successMessageStyle}>
      {message}
    </div>
  );
};

const successMessageStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

export default Notification;
