const CollectionNavBar = ({ collections, onSelectCollection }) => {
  return (
    <div className="flex overflow-x-auto py-4">
      <button
        onClick={() => onSelectCollection('all')}
        className="px-4 py-2 m-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        All
      </button>
      {collections.map(collection => (
        <button
          key={collection.id}
          onClick={() => onSelectCollection(collection.id)}
          className="px-4 py-2 m-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {collection.name}
        </button>
      ))}
    </div>
  );
};

export default CollectionNavBar;
