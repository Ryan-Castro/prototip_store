"use client"

import Content from "@/components/estoque/Content";
import CreateModal from "@/components/estoque/CreateModal";
import Header from "@/components/estoque/Header";
import Search from "@/components/Search";
import controlDB from "@/utils/useCaseDB";
import { useEffect, useState } from "react";
import Fuse from 'fuse.js';
import PromoModal from "@/components/estoque/PromoModal";


const options = {
  threshold: 0.3,
  keys: ['name']
};

export default function Estoque() {
  const [showCreateModal, setCreateModal] = useState(false)
  const [showPromoModal, setPromoModal] = useState(false)
  const [updateDb, setUpdateDb] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [itemsFiltred, setItemsFiltred] = useState<any[]>([])
  const fire = new controlDB()

  useEffect(()=>{
    readDB() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDb])

  useEffect(()=>{
    const Filters = {text: "" ,order: "nomeCrescente"}
    sortAndShow(Filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function showCreateModalClick(){
    setCreateModal(true)
  }
  function showPromoModalClick(){
    setPromoModal(true)
  }

  async function readDB() {
    const arreyItems:any[] = [];
    (await fire.readDb()).forEach((doc)=>{
      arreyItems.push(doc)
    })
    setItems(arreyItems)
  }

  function sortAndShow(Filters: {text: string ,order: string}){
    let itemsForSort = items.map((item)=>{return {id: item.id, ...item.data()}})
    if(Filters.text != ""){
      const fuse = new Fuse(itemsForSort, options);
      const itemsFiltred = fuse.search(Filters.text);
      itemsForSort = itemsFiltred.map((item:any)=>item.item)
    }
    switch (Filters.order) {
      case "nomeCrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.name.replace(/í/g, 'i') < b.name.replace(/í/g, 'i')) {
            return -1;
          }
          if (a.name.replace(/í/g, 'i') > b.name.replace(/í/g, 'i')) {
            return 1;
          }
          return 0;
        })
      break;
      case "nomeDecrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.name.replace(/í/g, 'i') < b.name.replace(/í/g, 'i')) {
            return 1;
          }
          if (a.name.replace(/í/g, 'i') > b.name.replace(/í/g, 'i')) {
            return -1;
          }
          return 0;
        })
      break;
      case "precoCrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        })
      break;
      case "precoDecrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        })
      break;
    
      default:
        break;
    }
    setItemsFiltred(itemsForSort)
  }

  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col">
      <div className="h-1/4">
        <Header headlessCreate={showCreateModalClick} headlessPromo={showPromoModalClick}/>
        <Search headlessSearch={sortAndShow}/>
        <Content items={itemsFiltred} headlessUpdate={setUpdateDb} updateDb={updateDb}/>
      </div>
      <CreateModal show={showCreateModal} headlessShow={setCreateModal} headlessUpdate={setUpdateDb} updateDb={updateDb}/>
      <PromoModal show={showPromoModal} headlessShow={setPromoModal} headlessUpdate={setUpdateDb} updateDb={updateDb}/>
    </div>
  );
}
  