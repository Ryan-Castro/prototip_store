"use client"

import  controlDB  from "@/utils/useCaseDB";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ICreateModal{
    show: boolean;
    headlessShow: Dispatch<SetStateAction<boolean>>
}

export default function CreateModal(props:ICreateModal) {
    const listAdditing = useRef<HTMLUListElement>(null)
    const modal = useRef<HTMLDivElement>(null)
    const fire = new controlDB()

    function addNewAdditing(){
        const newList = document.createElement("li")
        newList.classList.add("new")
        newList.innerHTML = "<input type='text' placeholder='Nome' class='bg-zinc-700 py-2 px-5'/><span class='ml-5 bg-cyan-700 px-4 py-1 rounded-2xl'>novo</span>"
        listAdditing.current?.appendChild(newList)
    }

    useEffect(()=>{
        modal.current?.addEventListener('click', (e:any)=>{
            if(e.target.classList.contains("modal")){
                props.headlessShow(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(props.show){
            if(modal.current?.classList.contains("hidden")) {
                modal.current?.classList.remove("hidden")
                modal.current?.classList.add("flex")
            }
        }else{
            if(modal.current?.classList.contains("flex")) {
                modal.current?.classList.remove("flex")
                modal.current?.classList.add("hidden")
            }
        }
    }, [props.show])

    function saveItems(){
        fire.addProduct("xissalada")
    }
    return (
      <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modal}>
        <div className="w-2/5 px-2 py-4 bg-zinc-200 rounded-3xl h-3/4 flex justify-center items-center">
            <div className="p-10 gap-2 flex flex-col max-h-full overflow-auto w-full" >
                <div className="">
                    <input type="text" placeholder="Nome" className="bg-zinc-700 py-2 px-5 w-full"/>
                </div>
                <div className="">
                    <input type="number" placeholder="Preço" className="bg-zinc-700 py-2 px-5 w-full"/>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <h2>Ingredientes</h2>
                    <textarea name="" id="" className="w-full p-2 text-black h-40"></textarea>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <div className="flex justify-between items-center">
                        <h2>Adicionais</h2>
                        <input type="button" value="Adicionar" className="bg-green-700 px-3 py-1 rounded-lg" onClick={addNewAdditing}/>
                    </div>
                    <div className="mt-2 bg-zinc-600 pl-2">
                        <ul ref={listAdditing} className="flex flex-col gap-3 p-3">
                            <li className="old">batata palha</li>
                        </ul>
                    </div>
                </div>
                <input type="button" value="Salvar" className="bg-green-700 py-3 rounded-lg" onClick={saveItems}/>
            </div>
        </div>
      </div>
    );
  }