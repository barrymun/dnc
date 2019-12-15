import ac from "../_constants/action.constants";

export default {
    selectTile,
    regenGold,
    regenMana,
    regenTroops,
}

function selectTile(selectedTile) {
    return {type: ac.selectTile, selectedTile};
}

function regenGold() {
    return {type: ac.regenGold};
}

function regenMana() {
    return {type: ac.regenMana};
}

function regenTroops() {
    return {type: ac.regenTroops};
}