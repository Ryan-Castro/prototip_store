"use client"

import Header from "@/components/home/Header";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import Fuse from 'fuse.js';
import controlDB from "@/utils/useCaseDB";
import Content from "@/components/home/Content";
import RequestModal from "@/components/home/RequestModal";

const options = {
  threshold: 0.3,
  keys: ['name']
};


export default function Home() {
  const [items, setItems] = useState<any[]>([])
  const [itemsFiltred, setItemsFiltred] = useState<any[]>([])
  const [showRequestModal, setRequestModal] = useState(false)
  const [bag, setbag] = useState({})
  const fire = new controlDB()

  useEffect(()=>{
    readDB() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    const Filters = {text: "" ,order: "nomeCrescente"}
    sortAndShow(Filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

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
    console.log(itemsForSort)
    setItemsFiltred(itemsForSort)
  }
  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col">
    <div className="h-1/4">
      <Header headlessRequest={setRequestModal}/>
      <Search headlessSearch={sortAndShow}/>
      <Content items={itemsFiltred} bag={bag}/>
    </div>
    <RequestModal show={showRequestModal} headlessShow={setRequestModal} bag={bag}/>
  </div>
  );
}
