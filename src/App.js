/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-void */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { rocketSync, selectLuncher, filterData } from './features/rocketLuanch/rocketLuanchSlice';

import styles from './RocketItem.module.css';

function App() {
  const lunchers = useSelector(selectLuncher);
  const [lunchersData, setLuncherData] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    time: '',
    upcoming: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rocketSync());
  }, []);

  useEffect(() => {
    setLuncherData(lunchers.items);
  }, [lunchers]);

  useEffect(() => {
  }, [lunchersData]);

  function resetFilter() {
    dispatch(rocketSync());
  }

  function filterAPiData() {
    dispatch(filterData(filters));
  }

  return (
    <div className="container">
      <div className="row mb-3 mt-5">
        <div className="col-md-8">
          <div className="d-flex">
            <div className="dropdown me-2">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                {filters.status !== '' ? filters.status : 'Status'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" href={void (0)} onClick={() => { setFilters({ ...filters, status: 'success' }); }}>Success</a></li>
                <li><a className="dropdown-item" href={void (0)} onClick={() => { setFilters({ ...filters, status: 'failed' }); }}>Failed</a></li>
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
            <div className="d-flex">
              <button type="button" onClick={() => { resetFilter(); }} className="btn btn-warning me-2">Reset</button>
              <button type="button" onClick={() => { filterAPiData(); }} className="btn btn-primary">
                <i className="fa fa-filter">Filter</i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
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
                  <div className={styles.cardImg}>
                    <img src={item.links.mission_patch_small} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.mission_name}
                      {item.launch_success ? <span className="badge bg-success">Success</span> : <span className="badge bg-danger">Failed</span>}
                    </h5>
                    <p className={`card-text ${styles.cardTextFit}`}>{item.details}</p>
                    <a href={item?.links?.article_link?.wikipedia} className="btn btn-link">Read More</a>
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
