import React, { Component } from "react";
import { Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import swal from "sweetalert";

export default class UserEditPasswordButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      otp: "",
      password: "",
    };
  }

  setOpenModal = (value) => {
    this.setState({ openModal: value });
  };

  setOtp = (value) => {
    this.setState({ otp: value });
  };

  setPassword = (value) => {
    this.setState({ password: value });
  };

  onCloseModal = () => {
    this.setOpenModal(false);
    this.setOtp("");
    this.setPassword("");
  };

  requestOtp = async () => {
    const url = "https://your-domain.com/api/request-otp";

    try {
      await axios.post(url);
      this.popupStatus("Success", "OTP sent to your email", "success");
    } catch (error) {
      console.error(error);
      this.popupStatus("Failed", "Can't send OTP", "error");
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { otp, password } = this.state;
    const url = "https://your-domain.com/api/change-password";

    try {
      await axios.post(url, { otp, password });
      this.popupStatus("Success", "Password changed successfully", "success");
      this.onCloseModal();
    } catch (error) {
      console.error(error);
      this.popupStatus("Failed", "Can't change password", "error");
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
    const { openModal, otp, password } = this.state;
    return (
      <>
        <li
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          onClick={() => this.setOpenModal(true)}
        >
          <div className="flex items-center gap-2">
            <img src="/images/password.svg" alt="password icon" className="w-5 h-5" />
            <span>Change Password</span>
          </div>
          <span className="text-blue-500">&gt;</span>
        </li>
        <Modal show={openModal} size="md" onClose={this.onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 text-center">
                Change Password
              </h3>
              <div>
                <Label htmlFor="otp" value="OTP Code" className="mb-2" />
                <TextInput
                  id="otp"
                  placeholder="123456"
                  value={otp}
                  onChange={(event) => this.setOtp(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" value="New Password" className="mb-2" />
                <TextInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => this.setPassword(event.target.value)}
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
