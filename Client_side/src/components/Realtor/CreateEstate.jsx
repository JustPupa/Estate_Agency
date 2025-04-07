import {
    Button,
    Field,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
    Theme,
    NumberInput,
    InputGroup
} from "@chakra-ui/react";
import { useState } from "react";
import Stepper from "./MobileStepper";
import PriceInput from "./PriceInput"
import { LuMaximize2  } from "react-icons/lu";
import { createCard, getEstatesByUid } from "../../services/requests"

const CreateEstate = (description, address, price, rooms, category, size, notifyEstateAdded, setEstates) => {
    const fetchData = async () => {
        let uid = localStorage.getItem('uid');
        let response = await createCard(uid, description, address, price, rooms, category, size);
        if (response.status===200) {
            notifyEstateAdded(true);
            let estates = await getEstatesByUid(uid);
            setEstates(estates.data);
            setTimeout(() => {
                notifyEstateAdded(false);
            }, "3000");
        } else {
            console.log(response);
        }
    }
    fetchData();
}
  
export default function CreateEstateForm ({notifyEstateAdded, setEstates}) {
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState('0');
    const [rooms, setRooms] = useState(1);
    const [category, setCategory] = useState(1);
    const [size, setSize] = useState(0);
    
    const categoryOptions = [
        { label: "Дома", value: "1" },
        { label: "Квартиры", value: "2" },
        { label: "Дачи", value: "3" },
        { label: "Участки", value: "4" },
    ]

    return (
        <Theme
            p="4"
            appearance="light"
            colorPalette="teal"
            display="flex"
            justifyContent="center"
            marginBottom="3"
            height="fit-content">
            <Fieldset.Root size="lg" maxW="md" display="flex">
            <Stack>
                <Fieldset.Legend>Создать новое объявление</Fieldset.Legend>
            </Stack>
            <Fieldset.Content display="flex" flexDirection="row">
                <Stack>
                    <Field.Root>
                        <Field.Label>Цена</Field.Label>
                        <PriceInput changeAction={(e) => setPrice(e.valueAsNumber)}/>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Кол-во комнат</Field.Label>
                        <Stepper initialValue="1" changeAction={(e) => setRooms(e.valueAsNumber)}/>
                    </Field.Root>
                </Stack>
                <Stack>
                    <Field.Root>
                        <Field.Label>Категория</Field.Label>
                        <NativeSelect.Root onChange={(e) => setCategory(e.target.value)}>
                            <NativeSelect.Field name="category">
                                <For each={categoryOptions}>
                                    {(item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                    )}
                                </For>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    
                    <Field.Root>
                        <Field.Label>Размер</Field.Label>
                        <NumberInput.Root
                            defaultValue="0"
                            onValueChange={(e) => setSize(e.valueAsNumber)}
                            width="200px"
                            onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                        >
                            <NumberInput.Control/>
                            <InputGroup startElement={<LuMaximize2 />}>
                            <NumberInput.Input />
                            </InputGroup>
                        </NumberInput.Root>
                    </Field.Root>
                </Stack>
                <Stack>
                    <Field.Root>
                        <Field.Label>Описание</Field.Label>
                        <Input
                            width="200px"
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            placeholder="Общая информация"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Адрес</Field.Label>
                        <Input onChange={(e) => setAddress(e.target.value)} name="address" placeholder="Адрес недвижимости"/>
                    </Field.Root>
                </Stack>
            </Fieldset.Content>
            <Button
                type="button"
                width="100%"
                alignSelf="flex-start"
                onClick={() => CreateEstate(description, address, price, rooms, category, size, notifyEstateAdded, setEstates)}
                >
                Создать объявление
            </Button>
            </Fieldset.Root>
        </Theme>
    )
}  