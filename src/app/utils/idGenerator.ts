

export const generateId = (districtName: string): string => {
    const updating = districtName.split(' ').join('-');
    const id = `BAIT-${updating.toUpperCase()}-${Math.floor(Math.random() * 100009) + 10000}`;
    return id;
}
     