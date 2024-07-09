const StoreHeader = ({avatar, description, name}) => {
  return (
    <>
      <div className="flex items-center p-4 bg-gray-200">
      <img src={avatar} alt="Store Avatar" className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{description}</p>
      </div>
    </div>
    </>
  )
}

export default StoreHeader;