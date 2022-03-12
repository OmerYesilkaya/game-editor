## Folder Structure

#### OLD

-   core
-   features
-   pages
-   types

#### NEW

-   components
    -   Button
        -   Button.tsx
        -   Button.stories.tsx
        -   Button.test.tsx
        -   index.ts
        -   types.ts
    -   ...
-   views
    -   AssetWindow
        -   AssetWindow.tsx
        -   AssetWindow.stories.tsx
        -   AssetWindow.test.tsx
        -   index.ts
        -   types.ts
    -   PrefabScene
        -   ...
-   pages
-   models
-   hooks
-   constants
-   stores
    -   PrefabEditorStore
        -   slice1.ts
        -   slice2.ts
        -   usePrefabEditorStore.ts
        -   types.ts
    -   ...
-   lib
    -   shaders
    -   math
    -   graphics
    -   materials

## TODO

-   Feat: Add transform module when a new prefab is created
-   Bug: State management problem!!
-   Minor: Prefab node drag/long click should not open module menu
-   Bug: Root prefab node should not have delete button
-   Feat: Duplicate button doesn't work
-   Minor: Pressing `esc` should close currently active menu
-   Minor: Number inputs should be adjustable via drag
-   Feat: Prefab scene window
-   Feat: Timeline top toolbar
    -   Window activation buttons
-   Feat: Play animation preview on hover
-   Minor: Animation scale and speed should decrement on right click.
-   Feat: Default value from backend

## DONE

-   Figure a way out for dynamic table generation for editing units
    -   Tag system; every stat is now a tag, to edit a monster's stat select the appropriate tag and monsters with selected tags will show.
    -   Create a monster; user is now able to create a new monster with the existing tags.

### 2021-11-21

-
