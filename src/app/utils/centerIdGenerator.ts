

export const generateCenterId = (districtName: string): string => {
    const updating = districtName.split(' ').join('-');
    const id = `BAIT-${updating.toUpperCase()}-${Math.floor(Math.random() * 10000) + 10000}`;
    return id;
}
     