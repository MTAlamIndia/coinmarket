export const floatingNumbers = (num) => {
  if (num?.toString().includes(".")) {
    const num_split = num.toString().split(".");
    const int_value = num_split[0];
    let decimal_value = num_split[1];

    for (let i = 0; i < decimal_value?.length; i++) {
      if (decimal_value[i] > 0) {
        const floatIndex = decimal_value.indexOf(decimal_value[i]);
        decimal_value = decimal_value.slice(0, floatIndex + 2);
        break;
      }
    }

    return Number(int_value.concat("." + decimal_value));
  }

  return num;
};
