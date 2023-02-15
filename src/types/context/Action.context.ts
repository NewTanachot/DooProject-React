export interface ActionContextInterface {
  isLogin: boolean;
  handleRegister: (user: newUser) => {};
  handleLogin: (email: string, password: string) => {};
  allProduct: ProductInterface[];
  getAllProduct: () => {};
  currentIndex: number | null;
  handleCurrentIndex: (index: number) => void;
  addAmount: (amount: number) => {};
  reduceAmount: (amount: number) => {};
  handleIsAdjust: () => void;
  isAdjust: boolean;
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

export interface newProductInterface {
  productName: string;
  productQuantity: number;
  productDescription: string;
  mfd: string;
  exd: string;
}

export interface newUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
