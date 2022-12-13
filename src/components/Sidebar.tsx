import Chats from "./Chats";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar></Navbar>
      <Searchbar></Searchbar>
      <Chats></Chats>
    </div>
  );
}
