import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge,faUserGroup,faMoneyBill,faChartSimple,faGear,faClock,faBell,faAngleRight,faFileArrowUp,faRefresh,faFilter, faBuilding, faMotorcycle, faAngleLeft, faEdit, faTrashAlt, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import useAxiosInstance from "../../components/axiosInstance";

const Dashboard = () => {
  const base_url = 'https://testnet.jamfortetech.com'
  const location = useLocation();
  const navigate = useNavigate();
  // const user = location.state?.user;
  const { user, logout } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getAxiosInstance = useAxiosInstance()

  // console.log('dsh', user);
  

  const handleLogout = () => {
    logout();
    navigate('/')
  };  

  // Handling Inventory Section

  const handleDelete = async (pharmacyId,storeId,productId) => {
    const axiosInstance = getAxiosInstance();
    try {
      console.log(pharmacyId,storeId,productId);
      
      await axiosInstance.get(`/api/v1/pharmacies/${pharmacyId}/stores/${storeId}/products/${productId}`);

      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Fetch the list of products
    const axiosInstance = getAxiosInstance();
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/super-admin/${user.data[0].superAdminId}/products`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
          });
        setProducts(response.data.data[0]);
        // console.log(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);
  // End Of Inventory Section

  // console.log(products.length != 0 ? products[0].storeDetails[0].pharmacyDetails[0].name : 'No product');
  
  return (
    <>
    <div className="flex h-screen bg-gray-100">

{/* <!-- Sidebar --> */}
<div className="w-56 h-screen bg-white text-black flex flex-col">
    <div className="mt-6 text-xl text-center font-semibold"><span style={{color: '#2AB806'}}>My</span>Medics</div>
    <nav className="flex-1 p-4 text-xs leading-loose">
        <ul>
            <li><Link to={'/dashboard'} class="block py-2 px-4 bg-primary rounded">
              <FontAwesomeIcon className='mr-4' icon={faGauge}/>
              Dashboard</Link></li>
            <li><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4 text-wrap' icon={faBuilding}/>
              Pharmacy
              <FontAwesomeIcon className='ml-4 md:ml-12 text-wrap' icon={faAngleRight}/>
            </a></li>
            <li className='active'><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4 text-wrap' icon={faUserGroup}/>
              Products
              <FontAwesomeIcon className='ml-4 md:ml-12 text-wrap' icon={faAngleRight}/>
            </a></li>

            <li className='bg-gray-100 rounded-2xl'>
              <li><a className="block py-2 px-4 text-black border-b-2 mx-8">Inventory</a></li>
              <li><a className="block py-2 px-4 text-black ml-8">Categories</a></li>
            </li>

            <li><a className="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4 text-wrap' icon={faMotorcycle}/>
              Dispatch
              <FontAwesomeIcon className='ml-4 md:ml-12 text-wrap' icon={faAngleRight}/>
              </a></li>
            <li><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4 text-wrap' icon={faUserGroup}/>
              User Managment</a></li>
            <li><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4' icon={faMoneyBill}/>
              Finance</a>
            </li>
            <li><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4' icon={faChartSimple}/>
              Analytics</a></li>
            <li><a class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4' icon={faGear}/>
              Settings</a>
            </li>
            <li onClick={handleLogout}><Link to={'/'} class="block py-2 px-4 rounded">
              <FontAwesomeIcon className='mr-4' icon={faClock}/>
              Logout</Link>
            </li>
        </ul>
    </nav>
</div>

{/* <!-- Main Content --> */}
<div class="flex-1 flex flex-col">
    {/* <!-- Navbar --> */}
    <header className="bg-white shadow-md p-4 mt-4 mx-6 flex items-center justify-between">
        <div className="w-1/2 relative">
            <input type="text" placeholder="Search..." className="border border-gray-300 text-sm rounded-full px-4 pl-10 py-2 w-full focus:outline-none" />
            <FontAwesomeIcon className='absolute left-0 top-0 mt-3 ml-4 text-xs text-gray-300' icon={faSearch} />
        </div>
        <div className='flex flex-wrap align-center justify-between text-xs font-medium'>
          <div className='mt-4 relative'>
            <FontAwesomeIcon className='text-lg' icon={faBell} style={{color:'#2AB806'}} />
            <div className='absolute top-0 ml-3 w-3 h-3 text-center rounded-full bg-red-400 text-white'>6</div>
          </div>

          <select className='px-6 py-2 bg-transparent focus:outline-none mr-4'>
            <option>English</option>
            <option>Spanish</option>
            <option>German</option>
          </select>
          
          <img src="https://via.placeholder.com/50" alt="Example" className="w-10 h-10 object-cover rounded-full mr-4" />

          <div className='flex align-center justify-center mr-8'>
            <div className='flex flex-col bg-transparent focus:outline-none'>
              <span className='font-semibold'>{ user.data[0].name }</span>
              <span>{ user.data[0].role }</span>
            </div>
            <div className='w-4 h-4 text-center align-center border rounded-full ml-2'><FontAwesomeIcon icon={faAngleDown}/></div>
          </div>
        </div>
    </header>

    <div className='flex flex-wrap align-center justify-between text-xs mx-8 mt-6 pb-2 border-b-2'>
      <h2 className='text-2xl font-semibold'>Inventory</h2>
      <div className='flex justify-between gap-4'>
        <div id="options" className='flex flex-wrap align-center'>
          <button className='border font-medium px-6 py-2 bg-gray-50 rounded-l-xl '>
            <FontAwesomeIcon icon={faFilter}/>
          </button>
          <button className='border text-gray-800 font-semibold px-6 py-2 bg-gray-50'>Filter By</button>
          <select className='border text-gray-800 font-semibold px-6 py-2 bg-gray-50'>
            <option>States</option>
            <option value='a'>a</option>
            <option value='b'>a</option>
            <option value='c'>a</option>
            <option value='d'>a</option>
            <option value='e'>a</option>
          </select>
          <select className='border text-gray-800 font-semibold px-6 py-2 bg-gray-50'>
            <option>Zones</option>
            <option value='a'>a</option>
            <option value='b'>a</option>
            <option value='c'>a</option>
            <option value='d'>a</option>
            <option value='e'>a</option>
          </select>
          <select className='border text-gray-800 font-semibold px-6 py-2 bg-gray-50' disabled>
            <option>Status</option>
          </select>
          <button className='border font-semibold px-6 py-2 text-red-500 bg-gray-50 rounded-r-xl'>
            <FontAwesomeIcon className='text-xs mr-2' icon={faRefresh} />Reset Filter
          </button>
        </div>
        <div className='flex justify-between gap-4 text-xs'>
          <button className='bg-white p-2 rounded font-semibold'><FontAwesomeIcon className='mr-2' icon={faFileArrowUp}/>Export</button>
          {/* <Button text='Add new product' pd='10px 10px'/> */}
          <button className='p-2 rounded text-white' style={{background: '#2AB806'}}>Add New Products</button>
        </div>
      </div>
    </div>

    {/* <!-- Main Section --> */}
        <main className="min-w-full flex-1 p-6 relative overflow-x-auto">
            <div className="bg-white p-4 rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-fixed">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Pharmacy</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-800 tracking-wider">In Stock Brand</th>
                                <th className="px-6 py-3 text-center text-xs text-gray-800 tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs text-gray-800 tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.length === 0 ? <p>Loading...</p> : 
                          products.map(product => (
                            <tr key={product._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                  <img src={`https://testnet.jamfortetech.com/${product.images}`} alt="Example" className="w-12 h-12 object-cover" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">{product.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{product.storeDetails[0].pharmacyDetails[0].name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{product.category}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">NGN {product.price}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{product.quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{product.manufacturer}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 text-center">
                                {product.availability ? 
                                  <button className='bg-green-100 text-green-500 px-6 py-1 rounded-md font-medium'>In Stock</button> 
                                  :
                                  <button className='bg-red-100 text-red-500 px-3 py-1 rounded-md font-medium'>Out of Stock</button>
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  <td id="table-icons" className='flex align-center'>
                                    <button className='border text-gray-800 px-3 py-1 bg-gray-50 rounded-l-md'><FontAwesomeIcon className='text-gray-500' icon={faEdit}/></button>
                                    <button onClick={() => handleDelete(product.storeDetails[0].pharmacyDetails[0].pharmacyId ,product.storeDetails[0].storeId, product.productId)} className='border text-gray-800 px-3 py-1 bg-gray-50 rounded-r-md'><FontAwesomeIcon className='text-red-400' icon={faTrashAlt}/></button>
                                  </td>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table Footer */}
            <div className='flex flex-wrap align-center justify-between text-sm mt-6'>
              <p className='text-gray-400 text-xs'>Showing 1-09 of 78</p>
              <div id="table-arrows" className='flex flex-wrap align-center'>
                <button className='border text-gray-800 px-3 bg-gray-50 rounded-l-md'><FontAwesomeIcon icon={faAngleLeft}/></button>
                <button className='border text-gray-800 px-3 bg-gray-50 rounded-r-md'><FontAwesomeIcon icon={faAngleRight}/></button>
              </div>
            </div>
        </main>        
</div>
</div>
    </>
  );
};

export default Dashboard;