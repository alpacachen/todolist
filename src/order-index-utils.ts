export type OrderIndex = number

const greater = (order: OrderIndex) => {
    return order + 1
}
const less = (order: OrderIndex) => {
    return order - 1
}

const between = (order1: OrderIndex, order2: OrderIndex) => {
    return (order1 + order2) / 2
}

const findMax = (orders: OrderIndex[]) => {
    return Math.max(...orders)
}

const generateOrderIndex = (orders?: OrderIndex[]) => {
    if (orders && orders.length) {
        return greater(findMax(orders))
    }
    return 0
};

export const OrderIndexUtils = {
    generateOrderIndex,
    less,
    greater,
    between,
    findMax,
};
