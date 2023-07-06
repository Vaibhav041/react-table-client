"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Category from "@/components/Category";
import ExpandIcon from "@mui/icons-material/Expand";
import { setOriginalData, setProductsData } from "@/redux/productSlice";
import { UseSelector, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home({ data }) {
  const dispatch = useDispatch();
  const originalData = useSelector((state) => state.products.originalData);
  const [sorted, setSorted] = useState(false);
  const [category, setCategory] = useState({
    mains: false,
    appetizer: false,
    dessert: false,
    clone: false,
    weird: false,
  });

  useEffect(() => {
    if (!originalData) {
      dispatch(setOriginalData({ ...data }));
      dispatch(setProductsData({ ...data }));
    }
  }, [data]);

  const productsData = useSelector((state) => state.products.productsData);

  const handleExpand = (productCat) => {
    if (!category[productCat]) {
      setCategory({ ...category, [productCat]: true });
    } else {
      setCategory({ ...category, [productCat]: false });
    }
  };

  const getTrueValue = (identifier, productCat) => {
    const temp = originalData[productCat].find(
      (product) => product.id === identifier
    );
    if (!temp) return;
    return temp.price;
  };

  return (
    <div
      style={{ height: "100%", minHeight: "100vh" }}
      className=" w-full flex justify-center p-10 bg-blue-300"
    >
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>label</th>
              <th>
                {" "}
                <span
                  className="mr-1 cursor-pointer"
                  onClick={() => setSorted(!sorted)}
                >
                  <FilterListIcon
                    style={{
                      color: sorted ? "blue" : "black",
                      fontSize: "30px",
                    }}
                  />
                </span>
                price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 0 }} colSpan={4}>
                <div className="w-full text-white p-1  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    onClick={() => handleExpand("mains")}
                  />{" "}
                  Mains
                </div>
              </td>
            </tr>
            {category.mains && (
              <Category
                data={productsData && productsData["mains"]}
                doSort={sorted}
                getTrueValue={getTrueValue}
              />
            )}
            <tr>
              <td style={{ padding: 0 }} colSpan={4}>
                <div className="w-full text-white p-1  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    onClick={() => handleExpand("appetizer")}
                  />{" "}
                  Appetizer
                </div>
              </td>
            </tr>
            {category.appetizer && (
              <Category
                getTrueValue={getTrueValue}
                data={productsData && productsData["appetizer"]}
                doSort={sorted}
              />
            )}
            <tr>
              <td style={{ padding: 0 }} colSpan={4}>
                <div className="w-full text-white p-1  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    onClick={() => handleExpand("dessert")}
                  />{" "}
                  Dessert
                </div>
              </td>
            </tr>
            {category.dessert && (
              <Category
                getTrueValue={getTrueValue}
                data={productsData && productsData["dessert"]}
                doSort={sorted}
              />
            )}
            <tr>
              <td style={{ padding: 0 }} colSpan={4}>
                <div className="w-full text-white p-1  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    onClick={() => handleExpand("clone")}
                  />{" "}
                  Clone
                </div>
              </td>
            </tr>
            {category.clone && (
              <Category
                getTrueValue={getTrueValue}
                data={productsData && productsData["clone"]}
                doSort={sorted}
              />
            )}
            <tr>
              <td style={{ padding: 0 }} colSpan={4}>
                <div className="w-full text-white p-1  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    onClick={() => handleExpand("weird")}
                  />{" "}
                  Weird
                </div>
              </td>
            </tr>
            {category.weird && (
              <Category
                getTrueValue={getTrueValue}
                data={productsData && productsData["weird"]}
                doSort={sorted}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(
    "https://pink-dragonfly-toga.cyclic.app/get-data"
  );
  const aggregateByCategory = res.data.reduce((group, product) => {
    const { category } = product;
    group[category] = group[category] ?? [];
    group[category].push(product);
    return group;
  }, {});
  return {
    props: {
      data: aggregateByCategory,
    },
  };
};
