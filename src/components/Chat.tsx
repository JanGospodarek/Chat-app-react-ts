import Input from "./Input";
import Messages from "./Messages";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons"></div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  );
}
