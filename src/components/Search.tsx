import { useRef } from "react";

interface ISearch{
  headlessSearch: (Filters: {text: string ,order: string})=>void
}

export default function Search(props: ISearch) {
    const textRef = useRef<HTMLInputElement>(null)
    const orderRef = useRef<HTMLSelectElement>(null)

    function search(){
      const select = orderRef.current!
      const Filters = {
        text: textRef.current!.value,
        order: select.options[select.selectedIndex].value
      }
      props.headlessSearch(Filters)
    }

    return (
      <div className="w-screen pl-7 pt-3 flex gap-5">
        <input type="text" placeholder="Nome de busca" className="pl-2 bg-zinc-700 py-1" ref={textRef}/>
        <select name="" id="" className="bg-zinc-700 pl-2 pr-10" defaultValue={"nomeCrescente"} ref={orderRef}>
            <option value="nomeCrescente" >Nome Crescente</option>
            <option value="nomeDecrescente" >Nome Decrescente</option>
            <option value="precoCrescente" >Preço Crescente</option>
            <option value="precoDecrescente" >Preço Decrescente</option>
        </select>
        <input type="button" value="Buscar" className="bg-zinc-700 px-3 rounded-lg" onClick={search}/>
      </div>
    );
  }
  