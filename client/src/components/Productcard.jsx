import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function Productcard({ images, slug, title, price, brand }) {
  return (
    <Link to={`/product/${slug}`}>
      <div className='text-danger position-relative'>
        <div className='h-100 w-100 d-none d-lg-flex hover-me position-absolute top-0'>
          <Button className='w-100 rounded-0 ' size='lg' variant='danger'>
            VIEW PRODUCT
          </Button>
        </div>
        <div
          style={{ height: '450px', width: '100%' }}
          className='d-flex justify-content-center flex-column mb-0'
        >
          <Image
            src={images?.[0]}
            alt={title}
            loading='lazy'
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <p className='small mb-0 text-end'>{formatCurrency(price)}</p>
        <hr style={{ border: '1px solid red' }} />
        <Button
          className='w-100 rounded-0 d-lg-none'
          size='lg'
          variant='danger'
        >
          VIEW PRODUCT
        </Button>

        <p className='mb-0 fw-bold'>{title}</p>
        <p className='small fw-light'>{brand}</p>
      </div>
    </Link>
  )
}
