import { ResizeObserver } from '@juggle/resize-observer'
import React from 'react'

const combineChartDimensions = (dimensions: {
    marginTop: number
    marginRight: number
    marginBottom: number
    marginLeft: number
    width: number
    height: number
}) => {
    const parsedDimensions = {
        ...dimensions,
        marginTop: dimensions.marginTop || 30,
        marginRight: dimensions.marginRight || 30,
        marginBottom: dimensions.marginBottom || 30,
        marginLeft: dimensions.marginLeft || 30
    }

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom,
            0
        ),
        boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0)
    }
}

const useChartDimensions = (settings: any) => {
    const ref = React.useRef()
    const dimensions = combineChartDimensions(settings)
    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)
    React.useEffect(() => {
        if (dimensions.width && dimensions.height) return // Explicitly return undefined here

        const element = ref.current

        if (!element) {
            console.warn('Ref element is undefined')
            return
        }

        const resizeObserver = new ResizeObserver(entries => {
            if (!Array.isArray(entries)) return
            if (!entries.length) return
            const entry = entries[0]
            if (width !== entry.contentRect.width) setWidth(entry.contentRect.width)
            if (height !== entry.contentRect.height) setHeight(entry.contentRect.height)
        })

        resizeObserver.observe(element)

        // Return the cleanup function
        return () => resizeObserver.unobserve(element)
    }, [dimensions, height, width])

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height
    })

    return [ref, newSettings]
}

export default useChartDimensions
