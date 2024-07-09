const CategoryBar = ({categories, onSelectCategory}) => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar;