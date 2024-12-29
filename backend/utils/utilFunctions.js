const craftSearchQuery = ({ startDate, endDate }) => {
    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    return query;
};

module.exports = {
    craftSearchQuery,
}