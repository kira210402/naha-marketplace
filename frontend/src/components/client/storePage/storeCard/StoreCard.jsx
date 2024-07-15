import { Link } from 'react-router-dom';

const StoreCard = ({ store, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded flex items-center w-max">
      <Link to={`/stores/${store.id}`} className="flex-grow">
        <img src={store.avatar} alt={store.name} className="w-16 h-16 rounded-full mr-4" />
      </Link>
      <div className="flex-grow">
        <Link to={`/stores/${store.id}`} className="flex-grow">
          <h3 className="text-xl font-bold">{store.name}</h3>
        </Link>
        <p>{store.description}</p>
        <p><b>Phone Number:</b> {store.phoneNumber}</p>
        <p><b>Address:</b> {store.address}</p>
        <p><b>Number of products:</b> {store.productCount}</p>
      </div>
      <div className="flex flex-col space-x-2 ml-10">
        <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mb-2">Edit</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  )
}

export default StoreCard;