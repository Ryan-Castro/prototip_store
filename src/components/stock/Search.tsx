
export default function Search() {
    return (
      <div className="w-screen pl-7 pt-3 flex gap-5">
        <input type="text" placeholder="Nome de busca" className="pl-2 bg-zinc-700 py-1"/>
        <select name="" id="" className="bg-zinc-700 pl-2 pr-10" defaultValue={"Nome"}>
            <option value="Nome" >Nome</option>
        </select>
        <input type="button" value="Buscar" className="bg-zinc-700 px-3 rounded-lg"/>
      </div>
    );
  }
  