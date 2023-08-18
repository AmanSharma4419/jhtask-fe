import React, { useState } from "react";
import { writeBlog } from "../../src/redux/actions/blogsActions";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogsReducer);
  const { loading, newlyAddedBlog } = blogState;
  const navigate = useNavigate();

  const handleBackIconClick = () => {
    if (step === 0) {
      window.history.back();
    } else {
      setStep(step - 1);
    }
  };

  const handleToggleBtnClick = () => {
    if (step === 0) {
      setStep(1);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleOptionSelect = (option) => {
    if (option === "image" && !fields.includes("image")) {
      setFields([...fields, "image"]);
      setStep(0);
    } else if (option === "text" && !fields.includes("text")) {
      setFields([...fields, "text"]);
      setStep(0);
    } else if (option === "subTitle" && !fields.includes("subTitle")) {
      setFields([...fields, "subTitle"]);
      setStep(0);
    }
  };
  const handleBlogSaveClick = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", textInput);
    formData.append("subTitle", subTitle);
    formData.append("blogImg", selectedFile);
    if (!title) {
      alert("Title is mandatory");
    } else {
      dispatch(writeBlog(formData));
      console.log(newlyAddedBlog, "hhh");
      if (newlyAddedBlog) {
        navigate("/");
      }
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">
          <FiLoader className="w-10 h-10 ml-[50%] mt-[20%]" />
        </p>
      ) : (
        <div className="m-16">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <img
                onClick={handleBackIconClick}
                src="../../back.png"
                className="w-10 h-10 cursor-pointer"
                alt=""
              />
              <img
                src="../../icons8-blog-64 2.png"
                className="w-10 h-10"
                alt=""
              />
              <img src="../../Draft.png" className="w-22 h-6" alt="" />
            </div>
            <div>
              <img
                onClick={() => {
                  handleBlogSaveClick();
                }}
                src="../../Group 7486.png"
                className="w-22 h-8 cursor-pointer"
                alt=""
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="min-w-[80%] mt-10 ml-32 h-20 border-2 rounded-2xl px-4 pr-2"
            />
          </div>

          {fields.includes("image") && (
            <div className="mt-4 ml-32">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {selectedFile ? (
                  <div>Selected Image: {selectedFile.name}</div>
                ) : (
                  <div>Select an image file</div>
                )}
              </label>
            </div>
          )}

          {fields.includes("text") && (
            <div className="mt-4 ml-32">
              <input
                type="text"
                placeholder="Text"
                className="mt-2 p-10 pr-6 py-24 min-w-[89%] border-2 rounded-2xl"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          )}

          {fields.includes("subTitle") && (
            <div className="mt-4 ml-32">
              <input
                type="text"
                placeholder="Sub title"
                className="mt-2 pr-6 p-10 min-w-[89%] text-start border-2 rounded-2xl"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </div>
          )}

          {step === 0 && (
            <div className="flex mt-10 ml-32 justify-between max-w-[300px]">
              <img src="../../plus.png" alt="" onClick={handleToggleBtnClick} />
            </div>
          )}

          {step === 1 && (
            <div className="flex space-x-2 mt-10 ml-32">
              <img src="../../cross.png" onClick={() => setStep(0)} alt="" />
              <img
                src="../../img.png"
                alt=""
                onClick={() => handleOptionSelect("image")}
              />
              <img
                src="../../text.png"
                alt=""
                onClick={() => handleOptionSelect("text")}
              />
              <span
                onClick={() => handleOptionSelect("subTitle")}
                className="border cursor-pointer border-gray-800 rounded-full w-8 flex items-center justify-center text-center text-black font-bold text-xl"
              >
                s
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WriteBlog;
