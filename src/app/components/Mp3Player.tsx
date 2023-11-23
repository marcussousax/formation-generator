'use client'
import { MP3PlayerProps } from '@/app/types'
import { Box } from '@chakra-ui/react'
import React from 'react'
import AudioPlayer from 'react-audio-player'

const MP3Player: React.FC<MP3PlayerProps> = ({ formations, setFormations }) => {
    const [currentTime, setCurrentTime] = React.useState(0)
    const audioRef = React.useRef(null)

    const handleTimeUpdate = (current: number) => {
        const displayTime = Math.round(current)
        setCurrentTime(displayTime)
    }

    const createSnapshot = (time: number) => {
        setFormations([time, ...formations])
    }

    React.useEffect(() => {
        if (currentTime === 6) {
            console.log('Formação 1')
        } else if (currentTime === 10) {
            console.log('Formação 2')
        }
    }, [currentTime])

    return (
        <Box color={'gray.800'} bg={'white'} borderRadius={'xl'} p={3}>
            {/* <p>Current Time: {currentTime} seconds</p> */}
            <button onClick={() => createSnapshot(currentTime)}>Create snapshot</button>
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
