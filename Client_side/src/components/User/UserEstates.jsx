import { toggleFavorite } from "../../services/requests"

async function toggleFav(estate, uid, favorites, setFavorites) {
    const fetchData = async () => {
        let newFav = favorites.slice();
        let response = await toggleFavorite(uid, estate);
        if (response.status===200) {
            let index = newFav.indexOf(estate);
            if (index === -1) {
                newFav.push(estate);
            } else {
                newFav.splice(index, 1);
            }
            setFavorites(newFav);
        } else {
            console.log(response);
        }
    }
    fetchData();
}

export default function UserEstates({estates, favorites, setFavorites, uid}) {
    return <div className="cardsContainer relative mt-60!" id="cardsContainer">
    {estates.map((estate) => ( 
        <div key={`${estate.id}${estate.name}`}>
            <div hidden>{estate.id}</div>
            <div className="cardMainInfo">
                <div className="estName">{estate.name}</div>
                <div><label>Цена: </label>{estate.price}</div>
            </div>
            <div className="cardDetails">
                <div><label>Площадь: </label>{estate.size} кв.м.</div>
                <div><label>Кол-во комнат: </label>{estate.roomCount}</div>
                <div><label>Адрес: </label>{estate.address}</div>
            </div>
            <div className="cardContacts">
                <div><label>Опубликовал(-а): </label>{estate.author.name}</div>
                <div><label>Контакты: </label>{estate.author.phone}</div>
            </div>
            <img onClick={() => toggleFav(estate.id, uid, favorites, setFavorites)} className={`max-h-10 ${!favorites.includes(estate.id)? 'brightness-50' : ''}`} src="../src/assets/star.png"></img>
            {estate.photos.map((photo) => (
                <img key={`${photo.estate_id}${photo.photoUrl}`} className="max-h-100" src={photo.photoUrl}/>
            ))}
        </div>
    ))}
</div>
}