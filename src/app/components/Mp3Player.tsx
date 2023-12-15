'use client'
import { Formation, MP3PlayerProps } from '@/app/types'
import { generateUniqueId } from '@/app/utils/generateUniqueId'
import { Box } from '@chakra-ui/react'
import React from 'react'
import AudioPlayer from 'react-audio-player'

const MP3Player: React.FC<MP3PlayerProps> = ({ formations, participants, handleTabsChange, setFormations }) => {
    const [currentTime, setCurrentTime] = React.useState(0)
    const audioRef = React.useRef(null)

    const handleTimeUpdate = (current: number) => {
        const displayTime = Math.round(current)
        setCurrentTime(displayTime)
    }

    const createFormation = (time: number) => {
        const newFormation: Formation = {
            id: generateUniqueId(),
            name: `Formation ${formations.length + 1}`,
            configuration: {
                time,
                participants: [...participants]
            }
        }
        setFormations(prevFormations => [...prevFormations, newFormation])
        handleTabsChange(1)
    }

    React.useEffect(() => {
        if (currentTime === 6) {
            console.log('Formation 1')
        } else if (currentTime === 10) {
            console.log('Formation 2')
        }
    }, [currentTime])

    return (
        <Box color={'gray.800'} bg={'white'} borderRadius={'xl'} p={3}>
            <button onClick={() => createFormation(currentTime)}>Create a new formation</button>
            <AudioPlayer
                ref={audioRef}
                listenInterval={1000}
                style={{ width: '100%' }}
                src="file.mp3"
                controls
                onListen={handleTimeUpdate}
            />
        </Box>
    )
}

export default MP3Player
