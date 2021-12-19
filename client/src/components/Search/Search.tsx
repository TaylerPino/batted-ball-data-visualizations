import Select from 'react-select'
import { IPlayer } from "../../models/IPlayer";

type Props = {
    data: Array<IPlayer>;
    parentCallback: any
};

const Search = ({ data, parentCallback }: Props) => {
  let options = data.map(item => ({value: item.id, label: item.name}))
  return <Select options={options} onChange={parentCallback} value={null}  placeholder={<div>Type to search players</div>}/>
}
export default Search;