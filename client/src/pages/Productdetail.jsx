import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Accordion, Button } from 'react-bootstrap'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { getAllProducts, getSingleProduct } from '../api/api'
import Productcard from '../components/Productcard'
import { formatCurrency } from '../utils/formatCurrency'
import { useStateContext } from '../config/context'
import Spinner from '../utils/Spinner'

export default function Productdetail() {
  const { slug } = useParams()
  const [productId, setProductId] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [current, setCurrent] = useState(0)
  const { addToCart } = useStateContext()
  const length = productId?.images?.length

  useEffect(() => {
    window.document.title = productId.title
    window.scrollTo({ top: '0' })
    setLoading(true)
    getSingleProduct(slug)
      .then((res) => {
        setProductId(res.data)
      })
      .catch((error) => {
        setError(error)
      })
    setLoading(false)
  }, [slug, productId.title])

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(productId?.images) || productId?.images?.length <= 0) {
    return null
  }

  const recommdendations = products.filter(
    (product) => product.category !== productId.category
  )
  // const shuffledRecommend = shuffleShow(recommdendations, 6)

  return (
    <Container className='mt-5 py-5'>
      {error && <p>{error.message}</p>}
      {loading && <Spinner/>}
      <Row className='w-100 mx-auto'>
        <Col md={6} lg={8}>
          <div className='d-lg-flex gap-4'>
            <div className='d-none d-lg-block'>
              {productId.images?.map((image, i) => (
                <div
                  key={i}
                  className={
                    i === current
                      ? 'd-flex d-lg-block mb-4 justify-content-center align-items-center border border-danger p-2 cursor'
                      : 'd-flex d-lg-block mb-4 justify-content-center align-items-center cursor'
                  }
                  style={{ width: '120px', height: '150px' }}
                  onClick={() => setCurrent(i)}
                >
                  <Image
                    src={image}
                    className=' mb-4'
                    alt='imgpic'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className='d-flex justify-content-center align-items-center mx-auto w-100 h-100 position-relative'>
              <BsArrowLeft
                className='position-absolute top-50 start-0 translate-middle text-danger cursor'
                size='1.8rem'
                onClick={prevSlide}
              />
              <BsArrowRight
                className='position-absolute top-50 start-100 translate-middle text-danger cursor'
                size='1.8rem'
                onClick={nextSlide}
              />
              {productId.images?.map((image, i) => (
                <div key={i} style={{ width: 'auto', height: '400px' }}>
                  {i === current && (
                    <Image
                      src={image}
                      alt='imgpic'
                      className='mb-4 p-2'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col md={6} lg={4}>
          <div className='border border-danger p-3'>
            <p className='mb-0'>{productId.brand}</p>
            <h1 className='text-danger fs-2'>{productId.title}</h1>
            <p className='texting'>{formatCurrency(productId.price)}</p>
            <Button
              variant='danger'
              className='w-100 rounded-0 mb-4'
              size='lg'
              onClick={() => addToCart(productId)}
            >
              Add To Cart
            </Button>
            <Accordion flush>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  <span>Product info</span>
                </Accordion.Header>
                <Accordion.Body>
                  <p className='small'>{productId.desc}</p>
                  {productId.extra.map((ex, i) => (
                    <p key={i} className='small'>
                      - {ex}
                    </p>
                  ))}
                  <p className='small'>Color: {productId.color}</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>
                  {' '}
                  <span>Shipping & Returns</span>
                </Accordion.Header>
                <Accordion.Body>
                  <p className='small'>FREE RETURNS within 14 days</p>
                  <p className='small'>Delivery time from 3 to 5 days </p>
                  <p className='small'>Shipping Cost: may be an option</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>
      </Row>
      <div>
        <h1 className='text-danger display-4' style={{ marginTop: '5rem' }}>
          You May Also Like
        </h1>
        <hr style={{ border: '1px solid red' }} />
        <Row className='w-100 mx-auto'>
          {recommdendations.slice(0, 6).map((product) => (
            <Col md={6} lg={4} key={product._id}>
              <Productcard {...product} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  )
}
