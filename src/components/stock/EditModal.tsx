"use client"

import  controlDB  from "@/utils/useCaseDB";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface IEditModal{
    show: boolean;
    headlessShow: Dispatch<SetStateAction<boolean>>
    headlessUpdate: Dispatch<SetStateAction<boolean>>
    updateDb: boolean
    prod: {nameProd:string,priceProd:number,ingredientsProd:string,additingProd:{name:string, price: number}[],idProd:string,thumbPrd:string}
}

export default function EditModal(props:IEditModal) {
    const listAdditingRef = useRef<HTMLUListElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const IngredientsRef = useRef<HTMLTextAreaElement>(null)

    const fire = new controlDB()

    function addNewAdditing(name: string, price: number){
        const newList = document.createElement("li")
        newList.classList.add("new")
        newList.classList.add("flex")
        newList.classList.add("gap-2")
        newList.innerHTML = `
            <input type='text' placeholder='Nome' class='bg-zinc-700 py-2 px-4 additingName w-2/5' value="${name}"/>
            <input type='number' placeholder='Preço' class='w-2/5 bg-zinc-700 py-2 px-4 additingPrice' value="${price}"/>
            <span class='ml-5 bg-red-700 px-4 py-1 rounded-2xl'>Remover</span>`
        newList.childNodes[5].addEventListener("click", ()=>{
            const element = newList.parentNode
            element?.removeChild(newList)
        })
        listAdditingRef.current?.appendChild(newList)
    }

    useEffect(()=>{
        if(props.show){
            if(modalRef.current?.classList.contains("hidden")) {
                modalRef.current?.classList.remove("hidden")
                modalRef.current?.classList.add("flex")
                fileRef.current!.value = ""
                nameRef.current!.value = props.prod.nameProd
                priceRef.current!.value = `${props.prod.priceProd}`
                IngredientsRef.current!.innerHTML = props.prod.ingredientsProd
                listAdditingRef.current!.innerHTML = ""
                props.prod.additingProd.map((additing)=>{addNewAdditing(additing.name, additing.price)})
            }
        }else{
            if(modalRef.current?.classList.contains("flex")) {
                modalRef.current?.classList.remove("flex")
                modalRef.current?.classList.add("hidden")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show])

    async function saveItems(){
        const file = fileRef.current!.files![0]
        const url = file ? await fire.addImage(file) : props.prod.thumbPrd
        const additingArrey: {name:string, price: number}[] = []
        for(let i in listAdditingRef.current!.children){
            if(listAdditingRef.current!.children[i].classList){
                const liElement: any = listAdditingRef.current!.children[i]
                const name = liElement.querySelector(".additingName")!.value
                const price = liElement.querySelector(".additingPrice")!.value
                additingArrey.push({name, price: Number(price.replace(/,/g,"."))})
            }
        }
        const dateProduct = {
            name: nameRef.current!.value,
            price: Number(priceRef.current!.value.replace(/,/g,".")),
            Ingredients: IngredientsRef.current!.value,
            additing: additingArrey,
            thumb: url
        }
        await fire.setProduct(dateProduct, props.prod.idProd)
        props.headlessShow(false)
        props.headlessUpdate(!props.updateDb)
    }

    async function deletItems(){
        await fire.deletImage(props.prod.thumbPrd)
        await fire.deletProduct(props.prod.idProd)
        props.headlessShow(false)
        props.headlessUpdate(!props.updateDb)
    }

    return (
      <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modalRef}>
        <div className="lg:w-2/5 w-4/5 px-2 py-4 bg-zinc-200 rounded-3xl h-3/4 flex justify-center items-center">
            <div className="p-10 gap-2 flex flex-col max-h-full overflow-auto w-full" >
                <div className="">
                    <input type="file" ref={fileRef} className=" bg-zinc-700 py-2 px-5 w-full"/>
                </div>
                <div className="">
                    <input type="text" placeholder="Nome" className="bg-zinc-700 py-2 px-5 w-full" ref={nameRef}/>
                </div>
                <div className="">
                    <input type="number" placeholder="Preço" className="bg-zinc-700 py-2 px-5 w-full" ref={priceRef} defaultValue={props.prod.priceProd}/>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <h2>Ingredientes</h2>
                    <textarea name="" id="" className="w-full p-2 text-black h-40" ref={IngredientsRef} defaultValue={props.prod.ingredientsProd}></textarea>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <div className="flex justify-between items-center">
                        <h2>Adicionais</h2>
                        <input type="button" value="Adicionar" className="bg-green-700 px-3 py-1 rounded-lg" onClick={()=>{addNewAdditing("", 0)}}/>
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
                <div className="flex w-full justify-between">
                    <input type="button" value="Deletar" className="bg-red-700 py-3 rounded-lg w-full" onClick={()=>{deletItems()}} />
                </div>
            </div>
        </div>
      </div>
    );
  }