import CreateModal from "@/components/stock/CreateModal";
import Header from "@/components/stock/Header";
import Search from "@/components/stock/Search";

export default function stock() {
    return (
      <div className="w-screen h-screen bg-zinc-900 flex flex-col">
        <div className="h-1/4">
          <Header/>
          <Search/>
        </div>
        <CreateModal/>
      </div>
    );
  }
  