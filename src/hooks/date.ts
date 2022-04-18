const dateToString = (date: Date) => {
    return new Date(date).toLocaleString('ukr', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};

export { dateToString };
