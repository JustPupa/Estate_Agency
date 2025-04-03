import { 
  Button, 
  Card, 
  Input, 
  NumberInput, 
  InputGroup,
  createListCollection,
  Dialog,
  Text,
  Portal,
  CloseButton,
  Group
} from "@chakra-ui/react";
import { useState } from "react";
import { LuMaximize2  } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import Carousel from "./Carousel";
import Stepper from "./MobileStepper";
import RealtCategoriesSelect from "./RealtCategoriesSelect";
import { saveCard, deleteCard, getEstatesByUid, AddPhotoToEstate, GetPhotosByEstate } from "../../services/requests"

async function SaveCard(cardid, name, address, price, rooms, categoryid, size, notifyEstateSaved) {
  const fetchData = async () => {
    let response = await saveCard(cardid, name, address, price, rooms, categoryid, size);
    if (response.status===200) {
      notifyEstateSaved(true);
      setTimeout(() => {
        notifyEstateSaved(false);
      }, "3000");
    } else {
        console.log(response);
    }
  }
  fetchData();
};

async function removeCard(cardid, notifyEstateRemoved, setEstates) {
  const fetchData = async () => {
    let uid = localStorage.getItem('uid');
    let response = await deleteCard(cardid);
    if (response.status===200) {
      notifyEstateRemoved(true);
      let estates = await getEstatesByUid(uid);
      setEstates(estates.data);
      setTimeout(() => {
        notifyEstateRemoved(false);
      }, "3000");
    } else {
        console.log(response);
    }
  }
  fetchData();
};

async function AddPhoto(estate, photourl, setEstatePhotos, setPhoto) {
  const fetchData = async () => {
    let response = await AddPhotoToEstate(estate, photourl);
    if (response.status===200) {
      let photos = await GetPhotosByEstate(estate);
      setEstatePhotos(photos.data);
      setPhoto("");
    } else {
        console.log(response);
    }
  }
  fetchData();
};

export default function EstateCard({estate, setEstates, notifyEstateSaved, notifyEstateRemoved}) {
  const [name, setName] = useState(estate.name);
  const [address, setAddress] = useState(estate.address);
  const [price, setPrice] = useState(estate.price);
  const [rooms, setRooms] = useState(estate.roomCount);
  const [category, setCategory] = useState(estate.category.id);
  const [size, setSize] = useState(estate.size);

  const [estatePhotos, setEstatePhotos] = useState(estate.photos);
  const [photo, setPhoto] = useState("");
  
  const categoryOptions = createListCollection({
    items: [
      { label: "Дома", value: "1" },
      { label: "Квартиры", value: "2" },
      { label: "Дачи", value: "3" },
      { label: "Участки", value: "4" },
    ],
  });

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Carousel images={estatePhotos} estateid={estate.id} setEstatePhotos={setEstatePhotos}/>
      <Card.Body gap="2">
        <Card.Title>
          <Input placeholder="Название" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
        </Card.Title>

        <Card.Description>
          <Input placeholder="Адрес" value={address} onChange={(e) => setAddress(e.currentTarget.value)}/>
        </Card.Description>

        <NumberInput.Root onValueChange={(e) => setPrice(e.valueAsNumber)}
          defaultValue={price}
          formatOptions={{
            style: "currency",
            currency: "BYN",
            currencyDisplay: "code",
            currencySign: "accounting",
            placeholder: "Цена",
            precision: "2"
          }}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>

        <Stepper initialValue={estate.roomCount} changeAction={(e) => setRooms(e.valueAsNumber)}/>

        <RealtCategoriesSelect 
          itemList={categoryOptions}
          initialValue={estate.category.id}
          onChange={(e) => setCategory(e.value[0])}
        />
        
        <NumberInput.Root
          defaultValue={estate.size}
          onValueChange={(e) => setSize(e.valueAsNumber)}
          width="200px"
          onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
        >
          <NumberInput.Control/>
          <InputGroup startElement={<LuMaximize2 />}>
            <NumberInput.Input />
          </InputGroup>
        </NumberInput.Root>

        <Group attached w="full" maxW="sm">
          <Input value={photo} onChange={(e) => setPhoto(e.target.value)} flex="1" placeholder="Ссылка на фото" />
          <Button onClick={() => AddPhoto(estate.id, photo, setEstatePhotos, setPhoto)} bg="bg.subtle" variant="outline">
            <FaCamera />
            Добавить фото
          </Button>
        </Group>

      </Card.Body>
      <Card.Footer gap="2">
        <Button
          variant="solid"
          onClick={() => SaveCard(estate.id, name, address, price, rooms, category, size, notifyEstateSaved)}
          >Сохранить
        </Button>

          <Dialog.Root placement="top" motionPreset="slide-in-bottom">
            <Dialog.Trigger className="pl-[16px]! pr-[16px]! pt-[9px]! pb-[9px]! cursor-pointer bg-red-500! rounded-sm">
              <Text variant="ghost">
                Удалить
              </Text>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Подтверждение действия</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>Вы уверены, что хотите удалить объявление?</p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Отменить</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                    <Button onClick={() => removeCard(estate.id, notifyEstateRemoved, setEstates)}>Удалить</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
      </Card.Footer>
    </Card.Root>
  )
}