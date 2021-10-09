/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { rocketSync, selectLuncher } from './features/rocketLuanch/rocketLuanchSlice';

function App() {
  const lunchers = useSelector(selectLuncher);
  const [lunchersData, setLuncherData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rocketSync());
  }, []);

  useEffect(() => {
    setLuncherData(lunchers.items);
  }, [lunchers]);

  useEffect(() => {
  }, [lunchersData]);

  return (
    <div className="container">
      <div className="row mb-3 mt-5">
        <div className="col-md-6">
          <div className="d-flex">
            <div className="dropdown me-2">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Status
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" href="void(0)">Success</a></li>
                <li><a className="dropdown-item" href="void(0)">Failed</a></li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Launch Date
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" href="void(0)">Last Week</a></li>
                <li><a className="dropdown-item" href="void(0)">Last Month</a></li>
                <li><a className="dropdown-item" href="void(0)">Last Year</a></li>
              </ul>
            </div>
            <button type="button" className="btn btn-outline-dark me-2">Is it Upcoming?</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex">
            <input type="search" className="form-control" placeholder="Rocket Name" />
            <button type="button" className="btn btn-success">
              <i className="fa fa-search">Search</i>
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            {lunchersData.map((item, inde) => (
              <div className="col-md-4" key={inde}>
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the content.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
