"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Category from "@/components/Category";
import ExpandIcon from "@mui/icons-material/Expand";
import { setOriginalData, setProductsData } from "@/redux/productSlice";
import { UseSelector, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const originalData = useSelector((state) => state.products.originalData);
  const productsData = useSelector((state) => state.products.productsData);

  const [sorted, setSorted] = useState(false);
  const [category, setCategory] = useState({
    mains: false,
    appetizer: false,
    dessert: false,
    clone: false,
    weird: false,
  });

const getData = async() => {
  const res = await axios.get(
    "https://pink-dragonfly-toga.cyclic.app/get-data"
  );
  const aggregateByCategory = res.data.reduce((group, product) => {
    const { category } = product;
    group[category] = group[category] ?? [];
    group[category].push(product);
    return group;
  }, {});
  console.log(aggregateByCategory);
  dispatch(setOriginalData({ ...aggregateByCategory }));
  dispatch(setProductsData({ ...aggregateByCategory }));

}

  useEffect(() => {
    console.log("outside")
    if (originalData === null) {
    console.log("inside");

      getData();
    }
  }, [originalData, productsData]);


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
                <div onClick={() => handleExpand("mains")} className="w-full text-white p-1 cursor-pointer  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    
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
                <div  onClick={() => handleExpand("appetizer")} className="w-full text-white p-1 cursor-pointer  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                   
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
                <div  onClick={() => handleExpand("dessert")} className="w-full text-white p-1 cursor-pointer bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                   
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
                <div  onClick={() => handleExpand("clone")} className="w-full text-white p-1 cursor-pointer bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                   
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
                <div onClick={() => handleExpand("weird")} className="w-full text-white p-1 cursor-pointer  bg-blue-800">
                  <ExpandIcon
                    className="cursor-pointer"
                    
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