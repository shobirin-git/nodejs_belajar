const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db.js");

router.get("/allStudents", async (req, res) => {
  const query = "SELECT top 2 * FROM Products order by ProductId desc; SELECT top 1 * FROM Products order by ProductId asc;";
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    return res.status(200).send({
      status: 'OK',
      data1: result.recordsets[0],
      data2: result.recordsets[1]
    })
    // res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/salesorder", async (req, res) => {
  const query = "sp_apps_GetSalesOrder";
  const values = ["LG26O002250705046"];
  const paramNames = ["SoNumber"];
  const isStoredProcedure = true;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
var salesOrderId = result.recordsets[0][0].SalesOrderId;
var salesOrderNumber = result.recordsets[0][0].SalesOrderNumber;
var docDate = result.recordsets[0][0].DocDate;
var docTotal = result.recordsets[0][0].DocTotal;

    const so_Header_arr = new Object({
      "SalesOrderId": salesOrderId,
      "SalesOrderNumber": salesOrderNumber,
      "DocDate": docDate,
      "DocTotal": docTotal
    });
       
    return res.status(200).send({
      status: 'OK',
      SO_Header: so_Header_arr,
      // SO_Header: result.recordsets[0],
      SO_Detail: result.recordsets[1]
    })
    // res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { router };