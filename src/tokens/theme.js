import colors from './colors';
import fonts from './fonts';
import variants from './variants';

const theme = {
  fontSizes: fonts.sizes, // styled-system
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512], // styled-system
  colors,
  fonts,
  variants,
};

export default theme;
