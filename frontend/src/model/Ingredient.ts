export type Ingredient = {
    id?: string,
    itemName: string,
    quantity: string,
    unit?: Unit | string,
    productCategory?: ProductCategory | string,
    isInShoppingList?: boolean,
}
export type NewItem = {
    itemName: string,
    quantity: string,
    isInShoppingList: boolean
}

export enum Unit {
    OZ = "OZ",
    LB = "LB",
    G = "G",
    KG = "KG",
    LT = "LT",
    OTHER = "OTHER"
}

export enum ProductCategory {
    BREAD_BAKERY = "BREAD_BAKERY",
    BEVERAGES = "BEVERAGES",
    CANNED_JARED_GOODS = "CANNED_JARED_GOODS",
    DAIRY = "DAIRY",
    PRODUCE = "PRODUCE",
    DRY_BACKING_GOODS = "DRY_BACKING_GOODS",
    FROZEN_FOODS = "FROZEN_FOODS",
    MEAT = "MEAT",
    PERSONAL_CARE = "PERSONAL_CARE",
    OTHERS = "OTHERS"
}



