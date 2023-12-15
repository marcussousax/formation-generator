'use client'
import FormationGrid from '@/app/components/FormationGrid'
import { FormationProps } from '@/app/types'
import { SettingsIcon } from '@chakra-ui/icons'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import * as React from 'react'

const Formations: React.FC<FormationProps> = ({ formations, setFormations, participants }) => {
    const [modalStates, setModalStates] = React.useState(Array(formations.length).fill(false))

    const onOpenModal = (index: number) => {
        const newModalStates = [...modalStates]
        newModalStates[index] = true
        setModalStates(newModalStates)
    }

    const onCloseModal = (index: number) => {
        const newModalStates = [...modalStates]
        newModalStates[index] = false
        setModalStates(newModalStates)
    }

    return (
        <>
            <TableContainer>
                <Table size="xs" layout={'fixed'} variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th fontSize={'xs'} paddingInline={3}>
                                name
                            </Th>
                            <Th fontSize={'xs'} paddingInline={3} textAlign={'center'}>
                                time
                            </Th>
                            <Th fontSize={'xs'} paddingInline={3}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {formations?.map((formation, index) => (
                            <Tr key={formation.id}>
                                <Td paddingInline={3} width={'xs'}>
                                    {formation.name}
                                </Td>
                                <Td textAlign={'center'} paddingInline={3}>
                                    {formation.configuration.time}
                                </Td>
                                <Td textAlign={'right'} paddingInline={3}>
                                    <Button
                                        size={'sm'}
                                        variant="ghost"
                                        colorScheme="green"
                                        onClick={() => onOpenModal(index)}
                                    >
                                        <SettingsIcon />
                                    </Button>
                                    <Modal
                                        isOpen={modalStates[index]}
                                        size={'6xl'}
                                        isCentered
                                        onClose={() => onCloseModal(index)}
                                    >
                                        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
                                        <ModalContent height="80vh">
                                            <ModalHeader>{formation.name}</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody display={'flex'}>
                                                <FormationGrid
                                                    selectedIndex={index}
                                                    formationId={formation.id}
                                                    participants={participants}
                                                    formations={formations}
                                                    setFormations={setFormations}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={() => onCloseModal(index)}>
                                                    Save
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Formations
