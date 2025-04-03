import { InputGroup, NumberInput } from "@chakra-ui/react"
import { LuDollarSign } from "react-icons/lu"

export default function PriceInput({changeAction}) {
  return (
    <NumberInput.Root
      defaultValue="0"
      onValueChange={changeAction}
      width="200px"
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
      <InputGroup>
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
  )
}