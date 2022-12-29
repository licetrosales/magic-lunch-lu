export type Ingredient = {
    id?: string,
    nameItem: string,
    quantity: string,
    unit: "TL"|"EL"|"MSP"|"OZ"|"LB"|"G"|"KG"|"KARTON"|"BUND"| "PACKUNG"|"ZWEIG"|"KLEIN"| "MITTEL"|"",
    productCategory: "BREAD_BAKERY"|"BEVERAGES"|"CANNED_JARED_GOODS"|"DAIRY"|"PRODUCE"|"DRY_BACKING_GOODS"|"FROZEN_FOODS"|"MEAT"|"PERSONAL_CARE"|"OTHERS"|"",
    isInShoppingList?: boolean,
}



