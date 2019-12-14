import ac from "../_constants/action.constants";

export default {
    selectTile,
    regenMana,
}

function selectTile(selectedTile) {
    return {type: ac.selectTile, selectedTile};
}

function regenMana() {
    return {type: ac.regenMana};
}