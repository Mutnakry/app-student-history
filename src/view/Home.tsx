
import Navbar from '../component/Navbar'
import MenuCategory from './category/MenuCategory'
import Carucel from './category/Carucel'
import ProductHome from './product/ProductHome'
import Footer from '../component/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <Carucel />
      </div>
      <div>
        <MenuCategory />
      </div>
      <div>
        <ProductHome />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home