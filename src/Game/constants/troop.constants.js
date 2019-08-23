export const troopNames = {
    TRANSPORTER: `transporter`,
    WARRIOR: `warrior`,
    SCOUT: `scout`,
    SWORDSMAN: `swordsman`,
    PIKEMAN: `pikeman`,
    ARCHER: `archer`,
    CAVALRY: `cavalry`,
    CATAPHRACT: `cataphract`,
    RAM: `batteringRam`,
    BALLISTA: `ballista`,
    CATAPULT: `catapult`,
};


export const troops = [
    troopNames.TRANSPORTER,
    troopNames.WARRIOR,
    troopNames.SCOUT,
    troopNames.SWORDSMAN,
    troopNames.PIKEMAN,
    troopNames.ARCHER,
    troopNames.CAVALRY,
    troopNames.CATAPHRACT,
    troopNames.RAM,
    troopNames.BALLISTA,
    troopNames.CATAPULT,
];

/**
 * in seconds
 *
 */
export const troopTrainingTimes = {
    [troopNames.TRANSPORTER]: 0,
    [troopNames.WARRIOR]: 24,
    [troopNames.SCOUT]: 98,
    [troopNames.SWORDSMAN]: 150,
    [troopNames.PIKEMAN]: 224,
    [troopNames.ARCHER]: 350,
    [troopNames.CAVALRY]: 500,
    [troopNames.CATAPHRACT]: 1500,
    [troopNames.RAM]: 3000,
    [troopNames.BALLISTA]: 4500,
    [troopNames.CATAPULT]: 6000,
};