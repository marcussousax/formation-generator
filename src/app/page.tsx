'use client'
import Dancers from '@/app/components/Dancers'
import MP3Player from '@/app/components/Mp3Player'
import { Formation } from '@/app/types'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
    const [formations, setFormations] = React.useState<Formation[]>([])
    return (
        <Flex p={3} gap="2" w="100%" h={'100%'} bg={'gray.100'} flexDirection={'column'}>
            <Flex flex={1} color="white">
                <Dancers formations={formations} setFormations={setFormations} />
            </Flex>
            <Flex direction={'column'}>
                <MP3Player formations={formations} setFormations={setFormations} />
            </Flex>
        </Flex>
    )
}
