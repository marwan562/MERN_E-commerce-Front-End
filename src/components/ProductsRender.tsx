import { IProductsTypes } from "@/interface";
import ProductList from "./ProductsList";

type TProps = {
  data: IProductsTypes[]
};

const ProductsRender = ({ data }: TProps) => {
  return data.map((el) => <ProductList key={el.id} {...el} />);
};

export default ProductsRender;
