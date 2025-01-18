import React, { Component } from "react";
import { Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import swal from "sweetalert";

export default class UserEditDataButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      name: "",
      email: "",
    };
  }

  setOpenModal = (value) => {
    this.setState({ openModal: value });
  };

  setName = (value) => {
    this.setState({ name: value });
  };

  setEmail = (value) => {
    this.setState({ email: value });
  };

  onCloseModal = () => {
    this.setOpenModal(false);
    this.setName("");
    this.setEmail("");
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const url = "https://your-domain.com/api/login"; // Change to your actual endpoint

    try {
      await axios.post(url, { name, email });
      this.popupStatus("Success", "User data has changed", "success");
      this.onCloseModal();
    } catch (error) {
      console.error(error);
      this.popupStatus("Failed", "Can't change user data", "error");
    }
  };

  popupStatus = (title, text, icon) => {
    swal({
      title,
      text,
      icon,
      buttons: false,
      timer: 1500,
    });
  };

  render() {
    const { openModal, name, email } = this.state;
    return (
      <>
        <li
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          onClick={() => this.setOpenModal(true)}
        >
          <div className="flex items-center gap-2">
            <img src="/images/edit.svg" alt="edit icon" className="w-5 h-5" />
            <span>Edit Profile</span>
          </div>
          <span className="text-blue-500">&gt;</span>
        </li>
        <Modal show={openModal} size="md" onClose={this.onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 text-center">
                Edit Profile
              </h3>
              <div>
                <Label htmlFor="userName" value="Your Name" className="mb-2" />
                <TextInput
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(event) => this.setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" value="Your Email" className="mb-2" />
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => this.setEmail(event.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
