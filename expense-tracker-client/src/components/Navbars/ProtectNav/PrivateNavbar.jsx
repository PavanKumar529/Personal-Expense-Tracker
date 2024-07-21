import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PrivateNavbar = ( { userImage }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <i className="bi bi-currency-exchange text-yellow-400"></i> Expense Tracker
        </Link>
        <div className="block lg:hidden">
          <button className="text-white" id="navbar-toggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 bg-gray-300 rounded-lg focus:outline-none focus:bg-gray-100"
            />
            <button className="absolute right-0 mr-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="w-full lg:flex lg:items-center lg:w-auto hidden" id="navbar-menu">
          <ul className="lg:flex lg:justify-between text-white text-sm lg:gap-4">
            <li className="nav-item">
              <NavLink to="/list-expenses" className="nav-link" activeClassName="text-yellow-400">
                Expenses List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/list-incomes" className="nav-link" activeClassName="text-yellow-400">
                Income List
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink to="/dashboard" className="nav-link" activeClassName="text-yellow-400">
                Dashboard
              </NavLink>
            </li>
          </ul>

          <div className="flex mt-4 lg:mt-0 gap-4">
            <Link to="/add-expense" className="btn btn-danger text-white bg-red-600 px-4 py-2 rounded">
              New Expense
            </Link>
            <Link to="/add-income" className="btn btn-success text-white bg-green-600 px-4 py-2 rounded">
              New Income
            </Link>

            {/* <div className="nav-item">
              <NavLink to="/profile" className="nav-link" activeClassName="text-yellow-400">
                Profile
              </NavLink>
            </div> */}
            <div className="nav-item mr-4">
              <NavLink to="/profile" className="nav-link" activeClassName="text-yellow-400">
                  {userImage ? (
                      <img
                          src={`/uploads/${userImage}`}
                          alt="Profile"
                          className="rounded-full h-8 w-8 object-cover"
                      />
                  ) : (
                      <div className="rounded-full h-8 w-8 bg-gray-300"></div>
                  )}
              </NavLink>
          </div>
            {/* Replace with your logout button */}
            {/* <button
              onClick={() => dispatch(logoutAction())}
              className="btn btn-warning text-black bg-yellow-400 px-4 py-2 rounded"
            >
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
