import { Line } from "@ant-design/plots";
import { Card, DatePicker } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/actions/dashboard/getDashboardDataAction";
import { loadAllPurchase } from "../../../redux/actions/purchase/getPurchaseAction";
import { loadAllSale } from "../../../redux/actions/sale/getSaleAction";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";
import NotificationIcon from "../../notification/NotificationIcon";
import DueClientNotification from "../../notification/DueClientNotification";
import NotificationSystem from "../../notification/NewCommandeNotification";

const DemoLine = () => {
  const [list, setList] = useState([]);
  const [NewCommande, setNewCommande] = useState([]);

  const productsList = useSelector((state) => state.products.list);
  const Clientlist = useSelector((state) => state.sales.list);

  useEffect(() => {
    setList(productsList);
    setNewCommande(Clientlist);
  }, [productsList, Clientlist]);

  //Date fucntinalities
  const [startdate, setStartdate] = useState(moment().startOf("month"));
  const [enddate, setEnddate] = useState(moment().endOf("month"));
  const dispatch = useDispatch();

  const data = useSelector((state) => state.dashboard.list?.saleProfitCount);
  const cardInformation = useSelector(
    (state) => state.dashboard.list?.cardInfo
  );

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(loadDashboardData({ startdate, enddate }));
    dispatch(
      loadAllPurchase({
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate
      })
    );
    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
        user: ""
      })
    );
  }, []);

  const onCalendarChange = (dates) => {
    const newStartdate = dates?.[0] ? dates[0].format("YYYY-MM-DD") : startdate;
    const newEnddate = dates?.[1] ? dates[1].format("YYYY-MM-DD") : enddate;

    setStartdate(newStartdate);
    setEnddate(newEnddate);

    dispatch(
      loadDashboardData({
        startdate: newStartdate,
        enddate: newEnddate
      })
    );

    dispatch(
      loadAllPurchase({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate
      })
    );

    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate,
        user: ""
      })
    );
  };

  const config = {
    data,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) => `${v / 1000} K`
      }
    },
    legend: {
      position: "top"
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000
      }
    }
  };

  return (
    <Fragment>
      <div className="row d-flex" style={{ maxWidth: "100%", marginBottom:"10px" }}>
        <div className="col-md-3">
          <RangePicker
            onCalendarChange={onCalendarChange}
            defaultValue={[startdate, enddate]}
            className="range-picker"
          />
        </div>
        <div className="col-md-9" style={{display:"flex", justifyContent:"flex-end", gap:"3%"}}>
          <NotificationSystem list={NewCommande} />
          <NotificationIcon list={list} />
        </div>
      </div>

      <NewDashboardCard information={cardInformation} />

      {/* <Card title="Ventes vs bénéfices">
        {data ? <Line {...config} /> : <Loader />}
      </Card> */}
    </Fragment>
  );
};

export default DemoLine;
