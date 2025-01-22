import React, { Component } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";

export default class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            noKendaraan: "",
            idPerangkat: "",
            kategori: "",
            noTelepon: "",
            operator: "",
        };
    }

    setOpenModal = (value) => {
        this.setState({ openModal: value });
    };

    setNoKendaraan = (value) => {
        this.setState({ noKendaraan: value });
    };

    setIdPerangkat = (value) => {
        this.setState({ idPerangkat: value });
    };

    setKategori = (value) => {
        this.setState({ kategori: value });
    };

    setNoTelepon = (value) => {
        this.setState({ noTelepon: value });
    };

    setOperator = (value) => {
        this.setState({ operator: value });
    };

    onCloseModal = () => {
        this.setOpenModal(false);
        this.setNoKendaraan("");
        this.setIdPerangkat("");
        this.setKategori("");
        this.setNoTelepon("");
        this.setOperator("");
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { noKendaraan, idPerangkat, kategori, noTelepon, operator } =
            this.state;
        const url = `https://dikedo.com/api/device?id=${device.id}`; // Change endpoint

        try {
            await axios.post(url, {
                noKendaraan: noKendaraan,
                idPerangkat: idPerangkat,
                kategori: kategori,
                noTelepon: noTelepon,
                operator: operator,
            });
            this.popupStatus("Success", "Device data has changed", "success");
        } catch (error) {
            console.log(error);
            this.popupStatus("Failed", "Cant't change device data", "error");
        }
    };

    popupStatus = (title, text, icon) => {
        swal({
            title: title,
            text: text,
            icon: icon,
            buttons: false,
            timer: 1500,
        });
    };

    render() {
        const {
            openModal,
            noKendaraan,
            idPerangkat,
            kategori,
            noTelepon,
            operator,
        } = this.state;
        return (
            <>
                <div onClick={() => this.setOpenModal(true)} className="bg-cyan-600 shadow-md rounded-lg py-2 px-4 md:px-6 w-fit border border-gray-200 flex items-center justify-center cursor-pointer">
                    <p className="font-bold text-xs md:text-sm text-white">
                        Add New <FontAwesomeIcon icon={faPlus} className="fa-solid" />
                    </p>
                </div>
                <Modal show={openModal} size="md" onClose={this.onCloseModal} popup>
                    <Modal.Header><div className="p-4">Tambah Kendaraan</div></Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="noKendaraan" value="No Kendaraan" />
                                </div>
                                <TextInput
                                    id="noKendaraan"
                                    onChange={(event) => this.setNoKendaraan(event.target.value)}
                                    // placeholder="B1977WSA"
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idPerangkat" value="ID Perangkat" />
                                </div>
                                <TextInput
                                    id="idPerangkat"
                                    onChange={(event) => this.setIdPerangkat(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="kategori" value="Kategori" />
                                </div>
                                <TextInput
                                    id="kategori"
                                    onChange={(event) => this.setKategori(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="noTelepon" value="No Telepon" />
                                </div>
                                <TextInput
                                    id="noTelepon"
                                    onChange={(event) => this.setNoTelepon(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="operator" value="Operator" />
                                </div>
                                <TextInput
                                    id="operator"
                                    onChange={(event) => this.setOperator(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Button onClick={this.handleSubmit} className="w-full">
                                    Tambah Kendaraan
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}