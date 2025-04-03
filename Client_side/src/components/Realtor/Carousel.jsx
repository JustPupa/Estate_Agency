import React from 'react'
import { 
  Box,
  IconButton,
  useBreakpointValue,
  Image,
  Icon,
  Button,
  CloseButton,
  Dialog,
  Portal
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt, BiTrash } from 'react-icons/bi'
import Slider from 'react-slick'
import { removePhoto } from "../../services/requests"

async function RemovePhoto(estateid, photourl, images, setEstatePhotos) {
  const fetchData = async () => {
    let response = await removePhoto(estateid, photourl);
    if (response.status===200) {
      let imagesCopy = images.slice();
      let imageItem = imagesCopy.find((item) => item.photoUrl === photourl);
      var index = imagesCopy.indexOf(imageItem);
      if (index !== -1) {
        imagesCopy.splice(index, 1);
      }
      setEstatePhotos(imagesCopy);
    } else {
        console.log(response);
    }
  }
  fetchData();
};

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function Carousel({images, estateid, setEstatePhotos}) {
  const [slider, setSlider] = React.useState(null)

  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  return (
    <Box className="relative w-full truncate">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" 
      />
      <link 
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" 
      />
      <IconButton aria-label="left-arrow" colorScheme="messenger" borderRadius="full" position="absolute" left={side}
        top={top} transform={'translate(0%, -50%)'} zIndex={2} onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt />
      </IconButton>
      <IconButton aria-label="right-arrow" colorScheme="messenger" borderRadius="full" position="absolute"
        right={side} top={top} transform={'translate(0%, -50%)'} zIndex={2} onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt />
      </IconButton>
      <Slider className="flex justify-center items-center" {...settings} ref={(slider) => setSlider(slider)}>
            {images.map((photo, index) => (
                <div className="relative inline-block" key={index}>
                    <Image className="block" src={photo.photoUrl} alt="Estate photo" key={index} />

                    <Dialog.Root
                      placement="top"
                      motionPreset="slide-in-bottom"
                    >
                      <Dialog.Trigger>
                        <Icon
                        className="absolute! top-1 left-1 m-10 bg-white p-1! rounded-full hover:brightness-70"
                        size="2xl"
                        color="red">
                          <BiTrash />
                        </Icon>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Подтверждение действия</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <p>
                                Вы уверены, что хотите удалить фото?
                              </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Отменить</Button>
                              </Dialog.ActionTrigger>
                              <Dialog.ActionTrigger asChild>
                                <Button 
                                  onClick={() => RemovePhoto(estateid, photo.photoUrl, images, setEstatePhotos)}>
                                  Удалить
                                </Button>
                              </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                </div>
            ))}
      </Slider>
    </Box>
  )
}