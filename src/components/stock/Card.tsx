import Image from "next/image";

interface ICard{
    item: any
}

export default function Card(props:ICard) {
    return (
      <div className="w-52 h-64 rounded-2xl overflow-hidden bg-zinc-800">
        <Image src={props.item.data().thumb} alt="" width={250} height={250} className="h-1/2"></Image>
        <div className="p-2 flex flex-col justify-between h-1/2">
            <h1 className="text-4xl">{props.item.data().name}</h1>
            <h2 className="text-xl pl-3">Preço: R${props.item.data().price}</h2>
            <input type="button" value="Alterar" className="w-full bg-cyan-700 rounded-lg py-2"/>
        </div>
      </div>
    );
  }
  