import React from 'react'

interface Person {
    id: string
    name: string
    x?: number
    y?: number
}

interface Formation {
    id: string
    name: string
    configuration: {
        time: number
        participants: Person[]
    }
}

interface MP3PlayerProps {
    participants: Person[]
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
    handleTabsChange: React.Dispatch<React.SetStateAction<number>>
}

interface SidebarProps {
    tabIndex: number
    handleTabsChange: React.Dispatch<React.SetStateAction<number>>
    participants: Person[]
    setParticipants: React.Dispatch<React.SetStateAction<Person[]>>
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
}

interface DancerProps {
    participants: Person[]
    setParticipants: React.Dispatch<React.SetStateAction<Person[]>>
}

interface FormationProps {
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
    participants: Person[]
}

interface FormationGridProps {
    selectedIndex: number
    formationId: string
    formations: Formation[]
    setFormations: React.Dispatch<React.SetStateAction<Formation[]>>
    participants: Person[]
}
