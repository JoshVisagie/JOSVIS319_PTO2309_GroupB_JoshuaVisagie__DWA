import { deepMerge} from "grommet/utils/index";
import { grommet } from "grommet";
 
const theme = deepMerge(grommet, {
    global: {
        colors: {
                brand: '#3837CD',
              },
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  });

  export default theme