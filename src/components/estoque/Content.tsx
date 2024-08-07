import { Dispatch, SetStateAction, useState } from "react";
import Card from "./Card";
import EditModal from "@/components/estoque/EditModal";

interface IContent{
    items: any[]
    headlessUpdate: Dispatch<SetStateAction<boolean>>
    updateDb: boolean
}

export default function Content(props:IContent) {
    const [showEditModal, setEditModal] = useState(false)
    const [nameProd, setNameProd] = useState("")
    const [priceProd, setPriceProd] = useState(0)
    const [ingredientsProd, setIngredientsProd] = useState("")
    const [additingProd, setAdditingProd] = useState<{name:string, price: number}[]>([])
    const [idProd, setIdProd] = useState("")
    const [thumbPrd, setThumbPrd] = useState("")

    function showCreateModal(prod:{name:string,price:number,ingredients:string,additing:{name:string, price: number}[],id:string,thumb:string}){
      setNameProd(prod.name)
      setPriceProd(prod.price)
      setIngredientsProd(prod.ingredients)
      setAdditingProd(prod.additing)
      setIdProd(prod.id)
      setThumbPrd(prod.thumb)
      setEditModal(true)
    }

    return (
      <div className="w-full p-7 flex gap-5 flex-wrap">
        {props.items.map((item, i)=>
            <Card item={item} key={i} showCreateModal={showCreateModal}/>
        )}
        <EditModal show={showEditModal} headlessShow={setEditModal} headlessUpdate={props.headlessUpdate} updateDb={props.updateDb} prod={{nameProd,priceProd,ingredientsProd, additingProd,idProd,thumbPrd}}/>
      </div>
    );
  }
  