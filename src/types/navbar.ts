export interface valueInItems {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}

export interface NavbarProps<valueInItems> {
    items: valueInItems[]
}
