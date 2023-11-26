export interface Prize {
    text: string,
    color: string,
    probability: number
}

export interface PrizeEdit {
    text?: string,
    color?: string,
    probability?: number
}