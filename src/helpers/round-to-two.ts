function RoundToTwo(num: number): number {
    // @ts-ignore
    return Number(Math.round(num + 'e+2') + 'e-2');
}

export {RoundToTwo};
