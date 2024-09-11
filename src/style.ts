interface ColorMode{
    primary:string,
    secondary:string,
    background:string,
    text:string}

interface Theme{
    light: ColorMode
    dark: ColorMode
}

const theme: Theme = {
    light:{
        primary:"#06AEFF",
        secondary:"#FFFFFF",
        background:"#E7F1FF",
        text:"#212121",
    },
    dark:{
        primary:"#06AEFF",
        secondary:"#FFFFFF",
        background:"#E7F1FF",
        text:"#212121",
    }
}

const currentTheme= theme.light

export default  currentTheme