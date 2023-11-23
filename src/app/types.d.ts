import React from 'react'

interface Person {
    id: string
    name: string
}

interface Formation {
    id: number
    name: string
    configuration: Person[]
}

interface MP3PlayerProps {
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
}

interface DancerProps {
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
}
