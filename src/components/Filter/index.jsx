import React, { useState, useEffect } from 'react';
import data from '../../data.json';
import './index.css';

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  const handleFilter = () => {
    let filtered = products;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== '') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (company !== '') {
      filtered = filtered.filter(product => product.company === company);
    }

    filtered = filtered.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );

    if (freeShipping) {
      filtered = filtered.filter(product => product.shipping);
    }

    if (sortBy === 'a-z') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(filtered);
    setIsFiltered(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setCompany('');
    setSortBy('');
    setFreeShipping(false);
    setMinPrice(0);
    setMaxPrice(100000);
    setIsFiltered(false);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const categories = Array.from(new Set(data.map(product => product.category)));
  const companies = Array.from(new Set(data.map(product => product.company)));

  return (
    <div>
      <div className="filter-container">
        <div className="filter-info">
          <p>Total Products: {products.length}</p>
          {isFiltered && <p>Filtered Products: {filteredProducts.length}</p>}
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="filter-input"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="filter-input"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="filter-input"
          >
            <option value="">All Companies</option>
            {companies.map(comp => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="filter-input"
          >
            <option value="">Sort By</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>


        <div className='slider-btn'>
          <div className="slider">
          <label className='price' >Price Range: ${minPrice} - ${maxPrice}</label>
          <input
            type="range"
            min="0"
            max="100000"
            value={minPrice}
            onChange={handleMinPriceChange}
            style={{ margin: '0 10px' }}
            className="filter-input slider"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            style={{ margin: '0 10px' }}
            className="filter-input slider"
          />
          </div>
          <label className="free"> Free Shipping
          
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={() => setFreeShipping(!freeShipping)}
          />
          </label>
        <button onClick={handleFilter} className="filter-btn">Submit</button>
        <button onClick={handleReset} className="reset">Reset</button>
        </div>
      </div>
      {isFiltered && (
        <div className="products-container">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>Company: {product.company}</p>
              <p>Price: ${product.price}</p>
              {product.shipping && <p>Free Shipping</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
