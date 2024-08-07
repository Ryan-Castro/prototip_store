"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IEditModal{
    show: boolean;
    headlessShow: Dispatch<SetStateAction<boolean>>
    prod: {nameProd:string,priceProd:number,ingredientsProd:string,additingProd:{name:string, price: number}[],idProd:string,thumbPrd:string}
    bag: any
}

export default function SelectModal(props:IEditModal) {
    const listAdditingRef = useRef<HTMLUListElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLParagraphElement>(null)
    const priceRef = useRef<HTMLParagraphElement>(null)
    const IngredientsRef = useRef<HTMLParagraphElement>(null)
    const quantRef = useRef<HTMLInputElement>(null)
    const [additing, setAdditing] = useState<any>({})


    function addNewAdditing(name: string, price: number){
        const newList = document.createElement("li")
        newList.classList.add("new")
        newList.classList.add("flex")
        newList.classList.add("gap-2")
        newList.innerHTML = `
            <p class='bg-zinc-700 py-2 px-4 additingName w-2/5'>${name}</p>
            <p class='w-2/5 bg-zinc-700 py-2 px-4 additingPrice'>R$ ${price}</p>
            <input type='checkbox'/>`
        newList.childNodes[5].addEventListener("change", (e:any)=>{
            if(e.target!.checked){
                additing[name] = {price}
            } else {
                delete additing[name]
            }
        })
        listAdditingRef.current?.appendChild(newList)
    }

    useEffect(()=>{
        if(props.show){
            if(modalRef.current?.classList.contains("hidden")) {
                modalRef.current?.classList.remove("hidden")
                modalRef.current?.classList.add("flex")
                nameRef.current!.innerHTML = props.prod.nameProd
                priceRef.current!.innerHTML = `R$: ${props.prod.priceProd}`
                IngredientsRef.current!.innerHTML = props.prod.ingredientsProd
                listAdditingRef.current!.innerHTML = ""
                props.prod.additingProd.map((additing)=>{addNewAdditing(additing.name, additing.price)})
            }
        }else{
            if(modalRef.current?.classList.contains("flex")) {
                modalRef.current?.classList.remove("flex")
                modalRef.current?.classList.add("hidden")
                setAdditing({})
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show])

    function addBag(){
        props.bag[props.prod.nameProd] = {prod: props.prod, additing: additing, quant: quantRef.current!.value}
        props.headlessShow(false)
    }

    return (
      <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modalRef}>
        <div className="lg:w-2/5 w-4/5 px-2 py-4 bg-zinc-200 rounded-3xl h-3/4 flex justify-center items-center">
            <div className="p-10 gap-2 flex flex-col max-h-full overflow-auto w-full" >
                <div className="flex gap-2">
                    <p className="bg-zinc-700 py-2 px-5 w-1/2" ref={nameRef}></p>
                    <input type="number" name="" id="" defaultValue="1" className="bg-zinc-700 py-2 px-5 w-1/2" ref={quantRef}/>
                </div>
                <div className="">
                    <p className="bg-zinc-700 py-2 px-5 w-full" ref={priceRef} defaultValue={props.prod.priceProd}></p>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <h2>Ingredientes</h2>
                    <p className="w-full p-2 text-black bg-white" ref={IngredientsRef} defaultValue={props.prod.ingredientsProd}></p>
                </div>
                <div className="bg-zinc-700 py-2 px-5">
                    <div className="flex justify-between items-center">
                        <h2>Adicionais</h2>
                    </div>
                    <div className="mt-2 bg-zinc-600 pl-2 w-full">
                        <ul ref={listAdditingRef} className="flex flex-col gap-3 p-3 w-full">
                        </ul>
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <input type="button" value="Adicionar no carrinho" className="bg-green-700 py-3 rounded-lg w-2/5" onClick={addBag}/>
                    <input type="button" value="Cancelar" className="bg-red-700 py-3 rounded-lg w-2/5" onClick={()=>{props.headlessShow(false); }}/>
                </div>
            </div>
        </div>
      </div>
    );
  }