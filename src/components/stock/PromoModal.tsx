import controlDB from "@/utils/useCaseDB";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface IPromoModal{
  show: boolean;
  headlessShow: Dispatch<SetStateAction<boolean>>
  headlessUpdate: Dispatch<SetStateAction<boolean>>
  updateDb: boolean
}

export default function PromoModal(props:IPromoModal) {
  const modalRef = useRef<HTMLDivElement>(null)
  const promoListRef = useRef<HTMLUListElement>(null)
  const fire = new controlDB()


  useEffect(()=>{
    if(props.show){
        if(modalRef.current?.classList.contains("hidden")) {
            modalRef.current?.classList.remove("hidden");
            modalRef.current?.classList.add("flex");
            promoListRef.current!.innerHTML = ""
            readPromos()
        }
    }else{
        if(modalRef.current?.classList.contains("flex")) {
            modalRef.current?.classList.remove("flex")
            modalRef.current?.classList.add("hidden")
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])

  function addNewAdditing(name:string, porcent:number){
    const newList = document.createElement("li")
    newList.classList.add("flex")
    newList.classList.add("gap-2")
    newList.classList.add("w-full")
    newList.innerHTML =  `
                <input type="text" placeholder="Código" class="pl-2 text-black additingName" value="${name}" />
                <input type="number" placeholder="valor em %" class="pl-2 text-black additingPrice" value="${porcent}" />
                <input type="button" value="apagar" class="bg-cyan-800 px-3 rounded-xl py-1"/>
                `
    newList.childNodes[5].addEventListener("click", ()=>{
        const element = newList.parentNode
        element?.removeChild(newList)
    })
    promoListRef.current?.appendChild(newList)
  }

  async function  readPromos() {
    const promos = await fire.readPromo()
    promos.data()!.ativas.forEach((promo: {name:string, price:number})=>{
      addNewAdditing(promo.name, promo.price)
    })
  }

  async function savePromo(){
    const additingArrey: {name:string, price: number}[] = []
    for(let i in promoListRef.current!.children){
        if(promoListRef.current!.children[i].classList){
            const liElement: any = promoListRef.current!.children[i]
            const name = liElement.querySelector(".additingName")!.value
            const price = liElement.querySelector(".additingPrice")!.value
            additingArrey.push({name, price: Number(price.replace(/,/g,"."))})
        }
    }
    await fire.setPromo(additingArrey)
    props.headlessShow(false)
    props.headlessUpdate(!props.updateDb)
  }
  return (
    <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modalRef}>
      <div className="bg-zinc-200 p-10 rounded-3xl gap-2 flex flex-col">
          <div className="w-full flex justify-between">
            <h2 className="text-black text-3xl">Promoções ativas</h2>
            <input type="button" value="Adicionar" className="bg-green-800 px-3 rounded-xl" onClick={()=>{addNewAdditing("", 0)}}/>
          </div>
          <div className="border border-zinc-800 p-1 bg-zinc-600 h-56 pr-0">
            <ul className="flex h-full flex-col gap-3 overflow-auto pr-1" ref={promoListRef}>
            </ul>
          </div>
          <div className="flex w-full justify-between">
            <input type="button" value="Salvar" className="bg-green-800 px-3 rounded-xl text-xl" onClick={savePromo}/>
            <input type="button" value="Cancelar" className="bg-red-800 px-3 rounded-xl text-xl" onClick={()=>{props.headlessShow(false)}}/>
          </div>
      </div>
    </div>
  );
  }