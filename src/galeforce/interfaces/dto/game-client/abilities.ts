interface Ability {
    abilityLevel: number;
    displayName: string;
    id: string;
    rawDescription: string;
    rawDisplayName: string;
}

interface Passive {
    displayName: string;
    id: string;
    rawDescription: string;
    rawDisplayName: string;
}

export interface LiveClientAbilitiesDTO {
    E: Ability;
    Passive: Passive;
    Q: Ability;
    R: Ability;
    W: Ability;
}
