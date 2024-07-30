"use client"

import CreateModal from "@/components/stock/CreateModal";
import Header from "@/components/stock/Header";
import Search from "@/components/stock/Search";
import { useState } from "react";

export default function Stock() {
  const [showCreateModal, settCreateModal] = useState(false)

  function showCreateModalClick(){
    settCreateModal(true)
  }

  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col">
      <div className="h-1/4">
        <Header headlessCreate={showCreateModalClick}/>
        <Search/>
      </div>
      <CreateModal show={showCreateModal} headlessShow={settCreateModal}/>
    </div>
  );
}
  