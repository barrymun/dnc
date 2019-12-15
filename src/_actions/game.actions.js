import ac from "../_constants/action.constants";

export default {
    selectTile,
    regenMana,
    regenTroops,
}

function selectTile(selectedTile) {
    return {type: ac.selectTile, selectedTile};
}

function regenMana() {
    return {type: ac.regenMana};
}

function regenTroops() {
    return {type: ac.regenTroops};
}