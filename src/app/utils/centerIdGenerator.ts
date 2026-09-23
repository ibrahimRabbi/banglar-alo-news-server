

export const generateCenterId = (districtName: string): string => {
    const id = `BAIT-${districtName.toUpperCase()}-${Math.floor(Math.random() * 10000) + 10000}`;
    return id;
}
     