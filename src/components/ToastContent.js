import eicon from "../images/exist.png";
const ToastContent = ({ text }) => (
  <div style={{ display: "inline" }}>
    <img
      style={{ display: "inline" }}
      className="h-6 mr-4 ml-2"
      src={eicon}
      alt="icon"
    ></img>
    <p
      style={{ display: "inline" }}
      className="bg-gradient-to-r from-pink-500 to-orange-300 text-transparent bg-clip-text font-extrabold"
    >
      {" "}
      {text}
    </p>
  </div>
);

export default ToastContent;
