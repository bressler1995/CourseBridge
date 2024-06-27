import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import HorizontalCard from './HorizontalCard';

const getItems = () => {
    return Array(20)
      .fill(0)
      .map((_, ind) => ({ id: `element-${ind}` }));
}

function HorizontalContainer() {
  const [items, setItems] = useState(getItems);
  const [selected, setSelected] = useState([]);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id),
      );
    };

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {items.map(({ id }) => (
            <HorizontalCard
              itemId={id}
              title={id}
              key={id}
              onClick={handleClick(id)}
              selected={isItemSelected(id)}
            />
          ))}
        </ScrollMenu>
      );
}

const LeftArrow = () => {
    const visibility = React.useContext < publicApiType > VisibilityContext;
    const isFirstItemVisible = visibility.useIsVisible('first', true);
    return (
      <Arrow
        disabled={isFirstItemVisible}
        onClick={visibility.scrollPrev}
        className="left"
      >
        Left
      </Arrow>
    );
  };
  
  const RightArrow = () => {
    const visibility = React.useContext < publicApiType > VisibilityContext;
    const isLastItemVisible = visibility.useIsVisible('last', false);
    return (
      <Arrow
        disabled={isLastItemVisible}
        onClick={visibility.scrollNext}
        className="right"
      >
        Right
      </Arrow>
    );
  };

export default HorizontalContainer