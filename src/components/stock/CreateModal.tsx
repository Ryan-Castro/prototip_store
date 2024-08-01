"use client"

import  controlDB  from "@/utils/useCaseDB";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ICreateModal{
    show: boolean;
    headlessShow: Dispatch<SetStateAction<boolean>>
    headlessUpdate: Dispatch<SetStateAction<boolean>>
    updateDb: boolean
}

export default function CreateModal(props:ICreateModal) {
    const listAdditingRef = useRef<HTMLUListElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const IngredientsRef = useRef<HTMLTextAreaElement>(null)
    const fire = new controlDB()

    function addNewAdditing(){
        const newList = document.createElement("li")
        newList.classList.add("new")
        newList.classList.add("flex")
        newList.classList.add("gap-2")
        newList.innerHTML = "<input type='text' placeholder='Nome' class='bg-zinc-700 py-2 px-4 additingName w-2/5'/><input type='number' placeholder='Preço' class='w-2/5 bg-zinc-700 py-2 px-4 additingPrice'/><span class='ml-5 bg-cyan-700 px-4 py-1 rounded-2xl'>novo</span>"
        listAdditingRef.current?.appendChild(newList)
    }

    useEffect(()=>{
        if(props.show){
            if(modalRef.current?.classList.contains("hidden")) {
                modalRef.current?.classList.remove("hidden")
                modalRef.current?.classList.add("flex")
            }
        }else{
            if(modalRef.current?.classList.contains("flex")) {
                modalRef.current?.classList.remove("flex")
                modalRef.current?.classList.add("hidden")
            }
        }
    }, [props.show])

    async function saveItems(){
        const file = fileRef.current!.files![0]
        const url = file ? await fire.addImage(file) : ""
        const additingArrey: {name:string, price: number}[] = []
        for(let i in listAdditingRef.current!.children){
            if(listAdditingRef.current!.children[i].classList){
                if(listAdditingRef.current!.children[i].classList.contains("new")){
                    const liElement: any = listAdditingRef.current!.children[i]
                    const name = liElement.querySelector(".additingName")!.value
                    const price = liElement.querySelector(".additingPrice")!.value
                    additingArrey.push({name, price: Number(price.replace(/,/g,"."))})
                }
            }
        }
        const dateProduct = {
            name: nameRef.current!.value,
            price: Number(priceRef.current!.value.replace(/,/g,".")),
            Ingredients: IngredientsRef.current!.value,
            additing: additingArrey,
            thumb: url
        }
        await fire.addProduct(dateProduct)
        props.headlessShow(false)
        props.headlessUpdate(!props.updateDb)
    }
    return (
      <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modalRef}>
        <div className="w-2/5 px-2 py-4 bg-zinc-200 rounded-3xl h-3/4 flex justify-center items-center">
            <div className="p-10 gap-2 flex flex-col max-h-full overflow-auto w-full" >
                <div className="">
                    <input type="file" ref={fileRef} className=" bg-zinc-700 py-2 px-5 w-full"/>
                </div>
                <div className="">
                    <input type="text" placeholder="Nome" className="bg-zinc-700 py-2 px-5 w-full" ref={nameRef}/>
                </div>
                <div className="">
                    <input type="number" placeholder="Preço" className="bg-zinc-700 py-2 px-5 w-full" ref={priceRef}/>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <h2>Ingredientes</h2>
                    <textarea name="" id="" className="w-full p-2 text-black h-40" ref={IngredientsRef}></textarea>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <div className="flex justify-between items-center">
                        <h2>Adicionais</h2>
                        <input type="button" value="Adicionar" className="bg-green-700 px-3 py-1 rounded-lg" onClick={addNewAdditing}/>
                    </div>
                    <div className="mt-2 bg-zinc-600 pl-2 w-full">
                        <ul ref={listAdditingRef} className="flex flex-col gap-3 p-3 w-full">
                        </ul>
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <input type="button" value="Salvar" className="bg-green-700 py-3 rounded-lg w-2/5" onClick={saveItems}/>
                    <input type="button" value="Cancelar" className="bg-red-700 py-3 rounded-lg w-2/5" onClick={()=>{props.headlessShow(false); }}/>
                </div>
            </div>
        </div>
      </div>
    );
  }