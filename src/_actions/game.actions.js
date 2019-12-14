import ac from "../_constants/action.constants";

export default {
    selectTile,
}

function selectTile(selectedTile) {
    return {type: ac.selectTile, selectedTile};
}