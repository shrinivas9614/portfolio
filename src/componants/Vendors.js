import React from "react";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";
const AddVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [vid, setVid] = useState(null);
  const [vfullname, setVfullname] = useState("");
  const [vemail, setVemail] = useState("");
  const [vpassword, setVpassword] = useState("");
  const [vphone, setVphone] = useState("");
  const [vusername, setVusername] = useState("");
  const [vdealsname, setVdealsname] = useState("");
  const [vdealsdescriptions, setVdealsdescriptions] = useState("");
  const [vdealsprice, setVdealsprice] = useState("");
  const [selectVendors, setSelectVendors] = useState();

  const formik = useFormik({
    initialValues: {
      vid: "",
      vfullname: "",
      vemail: "",
      vpassword: "",
      vphone: "",
      vusername: "",
      vdealsname: "",
      vdealsdescriptions: "",
      vdealsprice: "",
    },
  });

  console.log("select vedors", selectVendors);
  useEffect(() => {
    refreshVendors();
  }, []);

  const refreshVendors = () => {
    API.get("http://127.0.0.1:8000/backend_api/vendors/")
      .then((res) => {
        setVendors(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = {
      vid,
      vfullname,
      vemail,
      vpassword,
      vphone,
      vusername,
      vdealsname,
      vdealsdescriptions,
      vdealsprice,
    };
    API.post("http://127.0.0.1:8000/backend_api/vendors/", item).then(() =>
      refreshVendors()
    );
  };

  const onUpdate = (vid) => {
    let item = [vid];
    API.patch(`http://127.0.0.1:8000/backend_api/vendors/${vid}`, item).then(
      () => refreshVendors()
    );

    return (
      <div className="container mt5">
        <div className="row">
          <div className="col-md-4">
            <h3 className="float-left">ADD VENDORS</h3>
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="vid">
                <Form.Label>Vendor ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor ID"
                  value={formik.value.vid}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vfullname">
                <Form.Label>Vendor Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor Full Name"
                  value={formik.values.vfullname}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vemail">
                <Form.Label>Vendor Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor Email"
                  value={formik.values.vemail}
                  onChange={(e) => formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vpassword">
                <Form.Label>Vendor Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Vendor Password"
                  value={formik.values.vpassword}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="vphone">
                <Form.Label>Vendor Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor Phone"
                  value={formik.values.vphone}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vusernames">
                <Form.Label>Vendor Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor Username"
                  value={formik.values.vemailvusername}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vdealsname">
                <Form.Label>Deals Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Deals Name"
                  value={formik.values.vdealsname}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vdealsdescription">
                <Form.Label>Deals Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Deals Name"
                  value={formik.values.vdealsdescriptions}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vdealsprice">
                <Form.Label>Deals Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Deals Price"
                  value={formik.values.vdealsprice}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <div className="float-right">
                <Button variant="primary" onClick={onSubmit}>
                  {" "}
                  save{" "}
                </Button>
                <Button variant="primary" onClick={() => onUpdate()}>
                  {" "}
                  update{" "}
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-md-8 m">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">vfullname</th>
                  <th scope="col">vemail</th>
                  <th scope="col">vpassword</th>
                  <th scope="col">vphone</th>
                  <th scope="col">vusername</th>
                  <th scope="col">vdealsname</th>
                  <th scope="col">vdealsdescription</th>
                  <th scope="col">vdealsprice</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => {
                  return (
                    <tr key="">
                      <th scope="row">{vendor.vid}</th>
                      <td>{vendor.vfullname}</td>
                      <td>{vendor.vemail}</td>
                      <td>{vendor.vpassword}</td>
                      <td>{vendor.vphone}</td>
                      <td>{vendor.vusername}</td>
                      <td>{vendor.vdealsname}</td>
                      <td>{vendor.vdealsdescriptions}</td>
                      <td>{vendor.vdealsprice}</td>

                      <td>
                        <i
                          className="fa fa-pencil-square text-primary d-inline"
                          aria-hidden="true"
                          onClick={() => setSelectVendors(vendor)}
                        >
                          <Button variant="primary" onClick={onSubmit}>
                            {" "}
                            update{" "}
                          </Button>
                        </i>
                        <i
                          className="fa fa-trash-o text-danger d-inline mx-3"
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
};

export default AddVendors;
