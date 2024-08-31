export const totalAmount = (Total, Discount, Tax) => {
    return (Total - (Discount * Total) + (Tax * Total)).toFixed(2);
}

export const discount = (Discount, Total) => {
    return (Discount * Total).toFixed(2)
}

export const tax = (Tax, Total) => {
    return (Tax * Total).toFixed(2)
}

export const refundAmount = (Total, Discount, Tax) => {
    return (Total - (Discount * Total) + (Tax * Total)).toFixed(2);
}

export const changeAmtRecCondition = (Total, Discount, Tax) => {
    return (Total - (Discount * Total) + (Tax * (Total - (Discount * Total))))
}

export const change = (amountReceived, Total, Discount, Tax) => {
    return Math.ceil(amountReceived - (Total - (Discount * Total) + (Tax * Total)))
}