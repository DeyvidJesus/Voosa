import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        "gray.850": "#222831",
        "gray.650": "#393E46",
        "cyan.150": "#00FFF5",
        "cyan.850": "#00ADB5"
    },
    fonts: {
        heading: "IBM Plex Mono",
        body: "DM Sans"
    },
    styles: {
        global: {
            body: {
                bg: 'gray.850',
                color: 'gray.50'
            }
        }
    }
})