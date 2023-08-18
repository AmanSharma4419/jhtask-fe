import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../src/redux/actions/blogsActions";
import { FiLoader } from "react-icons/fi";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogsReducer);
  const { allBlogs, loading } = blogState;
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleSearch = (searchValue) => {
    const filtered = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };
  const navigate = useNavigate();
  const handleWriteBlogClick = () => {
    navigate("/write-blog");
  };

  const getRandomPositiveInteger = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  useEffect(() => {
    dispatch(getAllBlogs()).then(() => {
      setDataFetched(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (dataFetched) {
      setFilteredBlogs(allBlogs);
    }
  }, [dataFetched, allBlogs]);
  return (
    <>
      <Header
        handleWriteBlog={handleWriteBlogClick}
        handleSearch={handleSearch}
      />
      <div className="m-16 flex flex-col justify-evenly p-5 ">
        {loading ? (
          <p className="text-center">
            <FiLoader className="w-10 h-10 ml-[50%] mt-[15%]" />
          </p>
        ) : (
          filteredBlogs.map((blog, index) => {
            return (
              <div className="m-16 flex justify-evenly border-b-2 p-5 ">
                <div>
                  <div className="flex ">
                    <AiOutlineUser className="h-10 w-10 rounded-full  border drop-shadow-2xl" />
                    <div className="flex flex-col">
                      <span className="capitalize font-light font-sans">
                        Hey User!
                      </span>
                      <span className="opacity-40 font-thin">
                        {new Date().toLocaleString()} •{" "}
                        {getRandomPositiveInteger(10)} mins read
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold mt-1  font-sans text-3xl">
                      {blog.title}
                    </h2>
                    <p className="font-extralight mt-2 text-lg w-[550px]">
                      {blog.text}
                    </p>
                  </div>

                  <img
                    src="../../Group 55.png"
                    className="h-10 w-8 rounded-lg"
                    alt=""
                  />
                  <span className="opacity-30 ml-2 font-light">
                    {" "}
                    {getRandomPositiveInteger(20)}
                  </span>
                </div>
                <div>
                  <img
                    src={`http://localhost:7000/${blog.blogImage}`}
                    className="w-[250px] h-[150px] rounded-lg"
                    alt=""
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Blogs;
