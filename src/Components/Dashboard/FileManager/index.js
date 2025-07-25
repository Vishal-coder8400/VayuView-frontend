import React, { useEffect, useState } from "react";
import "./style.scss";
import { stateConnected } from "../../../utils/redux_tools";
import { callApi } from "../../../utils/api";
import qr from "./qrCode.png";
import Select from "react-select";
import axios from "axios";
import { getBaseURL } from "../../../common/constant/urls";

function BankModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="wallet-open-button">
        Open Modal
      </button>
      {isOpen && (
        <div className="wallet-modal">
          <div className="wallet-modal-content">
            <span className="wallet-close" onClick={closeModal}>
              &times;
            </span>
            <h2 className="wallet-modal-title">Bank Details</h2>
            <p>Bank Name: XYZ Bank</p>
            <p>Account Number: 123456789</p>
            <p>Branch: ABC Branch</p>
            {/* Add more details here */}
          </div>
        </div>
      )}
    </div>
  );
}

function FileManager(props) {
  const [formData, setFormData] = useState({
    pickup_id: {
      title: "Select Pickup",
      value: "",
      placeholder: "Select Pickup Id",
      type: "select",
      options: [],
    },
    docType: {
      title: "File Name",
      value: "",
      placeholder: "",
      type: "input",
    },
    file: {
      title: "Upload File",
      value: [], // ["Dating"]
      placeholder: "",
      type: "file",
    },
  });
  const [formData1, setFormData1] = useState({
    shipping_id: {
      title: "Select Shipping",
      value: "",
      placeholder: "Select Shipping Id",
      type: "select",
      options: [],
    },
    docType: {
      title: "File Name",
      value: "shipping_label",
      placeholder: "",
      type: "hidden",
    },
    file: {
      title: "Upload Shipping Label",
      value: [], // ["Dating"]
      placeholder: "",
      type: "file",
    },
  });
  const [formData2, setFormData2] = useState({
    file: {
      title: "Upload Shipping Data",
      value: [], // ["Dating"]
      placeholder: "",
      type: "file",
    },
  });

  const [formDataMis, setFormDataMis] = useState({
    company_id: {
      title: "Select Company",
      value: "",
      placeholder: "Select Company Id",
      type: "select",
      options: [],
    },
    docType: {
      title: "File Name",
      value: "",
      placeholder: "",
      type: "input",
    },
    file: {
      title: "Upload File",
      value: [], // ["Dating"]
      placeholder: "",
      type: "file",
    },
  });

  const handleChange = (fieldName, value) => {
    let dataKeys = Object.keys(formData);
    if (!dataKeys.includes(fieldName)) {
      throw new Error(
        "The key You are trying to update is not available in the form data." +
          "\n" +
          "Pass The correct FieldName from the function"
      );
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  const handleChange1 = (fieldName, value) => {
    let dataKeys = Object.keys(formData1);
    if (!dataKeys.includes(fieldName)) {
      throw new Error(
        "The key You are trying to update is not available in the form data." +
          "\n" +
          "Pass The correct FieldName from the function"
      );
    }
    setFormData1((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  const handleChangeMis = (fieldName, value) => {
    let dataKeys = Object.keys(formDataMis);
    if (!dataKeys.includes(fieldName)) {
      throw new Error(
        "The key You are trying to update is not available in the form data." +
          "\n" +
          "Pass The correct FieldName from the function"
      );
    }
    setFormDataMis((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        // backgroundColor: "cyan",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "rgb(112,100,232,0.2)",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "red",
      },
    }),
  };

  const getData = () => {
    (async () => {
      await callApi({
        endpoint: "api/pickups/admin/data",
      })
        .then((res) => {
          let col = res?.columns;
          let rows = res?.data;
          const pickup_ids = rows.map((r) => {
            return r._id;
          });
          setFormData({
            ...formData,
            pickup_id: {
              ...formData.pickup_id,
              options: pickup_ids,
            },
          });
        })
        .catch((err) => {});
    })();
  };

  const getDataShipments = () => {
    (async () => {
      await callApi({
        endpoint: "api/shippings/admin/data",
      })
        .then((res) => {
          let col = res?.columns;
          let rows = res?.data;
          const pickup_ids = rows.map((r) => {
            return r._id;
          });
          setFormData1({
            ...formData1,
            shipping_id: {
              ...formData1.shipping_id,
              options: pickup_ids,
            },
          });
        })
        .catch((err) => {});
    })();
  };

  const getDataCompanies = () => {
    (async () => {
      await callApi({
        endpoint: "api/users/companies/get",
      })
        .then((res) => {
          let col = res;
          let rows = res;
          console.log("CD:", rows, res);
          const pickup_ids = rows.map((r) => {
            return r._id;
          });
          console.log("CD:", pickup_ids);
          setFormDataMis({
            ...formDataMis,
            company_id: {
              ...formDataMis.company_id,
              options: pickup_ids,
            },
          });
        })
        .catch((err) => {});
    })();
  };
  console.log("🚀 ~ formData ~ formData:", formData);
  useEffect(() => {
    getData();
    getDataShipments();
    getDataCompanies();
  }, []);

  const uploadFile = async (file) => {
    //if file is there.
    //uploader
    const fD = new FormData();
    fD.append("pickup_id", formData.pickup_id.value);
    fD.append("docType", formData.docType.value);
    fD.append("category", "pickups");
    fD.append("file", formData.file.value);
    try {
      const response = await axios.post(getBaseURL() + "/upload", fD, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      alert("File uploaded successfully!");
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      alert("Some error occurred!");
    }
  };

  const handleUploadForm = async () => {
    await uploadFile(formData);
  };

  const uploadFile1 = async (file) => {
    //if file is there.
    //uploader
    const fD = new FormData();
    fD.append("pickup_id", formData1.shipping_id.value);
    fD.append("docType", "shipping-label");
    fD.append("category", "shippings");
    fD.append("file", formData1.file.value);
    try {
      const response = await axios.post(getBaseURL() + "/upload", fD, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      alert("File uploaded successfully!");
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      alert("Some error occurred!");
    }
  };

  const handleUploadForm1 = async () => {
    await uploadFile1(formData1);
  };

  const uploadFileMis = async (file) => {
    try {
      console.log(formDataMis, "ERROR ");
      const response = await axios.post(
        getBaseURL() + "/api/mis",
        {
          company_id: formDataMis.company_id.value,
          file_name:
            formDataMis.docType.value +'.'+
            formDataMis.file.value?.name?.split(".")[
              formDataMis.file.value?.name?.split(".").length - 1
            ],
        },
        {
          headers: {
            "Content-Type": "application/JSON", // Set content type to multipart/form-data
          },
        }
      );
      alert("Data uploaded successfully!");
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      console.log(err, "ERROR");
      alert("Some error occurred!");
    }
    //uploader
    const fD = new FormData();
    fD.append("pickup_id", formDataMis.company_id.value);
    fD.append("docType", formDataMis.docType.value);
    fD.append("category", "mis");
    fD.append("file", formDataMis.file.value);
    try {
      const response = await axios.post(getBaseURL() + "/upload", fD, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      alert("File uploaded successfully!");
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      alert("Some error occurred!");
    }
  };

  const handleUploadFormMis = async () => {
    await uploadFileMis(formDataMis);
  };

  const uploadFile2 = async (file) => {
    //if file is there.
    //uploader
    const fD = new FormData();
    fD.append("file", formData2.file.value);
    try {
      const response = await axios.post(
        getBaseURL() + "/api/shippings/perform/update-records",
        fD,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      ////alert("File uploaded successfully!")
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      ////alert("Some error occurred!")
    }
  };

  const handleUploadForm2 = async () => {
    await uploadFile2(formData1);
  };

  return (
    <div className=" bg-white px-6 py-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          File Management Dashboard
        </h2>
      </div>
      <div className="mx-auto mt-4 max-w-xl sm:mt-20 border-2 p-4 rounded-xl">
        <div className="flex flex-col items-center justify-between gap-4">
          {Object.keys(formData)?.map((element) => {
            return formData[element].type === "input" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData[element]?.title}</label>
                <input
                  className="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder={formData[element]?.placeholder}
                  value={formData[element]?.value}
                  onChange={(e) => handleChange(element, e.target.value)}
                />
              </div>
            ) : formData[element].type === "select" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData[element]?.title}</label>
                {formData[element]?.options ? (
                  <Select
                    defaultValue={{
                      label: formData[element]?.value,
                      value: formData[element]?.value,
                    }}
                    styles={colourStyles}
                    options={
                      formData[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "NULL", value: "NULL" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      handleChange(element, e.value);
                    }}
                  />
                ) : (
                  <>
                    Pass the key name options which is array of string in the
                    object which mention types as select
                  </>
                )}
              </div>
            ) : formData[element].type === "date" ? (
              <>
                <label>{formData[element]?.title}</label>
                <input
                  datepicker
                  datepicker-orientation="bottom right"
                  type="date"
                  class="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Select date"
                  value={formData[element].value.split("T")[0]}
                  onChange={(e) =>
                    handleChange(element, e.target.value + "T00:00:00.000Z")
                  }
                />
              </>
            ) : formData[element].type === "multi-select" ? (
              formData[element]?.value ? (
                <div className="flex flex-col gap-2 w-full">
                  <label>{formData[element]?.title}</label>
                  <Select
                    defaultValue={formData[element]?.value?.map((el) => ({
                      label: el,
                      value: el,
                    }))}
                    isMulti
                    styles={colourStyles}
                    options={
                      formData[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "va;l", value: "va;l" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      let value = e?.map((el) => el.value);
                      handleChange(element, value);
                    }}
                  />
                </div>
              ) : (
                <>Loading Value</>
              )
            ) : formData[element].type === "file" ? (
              <div className="w-full">
                <label className="mb-4 " for="large_size">
                  Select Your File
                </label>
                <input
                  onChange={(event) => {
                    console.log("file", event.target.files[0]);
                    handleChange("file", event.target.files[0]);
                  }}
                  class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="large_size"
                  type="file"
                />
              </div>
            ) : formData[element].type === "none" ? (
              <></>
            ) : (
              <></>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={handleUploadForm}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-xl sm:mt-20 border-2 p-4 rounded-xl">
        <div className="flex flex-col items-center justify-between gap-4">
          {Object.keys(formData1)?.map((element) => {
            return formData1[element].type === "input" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData1[element]?.title}</label>
                <input
                  className="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder={formData1[element]?.placeholder}
                  value={formData1[element]?.value}
                  onChange={(e) => handleChange1(element, e.target.value)}
                />
              </div>
            ) : formData1[element].type === "select" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData1[element]?.title}</label>
                {formData1[element]?.options ? (
                  <Select
                    defaultValue={{
                      label: formData1[element]?.value,
                      value: formData1[element]?.value,
                    }}
                    styles={colourStyles}
                    options={
                      formData1[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "NULL", value: "NULL" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      handleChange1(element, e.value);
                    }}
                  />
                ) : (
                  <>
                    Pass the key name options which is array of string in the
                    object which mention types as select
                  </>
                )}
              </div>
            ) : formData1[element].type === "date" ? (
              <>
                <label>{formData1[element]?.title}</label>
                <input
                  datepicker
                  datepicker-orientation="bottom right"
                  type="date"
                  class="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Select date"
                  value={formData1[element].value.split("T")[0]}
                  onChange={(e) =>
                    handleChange1(element, e.target.value + "T00:00:00.000Z")
                  }
                />
              </>
            ) : formData1[element].type === "multi-select" ? (
              formData1[element]?.value ? (
                <div className="flex flex-col gap-2 w-full">
                  <label>{formData1[element]?.title}</label>
                  <Select
                    defaultValue={formData1[element]?.value?.map((el) => ({
                      label: el,
                      value: el,
                    }))}
                    isMulti
                    styles={colourStyles}
                    options={
                      formData1[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "va;l", value: "va;l" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      let value = e?.map((el) => el.value);
                      handleChange1(element, value);
                    }}
                  />
                </div>
              ) : (
                <>Loading Value</>
              )
            ) : formData1[element].type === "file" ? (
              <div className="w-full">
                <label className="mb-4 " for="large_size">
                  Select Your File
                </label>
                <input
                  onChange={(event) => {
                    console.log("file", event.target.files[0]);
                    handleChange1("file", event.target.files[0]);
                  }}
                  class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="large_size"
                  type="file"
                />
              </div>
            ) : formData1[element].type === "none" ? (
              <></>
            ) : (
              <></>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={handleUploadForm1}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-xl sm:mt-20 border-2 p-4 rounded-xl">
        <div className="flex flex-col items-center justify-between gap-4">
          Shipping Data update in bulk
          {Object.keys(formData2)?.map((element) => {
            return formData2[element].type === "input" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData2[element]?.title}</label>
                <input
                  className="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder={formData2[element]?.placeholder}
                  value={formData2[element]?.value}
                  onChange={(e) => handleChange1(element, e.target.value)}
                />
              </div>
            ) : formData2[element].type === "select" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formData2[element]?.title}</label>
                {formData2[element]?.options ? (
                  <Select
                    defaultValue={{
                      label: formData2[element]?.value,
                      value: formData2[element]?.value,
                    }}
                    styles={colourStyles}
                    options={
                      formData2[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "NULL", value: "NULL" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      handleChange1(element, e.value);
                    }}
                  />
                ) : (
                  <>
                    Pass the key name options which is array of string in the
                    object which mention types as select
                  </>
                )}
              </div>
            ) : formData2[element].type === "date" ? (
              <>
                <label>{formData2[element]?.title}</label>
                <input
                  datepicker
                  datepicker-orientation="bottom right"
                  type="date"
                  class="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Select date"
                  value={formData2[element].value.split("T")[0]}
                  onChange={(e) =>
                    handleChange1(element, e.target.value + "T00:00:00.000Z")
                  }
                />
              </>
            ) : formData2[element].type === "multi-select" ? (
              formData2[element]?.value ? (
                <div className="flex flex-col gap-2 w-full">
                  <label>{formData2[element]?.title}</label>
                  <Select
                    defaultValue={formData2[element]?.value?.map((el) => ({
                      label: el,
                      value: el,
                    }))}
                    isMulti
                    styles={colourStyles}
                    options={
                      formData2[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "va;l", value: "va;l" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      let value = e?.map((el) => el.value);
                      handleChange1(element, value);
                    }}
                  />
                </div>
              ) : (
                <>Loading Value</>
              )
            ) : formData2[element].type === "file" ? (
              <div className="w-full">
                <label className="mb-4 " for="large_size">
                  Select Your File
                </label>
                <input
                  onChange={(event) => {
                    console.log("file", event.target.files[0]);
                    handleChange1("file", event.target.files[0]);
                  }}
                  class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="large_size"
                  type="file"
                />
              </div>
            ) : formData2[element].type === "none" ? (
              <></>
            ) : (
              <></>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={handleUploadForm2}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-xl sm:mt-20 border-2 p-4 rounded-xl">
        <div className="flex flex-col items-center justify-between gap-4">
          MIS
          {Object.keys(formDataMis)?.map((element) => {
            return formDataMis[element].type === "input" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formDataMis[element]?.title}</label>
                <input
                  className="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder={formDataMis[element]?.placeholder}
                  value={formDataMis[element]?.value}
                  onChange={(e) => handleChangeMis(element, e.target.value)}
                />
              </div>
            ) : formDataMis[element].type === "select" ? (
              <div className="flex flex-col gap-2 w-full">
                <label>{formDataMis[element]?.title}</label>
                {formDataMis[element]?.options ? (
                  <Select
                    defaultValue={{
                      label: formDataMis[element]?.value,
                      value: formDataMis[element]?.value,
                    }}
                    styles={colourStyles}
                    options={
                      formDataMis[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "NULL", value: "NULL" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      handleChangeMis(element, e.value);
                    }}
                  />
                ) : (
                  <>
                    Pass the key name options which is array of string in the
                    object which mention types as select
                  </>
                )}
              </div>
            ) : formDataMis[element].type === "date" ? (
              <>
                <label>{formDataMis[element]?.title}</label>
                <input
                  datepicker
                  datepicker-orientation="bottom right"
                  type="date"
                  class="transition block w-full pl-4 min-h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Select date"
                  value={formDataMis[element].value.split("T")[0]}
                  onChange={(e) =>
                    handleChangeMis(element, e.target.value + "T00:00:00.000Z")
                  }
                />
              </>
            ) : formDataMis[element].type === "multi-select" ? (
              formDataMis[element]?.value ? (
                <div className="flex flex-col gap-2 w-full">
                  <label>{formDataMis[element]?.title}</label>
                  <Select
                    defaultValue={formDataMis[element]?.value?.map((el) => ({
                      label: el,
                      value: el,
                    }))}
                    isMulti
                    styles={colourStyles}
                    options={
                      formDataMis[element]?.options?.map((el) => {
                        return { label: el, value: el };
                      }) || [{ label: "va;l", value: "va;l" }]
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      let value = e?.map((el) => el.value);
                      handleChangeMis(element, value);
                    }}
                  />
                </div>
              ) : (
                <>Loading Value</>
              )
            ) : formDataMis[element].type === "file" ? (
              <div className="w-full">
                <label className="mb-4 " for="large_size">
                  Select Your File
                </label>
                <input
                  onChange={(event) => {
                    console.log("file", event.target.files[0]);
                    handleChangeMis("file", event.target.files[0]);
                  }}
                  class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="large_size"
                  type="file"
                />
              </div>
            ) : formDataMis[element].type === "none" ? (
              <></>
            ) : (
              <></>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={handleUploadFormMis}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default stateConnected(FileManager);
