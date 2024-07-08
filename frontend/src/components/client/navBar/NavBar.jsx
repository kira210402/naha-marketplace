const NavBar = () => {
  const categories = [
    'Fashion',
    'Technology',
    'Health',
    'Sport',
    'Makeup',
    'Food & Drink'
  ]
  return (
    <nav className=''>
      {categories.map(category => {
        return (
          <a
            key={category}
            href='#'
            className='hover:text-blue-400 mr-4'
            >
            {category}
          </a>
        )
      })}
    </nav>
  )
}

export default NavBar;