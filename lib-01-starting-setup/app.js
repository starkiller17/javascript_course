const customers = ['Said', 'Lalo', 'Sandy', 'Kaled'];
const activeCustomers = ['Lalo', 'Kaled'];

const inactiveCustomers = _.difference(customers, activeCustomers);

console.log(inactiveCustomers);