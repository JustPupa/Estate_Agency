import CategorySelect from "./CategorySelect"
import { getFiltered } from "../../services/requests"
import { NumberInput, Field, HStack, RadioGroup, Button } from "@chakra-ui/react"

export default function UserPageFilter({categories, filter, setFilter, setEstates }) {
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
        const fetchData = async () => {
            let response = await getFiltered(0, 0, 0, 0);
            if (response.status===200) {
                setEstates(response.data);
            }
        }
        fetchData();
    }
    
    const roomsOptions = [
        { label: "Любое", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3+", value: "3" },
    ]

    return <div id="UserPageContainer" className="fixed bg-[#a8dadc] p-5! z-10 w-[100%]!">
        <div className="filterCriteria flex justify-between">
            <div className="categoryBlock flex justify-center items-center">
                <CategorySelect catlist={categories} filter={filter} setFilter={setFilter} />
            </div>
            <div className="priceBlock flex justify-center items-center">
                <h2 className="text-center pr-5!">Цена</h2>
                <Field.Root>
                    <NumberInput.Root>
                        <NumberInput.Control />
                        <NumberInput.Input placeholder="От" onChange={(e) => setFilter({...filter, min:e.target.value})}/>
                    </NumberInput.Root>
                </Field.Root>
                <Field.Root>
                    <NumberInput.Root>
                        <NumberInput.Control />
                        <NumberInput.Input placeholder="До" onChange={(e) => setFilter({...filter, max:e.target.value})}/>
                    </NumberInput.Root>
                </Field.Root>
            </div>
            <div className="roomBlock flex justify-center items-center">
                <h2 className="text-center pr-5!">Кол-во комнат</h2>
                <RadioGroup.Root defaultValue="0" onValueChange={(e) => setFilter({...filter, rooms:e.value})}>
                    <HStack gap="6">
                        {roomsOptions.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        ))}
                    </HStack>
                </RadioGroup.Root>
            </div>
            <div className="mt-[10px]! filterArea flex flex-col">
                <Button className="bg-[chartreuse]! mb-1!" onClick={() => getFilter()}>Показать</Button>
                <Button className="bg-[crimson]! text-white!" onClick={() => resetFilter()}>Сбросить фильтр</Button>   
            </div>
        </div>
    </div>
}