import { Select } from "@chakra-ui/react"

export const SearchField = () => {
    return(
        <div className='flex flex-col gap-5'>
            <Select.Root>
            <Select.Control>По алфавиту</Select.Control>
            <Select.Control>Обратный порядок</Select.Control>
            </Select.Root>
        </div>
    );
}