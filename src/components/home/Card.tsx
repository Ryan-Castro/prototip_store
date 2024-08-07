import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";



interface ICard{
    item: any,
    showCreateModal: (prod:{name:string,price:number,ingredients:string,additing:{name:string, price: number}[],id:string,thumb:string})=>void
}

export default function Card(props:ICard) {
  const prod = {
    name:props.item.name,
    price:props.item.price,
    ingredients:props.item.price,
    additing:props.item.additing,
    id:props.item.id,
    thumb:props.item.thumb
  }

    return (
      <div className="w-52 h-80 rounded-2xl overflow-hidden bg-zinc-800">
        <Image src={props.item.thumb} alt="" width={250} height={250} className="h-1/2" priority={true}></Image>
        <div className="p-2 flex flex-col justify-between h-1/2">
            <h1 className="text-4xl">{props.item.name}</h1>
            <h2 className="text-xl pl-3">Preço: R${props.item.price}</h2>
            <input type="button" value="Ver mais" className="w-full bg-cyan-700 rounded-lg py-2" onClick={()=>{props.showCreateModal(prod)}}/>
        </div>

      </div>
    );
  }
  