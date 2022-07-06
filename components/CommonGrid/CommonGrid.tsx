type GridPropTypes = {
    col?: number;
    row?: number;
};

const Grid: React.FC<GridPropTypes> = ({ col = 2, row = 2, children }) => {
    return <div className={`grid grid-cols-${col} grid-rows-${row} place-items-center gap-5`}>{children}</div>;
};

export default Grid;
