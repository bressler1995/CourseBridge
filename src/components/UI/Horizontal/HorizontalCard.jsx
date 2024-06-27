
function HorizontalCard({ onClick, selected, title, itemId }) {
    const visibility = useContext < publicApiType > VisibilityContext;
    const visible = visibility.useIsVisible(itemId, true);
  
    return (
      <div
        onClick={() => onClick(visibility)}
        style={{
          width: '160px',
        }}
        tabIndex={0}
      >
        <div className="card">
          <div>{title}</div>
          <div>visible: {JSON.stringify(visible)}</div>
          <div>selected: {JSON.stringify(!!selected)}</div>
        </div>
        <div
          style={{
            height: '200px',
          }}
        />
      </div>
    );
}

export default HorizontalCard