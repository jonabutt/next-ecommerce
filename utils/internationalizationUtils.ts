export const displayMoney = (money: number) => {
    return new Intl.NumberFormat('mt-MT', { style: 'currency', currency: 'EUR' }).format(money);
};


export const displayDate = (date: Date) => {
    return new Intl.DateTimeFormat('mt-MT', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
};
