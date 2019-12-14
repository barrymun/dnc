import ac from "../_constants/action.constants";

export default {
    selectTileId,
}

function selectTileId(selectedTileId) {
    return {type: ac.selectTileId, selectedTileId};
}