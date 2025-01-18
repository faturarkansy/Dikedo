import React, { Component } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { DataTable } from "simple-datatables";

import { API_URL } from "../utils/constants";
import DeviceEditButton from "./DeviceEditButton";
import DeviceDeleteButton from "./DeviceDeleteButton";

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
    };
  }

  initializeDataTable() {
    setTimeout(() => {
      if (
        document.getElementById("search-table") &&
        typeof DataTable !== "undefined"
      ) {
        const dataTable = new DataTable("#search-table", {
          searchable: true,
          sortable: false,
          scrollx: true,
          responsive: true,
        });
      }
    }, 0);
  }

  componentDidMount() {
    axios
      .get(API_URL + "devices")
      .then((res) => {
        const devices = res.data;
        this.setState({ devices }, () => {
          this.initializeDataTable();
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    const { devices } = this.state;

    return (
      <div className="">
        <div className="overflow-x-auto">
          <Table id="search-table">
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>No Kendaraan</Table.HeadCell>
              <Table.HeadCell>ID Perangkat</Table.HeadCell>
              <Table.HeadCell>Kategori</Table.HeadCell>
              <Table.HeadCell>No Telepon</Table.HeadCell>
              <Table.HeadCell>Operator</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {devices.length > 0 ? (
                devices.map((device) => (
                  <Table.Row key={device.id}>
                    <Table.Cell>
                      <div className="flex flex-row gap-x-1">
                        <DeviceEditButton device={device} />
                        <DeviceDeleteButton device={device} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>{device.no_kendaraan}</Table.Cell>
                    <Table.Cell>{device.id_perangkat}</Table.Cell>
                    <Table.Cell>{device.kategori}</Table.Cell>
                    <Table.Cell>{device.no_telepon}</Table.Cell>
                    <Table.Cell>{device.operator}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center">
                    No entries found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}