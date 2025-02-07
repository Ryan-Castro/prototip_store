interface IHeader{
  headlessCreate: ()=>void
  headlessPromo: ()=>void
}


export default function Header(props:IHeader) {
    return (
      <div className="w-screen h-16 bg-zinc-950 flex justify-between items-center px-7 ">
        <h1 className="text-3xl">Loja</h1>
        <ul className="flex gap-6">
          <li ><input className="bg-green-700 px-3 py-1 rounded-lg" type="button" value="Adicionar" onClick={props.headlessCreate}/></li>
          <li ><input className="bg-cyan-700 px-3 py-1 rounded-lg" type="button" value="Promoções" onClick={props.headlessPromo}/></li>
        </ul>
      </div>
    );
  }
  