import {
    Card,
    Text,
    Box,
    Image,
    Flex
} from "@chakra-ui/react";
import UserCarousel from "./UserCarousel"

export default function UserEstateCard({category, description, address, price, rooms, size, photos, author, phone, imgclass, imgOnClick}) {
    return <Card.Root maxW="sm" overflow="hidden" marginBottom="5">
        <Card.Body gap="2">
            <UserCarousel images={photos} />
            <Card.Title display="flex">
                <Box textStyle="xl" marginRight="1">Категория:</Box>
                {category}
            </Card.Title>
            <Card.Description>
                {description}
            </Card.Description>
            <Flex>
                <Box textStyle="md" marginRight="1">Адрес:</Box>
                <Text fontSize="xl" color="#0d9488" fontWeight="semibold">
                    {address}
                </Text>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="center">
                <Box textStyle="md" marginRight="1">Цена:</Box>
                <Text fontSize="lg">{price}</Text>
                <Box textStyle="lg" marginLeft="1">BYN</Box>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex marginRight="3">
                    <Box textStyle="md" marginRight="1">Кол-во комнат:</Box>
                    <Text fontSize="xl">{rooms}</Text>
                </Flex>
                <Flex>
                    <Box textStyle="md" marginRight="1">Площадь:</Box>
                    <Text fontSize="xl">{size}</Text>
                    <Box textStyle="lg" marginLeft="1">м²</Box>
                </Flex>
            </Flex>
            <Box padding="2" border="3px solid #0d9488" borderRadius="sm">
                <Flex justifyContent="flex-start" alignItems="center">
                    <Box textStyle="md" marginRight="1">Опубликовал(-а):</Box>
                    <Text fontSize="md">{author}</Text>
                </Flex>
                <Flex justifyContent="flex-start" alignItems="center">
                    <Box textStyle="md" marginRight="1">Контакты: </Box>
                    <Text fontSize="md">{phone}</Text>
                </Flex>
            </Box>
        </Card.Body>
        <Image
            position="absolute"
            maxHeight="12"
            maxWidth="12"
            top="2"
            left="2"
            cursor="pointer"
            className={imgclass}
            onClick={imgOnClick}
            src="../src/assets/star.png"
            alt="Favorite-Star" />
    </Card.Root>
}