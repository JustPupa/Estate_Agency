import EstateCard from "./EstateCard"
import { Flex } from "@chakra-ui/react";

export default function RealtEstates({estates, setEstates, notifyEstateSaved, notifyEstateRemoved}) {
    return <Flex width="90%" flexWrap="wrap" alignSelf="center" justifyContent="space-around">
        {estates.map((estate) => 
            <EstateCard
                estate={estate}
                setEstates={setEstates}
                key={estate.id}
                notifyEstateSaved={notifyEstateSaved}
                notifyEstateRemoved={notifyEstateRemoved}
            />
        )}
    </Flex>
}