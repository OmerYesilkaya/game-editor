import AssetListAnimations from "./AssetListAnimations";
import AssetListAudios from "./AssetListAudios";
import AssetListContainer from "./AssetListContainer";
import AssetListFloatingWindow from "./AssetListFloatingWindow";
import AssetListItemPools from "./AssetListItemPools";
import AssetListMaterialAnimations from "./AssetListMaterialAnimations";
import AssetListMaterials from "./AssetListMaterials";
import AssetListParticleSystems from "./AssetListParticleSystems";
import AssetListPrefabs from "./AssetListPrefabs";
import AssetListSprites from "./AssetListSprites";
import AssetListTrailSystems from "./AssetListTrailSystems";
import AssetPreviewCanvas from "./AssetPreviewCanvas";
import AssetPreviewContainer from "./AssetPreviewContainer";
import BalanceMasterStatGrid from "./BalanceMasterStatGrid";
import BalanceMasterTags from "./BalanceMasterTags";
import CommonCenter from "./CommonCenter";
import CommonDropdownOption from "./CommonDropdownOption";
import CommonEditableText from "./CommonEditableText";
import CommonFloatingWindow from "./CommonFloatingWindow";
import CommonFooter from "./CommonFooter";
import CommonGrid from "./CommonGrid";
import CommonHeader from "./CommonHeader";
import CommonInputWithIcon from "./CommonInputWithIcon";
import CommonLoading from "./CommonLoading";
import CommonMenuItem from "./CommonMenuItem";
import CommonModal from "./CommonModal";
import CommonNavbar from "./CommonNavbar";
import CommonNoPrefab from "./CommonNoPrefab";
import CommonSearchInput from "./CommonSearchInput";
import PrefabEditorContainer from "./PrefabEditorContainer";
import PrefabEditorEditDropdown from "./PrefabEditorEditDropdown";
import PrefabEditorFileDropdown from "./PrefabEditorFileDropdown";
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
import PrefabEditorMenuBar from "./PrefabEditorMenuBar";
import PrefabEditorModals from "./PrefabEditorModals";
import PrefabEditorOverlay from "./PrefabEditorOverlay";
import PrefabEditorPrefabs from "./PrefabEditorPrefabs";
import PrefabSceneCanvas from "./PrefabSceneCanvas";
import PrefabSceneCollider from "./PrefabSceneCollider";
import PrefabSceneContainer from "./PrefabSceneContainer";
import PrefabSceneContent from "./PrefabSceneContent";
import PrefabSceneControls from "./PrefabSceneControls";
import PrefabSceneEntity from "./PrefabSceneEntity";
import PrefabSceneToolbar from "./PrefabSceneToolbar";
import PrefabTreeCanvas from "./PrefabTreeCanvas";
import PrefabTreeNode from "./PrefabTreeNode";
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
    Container: AssetListContainer,
    FloatingWindow: AssetListFloatingWindow,
    ItemPools: AssetListItemPools,
    MaterialAnimations: AssetListMaterialAnimations,
    Materials: AssetListMaterials,
    ParticleSystems: AssetListParticleSystems,
    Prefabs: AssetListPrefabs,
    Sprites: AssetListSprites,
    TrailSystems: AssetListTrailSystems,
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
    Center: CommonCenter,
    DropdownOption: CommonDropdownOption,
    EditableText: CommonEditableText,
    FloatingWindow: CommonFloatingWindow,
    Footer: CommonFooter,
    Grid: CommonGrid,
    Header: CommonHeader,
    InputWithIcon: CommonInputWithIcon,
    Loading: CommonLoading,
    MenuItem: CommonMenuItem,
    Modal: CommonModal,
    Navbar: CommonNavbar,
    NoPrefab: CommonNoPrefab,
    SearchInput: CommonSearchInput,
};

const PrefabEditor = {
    BoolInput: PrefabEditorInputBool,
    ColorInput: PrefabEditorInputColor,
    Container: PrefabEditorContainer,
    EditDropdown: PrefabEditorEditDropdown,
    FileDropdown: PrefabEditorFileDropdown,
    FileSelectInput: PrefabEditorInputFileSelect,
    MenuBar: PrefabEditorMenuBar,
    Modals: PrefabEditorModals,
    NumberInput: PrefabEditorInputNumber,
    Overlay: PrefabEditorOverlay,
    PercentageInput: PrefabEditorInputPercentage,
    Prefabs: PrefabEditorPrefabs,
    TextAreaInput: PrefabEditorInputTextArea,
    TextInput: PrefabEditorInputText,
    Vec2Input: PrefabEditorInputVec2,
    Vec3Input: PrefabEditorInputVec3,
    Vec4Input: PrefabEditorInputVec4,
};

const PrefabScene = {
    Canvas: PrefabSceneCanvas,
    Collider: PrefabSceneCollider,
    Container: PrefabSceneContainer,
    Controls: PrefabSceneControls,
    Entity: PrefabSceneEntity,
    Content: PrefabSceneContent,
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
