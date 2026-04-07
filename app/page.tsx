import Conversation from "./ui/Conversation";
import MindMap from "./ui/MindMap";
import Sidebar from "./ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen shrink-0 flex gap-0 bg-(--bg-main)">
      <Sidebar />
      <MindMap />
      <Conversation />
    </div>
  );
}
