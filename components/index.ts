import AssetListAnimations from "./AssetListAnimations";
import AssetListAudios from "./AssetListAudios";
import AssetListItemPools from "./AssetListItemPools";
import AssetListMaterialAnimations from "./AssetListMaterialAnimations";
import AssetListMaterials from "./AssetListMaterials";
import AssetListParticleSystems from "./AssetListParticleSystems";
import AssetListPrefabs from "./AssetListPrefabs";
import AssetListSprites from "./AssetListSprites";
import AssetListTrailSystems from "./AssetListTrailSystems";
import AssetListWrapper from "./AssetListWrapper";
import AssetPreviewCanvas from "./AssetPreviewCanvas";
import AssetPreviewWrapper from "./AssetPreviewWrapper";
import BalanceMasterStatGrid from "./BalanceMasterStatGrid";
import BalanceMasterTags from "./BalanceMasterTags";

const AssetList = {
    Animations: AssetListAnimations,
    Audios: AssetListAudios,
    ItemPools: AssetListItemPools,
    MaterialAnimations: AssetListMaterialAnimations,
    Materials: AssetListMaterials,
    ParticleSystems: AssetListParticleSystems,
    Prefabs: AssetListPrefabs,
    Sprites: AssetListSprites,
    TrailSystems: AssetListTrailSystems,
    Wrapper: AssetListWrapper,
};

const AssetPreview = {
    Canvas: AssetPreviewCanvas,
    Wrapper: AssetPreviewWrapper,
};

const BalanceMaster = {
    StatGrid: BalanceMasterStatGrid,
    Tags: BalanceMasterTags,
};

export { AssetList, AssetPreview, BalanceMaster };
