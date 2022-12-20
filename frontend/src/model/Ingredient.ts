export type Ingredient = {
    id: string;
    name: string;
    quantity: string;
    unit: Unit;
    productCategory: ProductCategory;
    isInShoppingList: boolean;
}


export enum Unit {
    TL = "TL",
    EL = "EL",
    MSP = "Msp",
    CUP = "cup",
    OZ = "oz",
    FL_OZ = "fl.oz",
    LB = "lb",
    PT = "pt",
    G = "g",
    KG = "kg",
    KARTON = "Karton",
    BUND = "Bund",
    PACKUNG = "Packung",
    ZEHE = "Zehe",
    ZWEIG = "Zweig(e)",
    KLEIN = "klein",
    MITTEL = "mittel",
    GROSS = "groß"
}

export enum ProductCategory {
    BREAD_BAKERY = "Bakery",
    BEVERAGES = "Beverages",
    CANNED_JARED_GOODS = "Canned/Jarred Goods",
    DAIRY = "Dairy",
    PRODUCE = "fruits, vegetables",
    DRY_BACKINGGOODS = "Dry/Baking Goods",
    FROZEN_FOODS = "Frozen Foods",
    MEAT = "Meat",
    OTHERS = "others",
    PERSONAL_CARE = "Personal Care"
}