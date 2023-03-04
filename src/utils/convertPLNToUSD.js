export const convertPLNToUSD = (PLN) => {

  const isValueString = typeof PLN === `string` ? true : false;

  if (isValueString) return NaN

  const isValueUndefined = typeof PLN === `undefined` ? true : false;

  if (isValueUndefined) return NaN

  const isValueNumber = typeof PLN === `number` ? true : false;

  if (isValueNumber) {

    const isValueLessThenZero = PLN < 0 ? true : false;

    if (isValueLessThenZero) return `$0.00`;

    const PLNtoUSD = PLN / 3.5;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
    
  } else {
    return `Error`
  }






}