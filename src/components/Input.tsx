export default function Input() {
  return (
    <div className="input">
      <div className="send">
        <input type="text" placeholder="type something" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">Add photo</label>
        <button>Send</button>
      </div>
    </div>
  );
}
