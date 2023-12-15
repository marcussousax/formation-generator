import { FormationGridProps } from '@/app/types'
import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'

const chartSettings = {
    marginTop: 0,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
    paddingBottom: 0
}
const FormationGrid: React.FC<FormationGridProps> = ({
    selectedIndex,
    formationId,
    participants,
    formations,
    setFormations
}) => {
    const svgRef = useRef(null)

    useEffect(() => {
        const parentWidth = svgRef.current?.parentElement?.clientWidth // Get parent container width
        const parentHeight = svgRef.current?.parentElement?.clientHeight // Get parent container width

        const width = parentWidth - chartSettings.marginLeft - chartSettings.marginRight
        const height = parentHeight - chartSettings.marginTop - chartSettings.marginBottom

        const data = formations[selectedIndex].configuration.participants
        const simulation = d3.forceSimulation()

        const svg = d3.select(svgRef.current)

        const node = svg
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

        node.append('circle')
            .attr('r', 40)
            .style('fill', '#19d3a2')
            .style('fill-opacity', 0.3)
            .attr('stroke', '#b3a2c8')
            .style('stroke-width', 4)

        node.append('text')
            .text(d => d.name)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'black')

        simulation.nodes(data).on('tick', function () {
            node.data(data).attr('transform', d => `translate(${width / 2 + d.x},${height / 2 + d.y})`)

            // Adjust the position of both circles and text elements within each group
            node.select('circle').attr('cx', 0).attr('cy', 0)
            node.select('text').attr('x', 0).attr('y', 0)
        })

        function dragstarted(event, d) {
            console.log('Drag started')
            if (!event.active) simulation.alphaTarget(0.03).restart()
            d.fx = d.x
            d.fy = d.y
        }

        function dragged(event, d) {
            console.log('Dragging')
            d.fx = event.x
            d.fy = event.y
        }

        function dragended(event: { active: any }, d: { id: any; name: any; fx: any; fy: any }) {
            console.log('Drag ended')
            if (!event.active) simulation.alphaTarget(0.03)

            // Set the final position as fixed
            simulation.alpha(0).restart()
            simulation.nodes(data)
            updateCirclePosition(d.id, d.name, d.fx, d.fy)
        }

        function updateCirclePosition(id: any, name: any, x: any, y: any) {
            setFormations(prevFormations => {
                const updatedFormations = [...prevFormations]
                const personIndex = findPersonIndex(updatedFormations, selectedIndex, id)

                if (personIndex !== -1) {
                    // Update existing person
                    updatePersonPosition(updatedFormations, selectedIndex, personIndex, { id, name, x, y })
                } else {
                    // Person not found, create a new entry in the array
                    updatedFormations[selectedIndex].configuration.participants.push({ id, name, x, y })
                }
                console.log({ updatedFormations })
                return updatedFormations
            })
        }

        function findPersonIndex(formations, formationIndex, personId) {
            if (formationIndex !== -1) {
                return formations[formationIndex].configuration.participants.findIndex(person => person.id === personId)
            }

            return -1
        }

        function updatePersonPosition(formations, formationIndex, personIndex, updatedPerson) {
            formations[formationIndex].configuration.participants[personIndex] = updatedPerson
        }
    }, [formationId, formations, participants, selectedIndex, setFormations])

    return (
        <div style={{ flex: 1 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                fill={'red'}
                width={'100%'}
                height={'100%'}
                ref={svgRef}
            ></svg>
        </div>
    )
}

export default FormationGrid
