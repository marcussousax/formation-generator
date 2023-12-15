'use client'
import Dancers from '@/app/components/Dancers'
import Formations from '@/app/components/Formations'
import { SidebarProps } from '@/app/types'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'

const Sidebar: React.FC<SidebarProps> = ({
    tabIndex,
    handleTabsChange,
    participants,
    setParticipants,
    formations,
    setFormations
}) => {
    return (
        <Box color={'gray.800'} bg={'white'} borderRadius={'xl'} width={'md'} p={3}>
            <Heading size={'md'}>Formation Generator</Heading>
            <Text fontSize={'xs'}>Lorem ipsum dolor sit amet.</Text>
            <Divider />
            <Box mt={5}>
                <Tabs index={tabIndex} onChange={handleTabsChange} isFitted variant="soft-rounded" colorScheme="green">
                    <TabList>
                        <Tab>{participants.length > 0 ? `Participants (${participants.length})` : 'Participants'} </Tab>
                        <Tab>{formations.length > 0 ? `Formations (${formations.length})` : 'Formations'} </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel paddingInline={0}>
                            <Dancers participants={participants} setParticipants={setParticipants} />
                        </TabPanel>
                        <TabPanel paddingInline={0}>
                            <Formations
                                formations={formations}
                                setFormations={setFormations}
                                participants={participants}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default Sidebar
