import React from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Image
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function UserCarousel({images}) {
  const [slider, setSlider] = React.useState(null)

  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  return (
    <Box position="relative" width="100%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
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
                <Box position="relative" display="inline-block" key={index}>
                    <Image display="block" src={photo.photoUrl} alt="Estate photo" key={index} />
                </Box>
            ))}
      </Slider>
    </Box>
  )
}