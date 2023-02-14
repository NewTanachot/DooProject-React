export interface ActionContextInterface {
  isLogin: boolean;
  handleLogin: (email: string, password: string) => {};
  allProduct: ProductInterface[];
  getAllProduct: () => {};
}

export interface ActionProviderInterface {
  children: JSX.Element;
}

export interface ProductInterface {
  productId: string;
  productName: string;
  productDescription: string;
  productAmount: number;
  mfd: string;
  exd: string;
  productAddDate: string;
}
