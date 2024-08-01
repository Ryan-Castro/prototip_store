import Card from "./Card";

interface IContent{
    items: any[]
}

export default function Content(props:IContent) {
    return (
      <div className="w-full p-7 flex gap-5 flex-wrap">
        {props.items.map((item, i)=>
            <Card item={item} key={i}/>
        )}
      </div>
    );
  }
  