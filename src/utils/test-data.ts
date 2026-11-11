export function uniqueCustomer() {
  const stamp = Date.now();
  return {
    name: `Automation User ${stamp}`,
    email: `eventhub.qa.${stamp}@example.com`,
    phone: '+919876543210',
  };
}
