import {resourceNames} from "./resource.constants";

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


export const troopResourceCost = {
    [troopNames.TRANSPORTER]: {
        [resourceNames.FOOD]: 1,
        [resourceNames.WOOD]: 2,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 1,
    },
    [troopNames.WARRIOR]: {
        [resourceNames.FOOD]: 2,
        [resourceNames.WOOD]: 0,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 0,
    },
    [troopNames.SCOUT]: {
        [resourceNames.FOOD]: 3,
        [resourceNames.WOOD]: 0,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 0,
    },
    [troopNames.SWORDSMAN]: {
        [resourceNames.FOOD]: 5,
        [resourceNames.WOOD]: 0,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 3,
    },
    [troopNames.PIKEMAN]: {
        [resourceNames.FOOD]: 5,
        [resourceNames.WOOD]: 2,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 3,
    },
    [troopNames.ARCHER]: {
        [resourceNames.FOOD]: 8,
        [resourceNames.WOOD]: 12,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 2,
    },
    [troopNames.CAVALRY]: {
        [resourceNames.FOOD]: 16,
        [resourceNames.WOOD]: 6,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 8,
    },
    [troopNames.CATAPHRACT]: {
        [resourceNames.FOOD]: 24,
        [resourceNames.WOOD]: 12,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 32,
    },
    [troopNames.RAM]: {
        [resourceNames.FOOD]: 36,
        [resourceNames.WOOD]: 30,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 24,
    },
    [troopNames.BALLISTA]: {
        [resourceNames.FOOD]: 48,
        [resourceNames.WOOD]: 60,
        [resourceNames.STONE]: 0,
        [resourceNames.IRON]: 24,
    },
    [troopNames.CATAPULT]: {
        [resourceNames.FOOD]: 96,
        [resourceNames.WOOD]: 120,
        [resourceNames.STONE]: 48,
        [resourceNames.IRON]: 32,
    },
};