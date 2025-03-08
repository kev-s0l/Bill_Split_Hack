const evenSplitBill = (totalamount, people) => {
    const splitAmount = (totalamount / participants.length).toFixed(2);

    return people.map(person => ({
        ...person,
        amountOwed: parseFloat(splitAmount)
    }));
};

const customSplitBill = (people) => {
    return people.map(person => ({
        ...person,
        amountOwed: parseFloat(person.amountOwed).toFixed(2)
    }));
};

module.exports = {evenSplitBill, customSplitBill };