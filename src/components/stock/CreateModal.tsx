

export default function CreateModal() {
    return (
      <div className="w-screen h-screen absolute top-0 right-0 modal flex justify-center items-center">
        <div className="bg-zinc-200 p-10 rounded-3xl gap-2 flex flex-col">
            <div className="">
                <input type="text" placeholder="Nome" className="bg-zinc-700 py-2 px-5"/>
            </div>
            <div className="">
                <input type="number" placeholder="Preço" className="bg-zinc-700 py-2 px-5"/>
            </div>
            <div className="bg-zinc-700 py-2 px-5">
                <h2>Ingredientes</h2>
                <textarea name="" id="" className="w-full"></textarea>
            </div>
            <div className="bg-zinc-700 py-2 px-5">
                <div className="flex justify-between items-center">
                    <h2>Adicionais</h2>
                    <input type="button" value="Adicionar" className="bg-green-700 px-3 py-1 rounded-lg"/>
                </div>
                <div className="mt-2 bg-zinc-600 pl-2">
                    <ul>
                        <li>batata palha</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
  }