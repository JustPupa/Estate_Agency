import CategorySelect from "./CategorySelect";
import { getFiltered } from "../../services/requests";
import { 
    NumberInput,
    Field,
    HStack,
    RadioGroup,
    Button,
    Flex,
    createListCollection,
    Box,
    Center,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const ReturnToLogin = (navigate) => {
    localStorage.setItem('elogin', '');
    localStorage.setItem('epassword', '');
    localStorage.setItem('ekey', '');
    localStorage.setItem('uid', '');
    localStorage.setItem('uname', '');
    navigate('/');
}

export default function UserPageFilter({categories, setEstates }) {
    const navigate = useNavigate();

    const [filter, setFilter] = useState({ category: ["0"], min: 0, max: 0, rooms: '0' });

    function getFilter () {
        const fetchData = async () => {
            let response = await getFiltered(filter.category, filter.min, filter.max, filter.rooms);
            if (response.status===200) {
                setEstates(response.data);
            }
        }
        fetchData();
    }

    function resetFilter () {
        setFilter({ category: ["0"], min: 0, max: 0, rooms: '0' })
        const fetchData = async () => {
            let response = await getFiltered(0, 0, 0, 0);
            if (response.status===200) {
                setEstates(response.data);
            }
        }
        fetchData();
    }

    const categoryOptions = createListCollection({
        items: [
            { label: "Все", value: "0" },
            { label: "Дома", value: "1" },
            { label: "Квартиры", value: "2" },
            { label: "Дачи", value: "3" },
            { label: "Участки", value: "4" }
        ],
    });
    
    const roomsOptions = [
        { label: "Любое", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3+", value: "3" },
    ]

    return <Flex bgColor="#0d9488" padding="5" marginBottom="3">
        <Flex justify="space-between">
            <Flex justify="center" alignItems="center">
                <CategorySelect
                    itemList={categoryOptions}
                    filter={filter}
                    setFilter={setFilter}
                />
            </Flex>
            <Flex justifyContent="center" alignItems="center" marginRight="3">
                <Center pr="1" textStyle="xl">Цена</Center>
                <Field.Root>
                    <NumberInput.Root width="140px" value={filter.min}>
                        <NumberInput.Control />
                        <NumberInput.Input bgColor="black" placeholder="От" onChange={(e) => setFilter({...filter, min:e.target.value})}/>
                    </NumberInput.Root>
                </Field.Root>
                <Field.Root>
                    <NumberInput.Root width="140px" value={filter.max}>
                        <NumberInput.Control />
                        <NumberInput.Input bgColor="black" placeholder="До" onChange={(e) => setFilter({...filter, max:e.target.value})}/>
                    </NumberInput.Root>
                </Field.Root>
            </Flex>
            <Flex appearance="dark" justifyContent="center" alignItems="center" marginRight="3">
                <Text textStyle="lg" pr="0.8em" align="center">Кол-во комнат</Text>
                <RadioGroup.Root
                    value={filter.rooms}
                    onValueChange={(e) => setFilter({...filter, rooms:e.value})}
                >
                    <HStack gap="3">
                        {roomsOptions.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator bgColor="white"/>
                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        ))}
                    </HStack>
                </RadioGroup.Root>
            </Flex>
            <Flex marginTop="10px" flexDirection="column">
                <Button bgColor="chartreuse" marginBottom="1" onClick={() => getFilter()}>Показать</Button>
                <Button
                    bgColor="crimson"
                    color="white"
                    onClick={() => resetFilter()}>
                    Сбросить фильтр
                </Button>   
            </Flex>
        </Flex>
        <Flex justifyContent="center" marginLeft="auto" alignItems="center">
            <Box
                alignItems="center"
                bgColor="black"
                width="2.5em"
                height="2.5em"
                borderRadius="md"
                padding="6px"
                paddingRight="3px"
                cursor="pointer">
                <ImExit
                    onClick={() => ReturnToLogin(navigate)}
                    className="w-full h-full hover:brightness-[0.5] hover:scale-[1.1]" 
                />
            </Box>
        </Flex>
    </Flex>
}