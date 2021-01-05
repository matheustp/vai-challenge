function MaxWordCountValidator(maxWordNum: number): (value: string) => boolean {
    return (value: string) => {
        if (value.split(' ').length > maxWordNum) {
            throw new Error(`The text should have up to ${maxWordNum} words`);
        }
        return true;
    };
}

export { MaxWordCountValidator };
