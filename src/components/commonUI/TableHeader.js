import ButtonUI from "./ButtonUI";
import "./TableHeader.scss";
import TableTitle from "./TableTitle";

const TableHeader = (props) => {
  const { title, label, showAddModal, rightContent } = props;
  return (
    <div className="table-header">
      <TableTitle>{title}</TableTitle>
      <ButtonUI label={label} onClick={showAddModal} />

      {/* {rightContent} */}
    </div>
  );
};

export default TableHeader;
