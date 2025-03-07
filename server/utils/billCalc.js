const evenSplitBill = (totalamount, people) => {
    const splitAmount = (totalamount / participants.length).toFixed(2);

    return people.map(person => ({
        ...person,
        amountOwed: parseFloat(splitAmount)
    }));
};

console.log(evenSplitBill(60, ))