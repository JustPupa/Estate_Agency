import { Flex, Box } from "@chakra-ui/react";
import { toggleFavorite } from "../../services/requests";
import UserEstateCard from "./UserEstateCard";

export default function UserEstates({estates, favorites, setFavorites, uid}) {
    const toggleFav = (estate) => {
        const fetchData = async () => {
            const newFav = favorites.slice();
            let response = await toggleFavorite(uid, estate);
            if (response.status === 200) {
                const index = newFav.indexOf(estate);
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
    };

    return <Flex width="90%" wrap="wrap" justify="space-around" alignSelf="center">
    {estates.map((estate) => (
        <Box key={estate.id}>
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
            imgOnClick={() => toggleFav(estate.id)}/>
        </Box>
    ))}
</Flex>
}