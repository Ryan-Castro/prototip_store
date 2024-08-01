"use client"

import Content from "@/components/stock/Content";
import CreateModal from "@/components/stock/CreateModal";
import Header from "@/components/stock/Header";
import Search from "@/components/stock/Search";
import controlDB from "@/utils/useCaseDB";
import { useEffect, useState } from "react";

export default function Stock() {
  const [showCreateModal, settCreateModal] = useState(false)
  const [updateDb, settUpdateDb] = useState(false)
  const [items, settItems] = useState<any[]>([])
  const fire = new controlDB()

  useEffect(()=>{
    readDB() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDb])

  function showCreateModalClick(){
    settCreateModal(true)
  }

  async function readDB() {
    const arreyItems:any[] = [];
    (await fire.readDb()).forEach((doc)=>{
      arreyItems.push(doc)
    })
    settItems(arreyItems)
  }

  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col">
      <div className="h-1/4">
        <Header headlessCreate={showCreateModalClick}/>
        <Search/>
        <Content items={items}/>
      </div>
      <CreateModal show={showCreateModal} headlessShow={settCreateModal} headlessUpdate={settUpdateDb} updateDb={updateDb}/>
    </div>
  );
}
  