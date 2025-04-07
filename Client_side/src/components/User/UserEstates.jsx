import { Flex } from "@chakra-ui/react";
import { toggleFavorite } from "../../services/requests";
import UserEstateCard from "./UserEstateCard";

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
    return <Flex width="90%" wrap="wrap" justify="space-around" alignSelf="center">
    {estates.map((estate) => (
        <div key={estate.id}>
            <UserEstateCard 
            category={estate.category.name} 
            description={estate.description} 
            address={estate.address}
            price={estate.price}
            rooms={estate.roomCount}
            size={estate.size}
            photos={estate.photos}
            author={estate.author.name}
            phone={estate.author.phone}
            imgclass={`${!favorites.includes(estate.id)? 'brightness-50' : ''}`}
            imgOnClick={() => toggleFav(estate.id, uid, favorites, setFavorites)}/>
        </div>
    ))}
</Flex>
}