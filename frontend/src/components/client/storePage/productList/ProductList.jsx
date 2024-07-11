import ProductCard from '../../productCard/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const ProductList = ({ products }) => {
  return (
    <>
      <div className='parent'>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
          dotListClass='custom-dot-list-style'
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </div>
      ;
    </>
  );
};

export default ProductList;
