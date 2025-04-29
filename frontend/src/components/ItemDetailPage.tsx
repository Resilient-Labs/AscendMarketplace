import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <div className="page-container">
      <h2>Item Detail Page</h2>
      <p>Item ID: {itemId}</p>
     
    </div>
  );
};

export default ItemDetail;