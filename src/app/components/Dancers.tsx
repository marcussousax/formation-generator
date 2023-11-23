'use client'
import { DancerProps, Person } from '@/app/types'
import { EditIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Divider,
    Button,
    Heading,
    Text,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Input
} from '@chakra-ui/react'

import { useDebounce } from '@uidotdev/usehooks'
import * as React from 'react'

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
}

const Dancers: React.FC<DancerProps> = () => {
    const [nameValue, setNameValue] = React.useState('')
    const [participants, setParticipants] = React.useState<Person[]>([])
    const [editingParticipantId, setEditingParticipantId] = React.useState<string | null>(null)
    const debouncedNameValue = useDebounce(nameValue, 500)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value)
    }

    const handleRename = (e: React.ChangeEvent<HTMLInputElement>, participant: Person) => {
        const newName = e.target.value
        setParticipants(prevParticipants =>
            prevParticipants.map(p => (p.id === participant.id ? { ...p, name: newName } : p))
        )
    }

    const handleDelete = (participant: Person) => {
        setParticipants(prevParticipants => prevParticipants.filter(p => p.id !== participant.id))
    }

    const handleEdit = (participant: Person) => {
        setEditingParticipantId(participant.id)
    }

    React.useEffect(() => {
        if (debouncedNameValue) {
            const newParticipant: Person = {
                id: generateUniqueId(),
                name: debouncedNameValue
            }
            setParticipants(prevParticipants => [...prevParticipants, newParticipant])
            setNameValue('')
        }
    }, [debouncedNameValue])

    return (
        <Box color={'gray.800'} bg={'white'} borderRadius={'xl'} width={'md'} p={3}>
            <Heading size={'md'}>Formation Generator</Heading>
            <Text fontSize={'xs'}>Lorem ipsum dolor sit amet.</Text>
            <Divider />
            <Box mt={5}>
                <Tabs isFitted variant="soft-rounded" colorScheme="green">
                    <TabList>
                        <Tab>{participants.length > 0 ? `Participants (${participants.length})` : 'Participants'} </Tab>
                        <Tab isDisabled>Formations</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel paddingInline={0}>
                            <Input
                                borderRadius={'md'}
                                size={'sm'}
                                mb={4}
                                p={3}
                                value={nameValue}
                                onChange={handleChange}
                                placeholder="Add participant"
                            />

                            <TableContainer>
                                <Table size="xs" layout={'fixed'} variant="striped" colorScheme="gray">
                                    <Tbody>
                                        {participants.map(participant => (
                                            <Tr key={participant.id}>
                                                <Td paddingInline={3} width={'xs'}>
                                                    {editingParticipantId === participant.id ? (
                                                        <>
                                                            <Input
                                                                borderRadius={'md'}
                                                                size={'sm'}
                                                                onChange={e => handleRename(e, participant)}
                                                                value={participant.name}
                                                            />
                                                        </>
                                                    ) : (
                                                        participant.name
                                                    )}
                                                </Td>
                                                <Td textAlign={'right'} paddingInline={3}>
                                                    {editingParticipantId === participant.id ? (
                                                        <Button
                                                            size={'sm'}
                                                            variant="ghost"
                                                            colorScheme="green"
                                                            onClick={() => setEditingParticipantId(null)}
                                                        >
                                                            <CheckIcon />
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                size={'sm'}
                                                                variant="ghost"
                                                                colorScheme="blue"
                                                                onClick={() => handleEdit(participant)}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                            <Button
                                                                size={'sm'}
                                                                variant="ghost"
                                                                colorScheme="red"
                                                                onClick={() => handleDelete(participant)}
                                                            >
                                                                <DeleteIcon />
                                                            </Button>
                                                        </>
                                                    )}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default Dancers
