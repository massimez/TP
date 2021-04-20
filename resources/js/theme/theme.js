import { extendTheme } from "@chakra-ui/react"


export const theme = extendTheme({
  colors:{
    bluet:{
      100: "#005AAE",
      900: "#005AAE"
    },
  },
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: "black",
          color: "white",
        },
        // styles for the `a`
        a: {
          color: "teal.500",
          _hover: {
            textDecoration: "underline",
          },
        },
      },
    },
    colors: {
      bluet: {
        100: "#005AAE",
        900: "#005AAE",
      },
    },
    components: {
      Link: {
        variants: {
          // you can name it whatever you want
          primary: ({ colorScheme = "blue" }) => ({
            color: `${colorScheme}.500`,
            _hover: {
              color: `${colorScheme}.400`,
            },
          }),
        },
        defaultProps: {
          // you can name it whatever you want
          variant: "primary",
        },
      },
    },
  })

  export const config = () => ({
    initialColorMode: "dark",
    useSystemColorMode: false,
    light: {
      color: theme.colors.gray[700],
      bg:"red",
      borderColor: theme.colors.gray[200],
      placeholderColor: theme.colors.gray[500]
    },
    dark: {
      color: theme.blue[300],
      bg: theme.bluet[300],
      borderColor: theme.colors.whiteAlpha[300],
      placeholderColor: theme.colors.whiteAlpha[400]
    },
    
    fonts: {
      body: "montserrat",
      heading:"montserrat",
      h3:"sans-serif"
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 900,
    },
    textStyles: {
      h1: {
        // you can also use responsive styles
        fontSize: ["48px", "72px"],
        fontWeight: "bold",
        lineHeight: "110%",
        letterSpacing: "-2%",
      },
      h2: {
        fontSize: ["36px", "48px"],
        fontWeight: "semibold",
        lineHeight: "110%",
        letterSpacing: "-1%",
      },
      h3: {
        fontSize: ["26px", "26px"],
        fontWeight: "bold",
        lineHeight: "31.69px",
        letterSpacing: "10%",
      },
    },
  });