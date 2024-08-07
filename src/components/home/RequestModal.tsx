import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface IPromoModal{
  show: boolean;
  headlessShow: Dispatch<SetStateAction<boolean>>
  bag: any
}

export default function RequestModal(props:IPromoModal) {
  const modalRef = useRef<HTMLDivElement>(null)
  const listProdRef = useRef<HTMLUListElement>(null)

  useEffect(()=>{
    if(props.show){
        if(modalRef.current?.classList.contains("hidden")) {
            modalRef.current?.classList.remove("hidden");
            modalRef.current?.classList.add("flex");
            listProdRef.current!.innerHTML = ""
            Object.keys(props.bag).map((prod)=>{
                addProd(props.bag[prod], prod)
            })
        }
    }else{
        if(modalRef.current?.classList.contains("flex")) {
            modalRef.current?.classList.remove("flex")
            modalRef.current?.classList.add("hidden")
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show, props.bag])

  function addProd(prod: any, id:any){
    const newList = document.createElement("li")
    newList.classList.add("border")
    newList.classList.add("flex")
    newList.classList.add("gap-2")
    newList.classList.add("rounded-lg")
    newList.classList.add("overflow-hidden")
    let price = prod.prod.priceProd
    Object.keys(prod.additing).map((name)=>{
        price += prod.additing[name].price
    })
    price = price * prod.quant
    newList.innerHTML = `
        <div class="w-1/4">
            <img src=${prod.prod.thumbPrd} alt="" width={150} height={150}></Image>
        </div>
        <div class="w-2/4">
            <h2 class="text-3xl">${prod.prod.nameProd}</h2>
            <p>${Object.keys(prod.additing).map((name)=>name)}</p>
            <p>Quantidade: ${prod.quant}</p>
        </div>
        <div class="w-1/4 flex justify-center flex-col items-center gap-2">
            <h2 class="text-3xl">R$: ${price}</h2>
            <input type="button" value="Excluir" class="bg-red-800 px-4 py-1 rounded-2xl"/>
        </div>
    `
    newList.childNodes[5].childNodes[3].addEventListener("click", (e:any)=>{
        delete props.bag[id]
        listProdRef.current!.innerHTML = ""
        Object.keys(props.bag).map((prod)=>{
            addProd(props.bag[prod], prod)
        })
    })
    listProdRef.current!.appendChild(newList)
}


    function sendOrder(){
        let link = "https://api.whatsapp.com/send?phone=5551998116453&text=Ol%C3%A1,%20esse%20%C3%A9%20meu%20pedido!%0A%0A"
        let priceTot = 0
        Object.keys(props.bag).map((prod)=>{
            let price = props.bag[prod].prod.priceProd
            Object.keys(props.bag[prod].additing).map((name)=>{
                price += props.bag[prod].additing[name].price
            })
            price = price * props.bag[prod].quant
            const text = `${props.bag[prod].quant}:%20${props.bag[prod].prod.nameProd.replaceAll(" ", "%20")}%0A%20%20%20%20%20Adicionais:${Object.keys(props.bag[prod].additing).map((name)=>{return `%20${name}`})}%0A%20%20%20%20%20Pre%C3%A7o:${price}%0A%0A`
            link += text
            priceTot += price
        })
        
        link += `Ficando%20no%20total%20de:%20R$%20${priceTot}`
        window.location.assign(link)
    }
  return (
    <div className="w-screen h-screen absolute top-0 right-0 modal hidden justify-center items-center" ref={modalRef}>
      <div className="bg-zinc-200 p-10 rounded-3xl gap-2 flex flex-col h-2/3 w-1/2">
            <div>
                <h1 className="text-black text-3xl">Meu pedido</h1>
            </div>
            <div className="bg-zinc-600 h-4/5 p-1 overflow-auto rounded-xl">
                <ul ref={listProdRef}>
                </ul>
            </div>
            <div className="flex gap-2 justify-end">
                <input type="button" value="Continuar" className="bg-cyan-700 px-4 py-1 rounded-2xl" onClick={()=>{props.headlessShow(false)}}/>
                <input type="button" value="Finalizar" className="bg-green-800 px-4 py-1 rounded-2xl" onClick={sendOrder}/>
            </div>
      </div>
    </div>
  );
  }