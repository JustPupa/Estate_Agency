import { 
    Select,
    Portal
} from "@chakra-ui/react";

export default function RealtCategoriesSelect({ itemList, initialValue, onChange }) {
    return (<Select.Root onValueChange={onChange} collection={itemList} defaultValue={`${initialValue}`} size="sm">
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
    )
}