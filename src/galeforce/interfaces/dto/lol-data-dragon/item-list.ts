interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Gold {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
}

interface Maps {
    [key: string]: boolean;
}

interface StatsBasic {
    FlatHPPoolMod: number;
    rFlatHPModPerLevel: number;
    FlatMPPoolMod: number;
    rFlatMPModPerLevel: number;
    PercentHPPoolMod: number;
    PercentMPPoolMod: number;
    FlatHPRegenMod: number;
    rFlatHPRegenModPerLevel: number;
    PercentHPRegenMod: number;
    FlatMPRegenMod: number;
    rFlatMPRegenModPerLevel: number;
    PercentMPRegenMod: number;
    FlatArmorMod: number;
    rFlatArmorModPerLevel: number;
    PercentArmorMod: number;
    rFlatArmorPenetrationMod: number;
    rFlatArmorPenetrationModPerLevel: number;
    rPercentArmorPenetrationMod: number;
    rPercentArmorPenetrationModPerLevel: number;
    FlatPhysicalDamageMod: number;
    rFlatPhysicalDamageModPerLevel: number;
    PercentPhysicalDamageMod: number;
    FlatMagicDamageMod: number;
    rFlatMagicDamageModPerLevel: number;
    PercentMagicDamageMod: number;
    FlatMovementSpeedMod: number;
    rFlatMovementSpeedModPerLevel: number;
    PercentMovementSpeedMod: number;
    rPercentMovementSpeedModPerLevel: number;
    FlatAttackSpeedMod: number;
    PercentAttackSpeedMod: number;
    rPercentAttackSpeedModPerLevel: number;
    rFlatDodgeMod: number;
    rFlatDodgeModPerLevel: number;
    PercentDodgeMod: number;
    FlatCritChanceMod: number;
    rFlatCritChanceModPerLevel: number;
    PercentCritChanceMod: number;
    FlatCritDamageMod: number;
    rFlatCritDamageModPerLevel: number;
    PercentCritDamageMod: number;
    FlatBlockMod: number;
    PercentBlockMod: number;
    FlatSpellBlockMod: number;
    rFlatSpellBlockModPerLevel: number;
    PercentSpellBlockMod: number;
    FlatEXPBonus: number;
    PercentEXPBonus: number;
    rPercentCooldownMod: number;
    rPercentCooldownModPerLevel: number;
    rFlatTimeDeadMod: number;
    rFlatTimeDeadModPerLevel: number;
    rPercentTimeDeadMod: number;
    rPercentTimeDeadModPerLevel: number;
    rFlatGoldPer10Mod: number;
    rFlatMagicPenetrationMod: number;
    rFlatMagicPenetrationModPerLevel: number;
    rPercentMagicPenetrationMod: number;
    rPercentMagicPenetrationModPerLevel: number;
    FlatEnergyRegenMod: number;
    rFlatEnergyRegenModPerLevel: number;
    FlatEnergyPoolMod: number;
    rFlatEnergyModPerLevel: number;
    PercentLifeStealMod: number;
    PercentSpellVampMod: number;
}

interface StatsOptional {
    FlatHPPoolMod?: number;
    rFlatHPModPerLevel?: number;
    FlatMPPoolMod?: number;
    rFlatMPModPerLevel?: number;
    PercentHPPoolMod?: number;
    PercentMPPoolMod?: number;
    FlatHPRegenMod?: number;
    rFlatHPRegenModPerLevel?: number;
    PercentHPRegenMod?: number;
    FlatMPRegenMod?: number;
    rFlatMPRegenModPerLevel?: number;
    PercentMPRegenMod?: number;
    FlatArmorMod?: number;
    rFlatArmorModPerLevel?: number;
    PercentArmorMod?: number;
    rFlatArmorPenetrationMod?: number;
    rFlatArmorPenetrationModPerLevel?: number;
    rPercentArmorPenetrationMod?: number;
    rPercentArmorPenetrationModPerLevel?: number;
    FlatPhysicalDamageMod?: number;
    rFlatPhysicalDamageModPerLevel?: number;
    PercentPhysicalDamageMod?: number;
    FlatMagicDamageMod?: number;
    rFlatMagicDamageModPerLevel?: number;
    PercentMagicDamageMod?: number;
    FlatMovementSpeedMod?: number;
    rFlatMovementSpeedModPerLevel?: number;
    PercentMovementSpeedMod?: number;
    rPercentMovementSpeedModPerLevel?: number;
    FlatAttackSpeedMod?: number;
    PercentAttackSpeedMod?: number;
    rPercentAttackSpeedModPerLevel?: number;
    rFlatDodgeMod?: number;
    rFlatDodgeModPerLevel?: number;
    PercentDodgeMod?: number;
    FlatCritChanceMod?: number;
    rFlatCritChanceModPerLevel?: number;
    PercentCritChanceMod?: number;
    FlatCritDamageMod?: number;
    rFlatCritDamageModPerLevel?: number;
    PercentCritDamageMod?: number;
    FlatBlockMod?: number;
    PercentBlockMod?: number;
    FlatSpellBlockMod?: number;
    rFlatSpellBlockModPerLevel?: number;
    PercentSpellBlockMod?: number;
    FlatEXPBonus?: number;
    PercentEXPBonus?: number;
    rPercentCooldownMod?: number;
    rPercentCooldownModPerLevel?: number;
    rFlatTimeDeadMod?: number;
    rFlatTimeDeadModPerLevel?: number;
    rPercentTimeDeadMod?: number;
    rPercentTimeDeadModPerLevel?: number;
    rFlatGoldPer10Mod?: number;
    rFlatMagicPenetrationMod?: number;
    rFlatMagicPenetrationModPerLevel?: number;
    rPercentMagicPenetrationMod?: number;
    rPercentMagicPenetrationModPerLevel?: number;
    FlatEnergyRegenMod?: number;
    rFlatEnergyRegenModPerLevel?: number;
    FlatEnergyPoolMod?: number;
    rFlatEnergyModPerLevel?: number;
    PercentLifeStealMod?: number;
    PercentSpellVampMod?: number;
}

interface Data {
    [key: string]: {
        name: string;
        description: string;
        colloq: string;
        plaintext: string;
        into?: string[];
        image: Image;
        gold: Gold;
        tags: string[];
        maps: Maps;
        stats: StatsOptional;
        consumed?: boolean;
        consumeOnFull?: boolean;
        inStore?: boolean;
        from?: string[];
        requiredAlly?: string;
        depth?: number;
    };
}

interface Group {
    id: string;
    MaxGroupOwnable: string;
}

interface Tree {
    header: string;
    tags: string[];
}

interface Rune {
    isrune: boolean;
    tier: number;
    type: string;
}

interface Basic {
    name: string;
    rune: Rune;
    gold: Gold;
    group: string;
    description: string;
    colloq: string;
    plaintext: string;
    consumed: boolean;
    stacks: number;
    depth: number;
    consumeOnFull: boolean;
    from: number[];
    into: number[];
    specialRecipe: number;
    inStore: boolean;
    hideFromAll: boolean;
    requiredChampion: string;
    requiredAlly: string;
    stats: StatsBasic;
    tags: string[];
    maps: Maps;
}

export interface DataDragonItemListDTO {
    type: string;
    version: string;
    basic: Basic;
    data: Data;
    groups: Group[];
    tree: Tree[];
}
