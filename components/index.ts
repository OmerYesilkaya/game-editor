import AssetListAnimations from "./AssetListAnimations";
import AssetListAudios from "./AssetListAudios";
import AssetListItemPools from "./AssetListItemPools";
import AssetListMaterialAnimations from "./AssetListMaterialAnimations";
import AssetListMaterials from "./AssetListMaterials";
import AssetListParticleSystems from "./AssetListParticleSystems";
import AssetListPrefabs from "./AssetListPrefabs";
import AssetListSprites from "./AssetListSprites";
import AssetListTrailSystems from "./AssetListTrailSystems";
import AssetListContainer from "./AssetListContainer";
import AssetPreviewCanvas from "./AssetPreviewCanvas";
import AssetPreviewContainer from "./AssetPreviewContainer";
import BalanceMasterStatGrid from "./BalanceMasterStatGrid";
import BalanceMasterTags from "./BalanceMasterTags";
import CommonDropdownOption from "./CommonDropdownOption";
import PrefabEditorEditDropdown from "./PrefabEditorEditDropdown";
import PrefabEditorFileDropdown from "./PrefabEditorFileDropdown";
import PrefabEditorMenuBar from "./PrefabEditorMenuBar";
import PrefabEditorModals from "./PrefabEditorModals";
import PrefabEditorOverlay from "./PrefabEditorOverlay";
import PrefabEditorPrefabs from "./PrefabEditorPrefabs";
import PrefabEditorInputBool from "./PrefabEditorInputBool";
import PrefabEditorInputColor from "./PrefabEditorInputColor";
import PrefabEditorInputFileSelect from "./PrefabEditorInputFileSelect";
import PrefabEditorInputNumber from "./PrefabEditorInputNumber";
import PrefabEditorInputPercentage from "./PrefabEditorInputPercentage";
import PrefabEditorInputText from "./PrefabEditorInputText";
import PrefabEditorInputTextArea from "./PrefabEditorInputTextArea";
import PrefabEditorInputVec2 from "./PrefabEditorInputVec2";
import PrefabEditorInputVec3 from "./PrefabEditorInputVec3";
import PrefabEditorInputVec4 from "./PrefabEditorInputVec4";
import PrefabSceneContent from "./PrefabSceneContent";
import PrefabSceneCanvas from "./PrefabSceneCanvas";
import PrefabSceneCollider from "./PrefabSceneCollider";
import PrefabSceneControls from "./PrefabSceneControls";
import PrefabSceneEntity from "./PrefabSceneEntity";
import PrefabSceneToolbar from "./PrefabSceneToolbar";
import PrefabTreeNode from "./PrefabTreeNode";
import PrefabTreeCanvas from "./PrefabTreeCanvas";
import PrefabWindowActiveModules from "./PrefabWindowActiveModules";
import PrefabWindowAvailableModules from "./PrefabWindowAvailableModules";
import PrefabWindowChildrenModule from "./PrefabWindowChildrenModule";
import PrefabWindowContainer from "./PrefabWindowContainer";
import PrefabWindowDynamicInput from "./PrefabWindowDynamicInput";
import PrefabWindowHeader from "./PrefabWindowHeader";
import PrefabWindowModuleInput from "./PrefabWindowModuleInput";
import PrefabWindowModuleItem from "./PrefabWindowModuleItem";
import PrefabWindowValueModule from "./PrefabWindowValueModule";
import TimelineContainer from "./TimelineContainer";
import TimelineInput from "./TimelineInput";
import TimelineRow from "./TimelineRow";

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
    Container: AssetListContainer,
};

const AssetPreview = {
    Canvas: AssetPreviewCanvas,
    Container: AssetPreviewContainer,
};

const BalanceMaster = {
    StatGrid: BalanceMasterStatGrid,
    Tags: BalanceMasterTags,
};

const Common = {
    DropdownOption: CommonDropdownOption,
};

const PrefabEditor = {
    EditDropdown: PrefabEditorEditDropdown,
    FileDropdown: PrefabEditorFileDropdown,
    MenuBar: PrefabEditorMenuBar,
    Modals: PrefabEditorModals,
    Overlay: PrefabEditorOverlay,
    Prefabs: PrefabEditorPrefabs,
    BoolInput: PrefabEditorInputBool,
    ColorInput: PrefabEditorInputColor,
    FileSelectInput: PrefabEditorInputFileSelect,
    NumberInput: PrefabEditorInputNumber,
    PercentageInput: PrefabEditorInputPercentage,
    TextInput: PrefabEditorInputText,
    TextAreaInput: PrefabEditorInputTextArea,
    Vec2Input: PrefabEditorInputVec2,
    Vec3Input: PrefabEditorInputVec3,
    Vec4Input: PrefabEditorInputVec4,
};

const PrefabScene = {
    Scene: PrefabSceneContent,
    Canvas: PrefabSceneCanvas,
    Collider: PrefabSceneCollider,
    Controls: PrefabSceneControls,
    Entity: PrefabSceneEntity,
    Toolbar: PrefabSceneToolbar,
};

const PrefabTree = {
    Canvas: PrefabTreeCanvas,
    Node: PrefabTreeNode,
};

const PrefabWindow = {
    ActiveModules: PrefabWindowActiveModules,
    AvailableModules: PrefabWindowAvailableModules,
    ChildrenModule: PrefabWindowChildrenModule,
    Container: PrefabWindowContainer,
    DynamicInput: PrefabWindowDynamicInput,
    Header: PrefabWindowHeader,
    ModuleInput: PrefabWindowModuleInput,
    ModuleItem: PrefabWindowModuleItem,
    ValueModule: PrefabWindowValueModule,
};

const Timeline = {
    Container: TimelineContainer,
    Input: TimelineInput,
    Row: TimelineRow,
};

export { AssetList, AssetPreview, BalanceMaster, Common, PrefabEditor, PrefabScene, PrefabTree, PrefabWindow, Timeline };
