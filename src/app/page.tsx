'use client'
import MP3Player from '@/app/components/Mp3Player'
import Sidebar from '@/app/components/Sidebar'
import { Formation, Person } from '@/app/types'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
    const [formations, setFormations] = React.useState<Formation[]>([])
    const [participants, setParticipants] = React.useState<Person[]>([])
    return (
        <Flex p={3} gap="2" w="100%" h={'100%'} bg={'gray.100'} flexDirection={'column'}>
            <Flex flex={1} color="white">
                <Sidebar
                    formations={formations}
                    setFormations={setFormations}
                    participants={participants}
                    setParticipants={setParticipants}
                />
            </Flex>
            <Flex direction={'column'}>
                <MP3Player formations={formations} setFormations={setFormations} />
            </Flex>
        </Flex>
    )
}
