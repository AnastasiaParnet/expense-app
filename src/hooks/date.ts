const dateForLabel = (date: Date) => {
    return new Date(date).toLocaleString('ukr', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};

const dateToString = (date: Date) => {
    return JSON.stringify(new Date(date.setHours(0, 0, 0, 0))).slice(1, -1);
};

const dateNow = () => {
    return new Date(new Date().setHours(0, 0, 0, 0));
};

export { dateForLabel, dateToString, dateNow };
