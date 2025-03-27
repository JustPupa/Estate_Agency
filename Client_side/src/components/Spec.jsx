import { Card, Heading, Stack } from "@chakra-ui/react"

export default function Spec({title, description}) {
   return (
    <Stack>
        <Card.Root size="sm">
        <Card.Header>
            <Heading size="md">{title}</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">{description}</Card.Body>
        </Card.Root>
    </Stack>
   );
}