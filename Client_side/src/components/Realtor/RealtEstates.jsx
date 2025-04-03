import EstateCard from "./EstateCard"

export default function RealtEstates({estates, setEstates, notifyEstateSaved, notifyEstateRemoved}) {
    return <div>
        {estates.map((estate) => 
            <EstateCard estate={estate} setEstates={setEstates} key={estate.id} notifyEstateSaved={notifyEstateSaved} notifyEstateRemoved={notifyEstateRemoved}/>
        )}
    </div>
}