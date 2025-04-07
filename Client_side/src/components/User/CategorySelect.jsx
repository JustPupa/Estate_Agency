import {
  Select,
  Portal
} from "@chakra-ui/react"

export default function CategorySelect ({itemList, filter, setFilter}) {
  return (<Select.Root
    collection={itemList}
    value={filter.category}
    defaultValue={["1"]}
    onValueChange={(e) => {
        setFilter({...filter, category:e.value});
    }}
    width="150px"
    borderRadius="md"
    bgColor="black"
    marginRight="3"
    >
        <Select.HiddenSelect />
        <Select.Control>
            <Select.Trigger>
                <Select.ValueText placeholder="Категория недвижимости" />
            </Select.Trigger>
            <Select.IndicatorGroup>
                <Select.Indicator />
            </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
            <Select.Positioner>
                <Select.Content>
                    {itemList.items.map((category) => (
                    <Select.Item item={category} key={category.value}>
                        {category.label}
                        <Select.ItemIndicator />
                    </Select.Item>
                ))}
                </Select.Content>
            </Select.Positioner>
        </Portal>
    </Select.Root>
)}