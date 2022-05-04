export const getCategoryRoutePath = (category) => {
  let path = '';
  switch (category) {
    case 'CEC':
      path = 'cec-visa';
      break;
    case 'PNP':
      path = 'pnp-visa';
      break;
    case 'FSW':
      path = 'fsw-visa';
      break;
    case 'NewVisit':
      path = 'new-visit-visa';
      break;
    case 'ExtendVisit':
      path = 'extend-visit-visa';
      break;
    case 'NewStudy':
      path = 'new-study-visa';
      break;
    case 'ExtendStudy':
      path = 'extend-study-visa';
      break;
    case 'ExtendWork':
      path = 'extend-work-visa';
      break;
    case 'PGWP':
      path = 'work-visa';
      break;
    case 'Spousal':
      path = 'spousal-visa';
      break;
    case 'CECPNP':
      path = 'cec-pnp-visa';
      break;
    default:
      path = '';
  }
  return path;
};
