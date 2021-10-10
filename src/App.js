import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { rocketSync, selectLuncher, filterData } from './features/rocketLuanch/rocketLuanchSlice';

import styles from './RocketItem.module.css';

function App() {
  const lunchers = useSelector(selectLuncher);
  const [lunchersData, setLuncherData] = useState([]);
  const [dateTimeFilter, setDateTimeFilter] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    time: {
      last_week: '',
      last_month: '',
      last_year: '',
    },
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
    setFilters({
      status: '',
      time: {
        last_week: '',
        last_month: '',
        last_year: '',
      },
      upcoming: false,
      searchTxt: '',
    });
    setDateTimeFilter('');
    dispatch(rocketSync());
  }

  function filterAPiData() {
    dispatch(filterData(filters));
  }

  function dateTimeFilterFun(slug) {
    let filterObj = { ...filters };
    filterObj = JSON.parse(JSON.stringify(filterObj));
    filterObj.time.last_week = '';
    filterObj.time.last_month = '';
    filterObj.time.last_year = '';
    if (slug === 'week') {
      setDateTimeFilter('Last Week');
      const lastweek = moment().subtract(1, 'weeks');
      filterObj.time.last_week = `${lastweek.startOf('week').unix()},${lastweek.endOf('week').unix()}`;
    } else if (slug === 'month') {
      setDateTimeFilter('Last Month');
      const lastweek = moment().subtract(1, 'months');
      filterObj.time.last_month = `${lastweek.startOf('month').unix()},${lastweek.endOf('month').unix()}`;
    } else if (slug === 'year') {
      setDateTimeFilter('Last Year');
      const lastweek = moment().subtract(1, 'years');
      filterObj.time.last_year = `${lastweek.startOf('year').unix()},${lastweek.endOf('year').unix()}`;
    } else {
      setDateTimeFilter('');
    }
    setFilters(filterObj);
  }

  return (
    <div className="container">
      <div className="row mb-3 mt-5">
        <div className="col-md-12">
          <div className="d-flex">
            <div className="dropdown me-2">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                {filters.status !== '' ? filters.status : 'Status'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li><button type="button" className="dropdown-item" onClick={() => { setFilters({ ...filters, status: 'success' }); }}>Success</button></li>
                <li><button type="button" className="dropdown-item" onClick={() => { setFilters({ ...filters, status: 'failed' }); }}>Failed</button></li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                {dateTimeFilter !== '' ? dateTimeFilter : 'Launch Date'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li><button className="dropdown-item" type="button" onClick={() => { dateTimeFilterFun('week'); }}>Last Week</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => { dateTimeFilterFun('month'); }}>Last Month</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => { dateTimeFilterFun('year'); }}>Last Year</button></li>
              </ul>
            </div>
            <button type="button" onClick={() => { setFilters({ ...filters, upcoming: !filters.upcoming }); }} className={`btn ${filters.upcoming ? 'btn-dark' : 'btn-outline-dark'} me-2`}>Is it Upcoming?</button>
            <input type="search" className="form-control w-50" placeholder="Rocket Name" onChange={(evt) => { setFilters({ ...filters, searchTxt: evt.currentTarget.value }); }} />
            <button type="button" onClick={() => { resetFilter(); }} className="btn btn-warning me-2">Reset</button>
            <button type="button" onClick={() => { filterAPiData(); }} className="btn btn-success">
              <i className="fa fa-search">Search</i>
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          {lunchersData.length > 0 && (
          <div className="row">
            {lunchersData.map((item, inde) => (
              <div className="col-md-4" key={item.flight_number + item.rocket.rocket_id}>
                <div className="card mb-2">
                  <div className={styles.cardImg}>
                    <img src={item.links.mission_patch_small} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body">
                    <div className="card-title">
                      <table className={styles.customTable}>
                        <tbody>
                          <tr>
                            <th>Mission :</th>
                            <td>{item.mission_name}</td>
                          </tr>
                          <tr>
                            <th>Status :</th>
                            <td>{item.launch_success ? <span className="badge bg-success">Success</span> : <span className="badge bg-danger">Failed</span>}</td>
                          </tr>
                          <tr>
                            <th>Rocket Name :</th>
                            <td>{item.rocket.rocket_name}</td>
                          </tr>
                          <tr>
                            <th>Detail :</th>
                            <td>
                              <p className={`card-text ${styles.cardTextFit}`}>
                                {item.details}
                              </p>
                              <a href={item.links.wikipedia} className="btn btn-link">Read More</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          {lunchersData.length === 0 && (
          <div className="d-flex justify-content-center align-items-center">
            <h3> Nothing Found</h3>
          </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
