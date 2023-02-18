export interface ActionContextInterface {
  isLogin: boolean;
  handleRegister: (user: newUser) => {};
  currentUser: string;

  handleLogin: (email: string, password: string) => {};
  handleLogout: () => void;
  checkIfIsLogin: () => void;

  allProduct: ProductInterface[];
  getAllProduct: () => {};
  addNewProduct: (newProduct: newProductInterface) => {};

  currentIndex: number;
  handleCurrentIndex: (index: number) => void;

  handleIsAdjust: () => void;
  updateQuantity: (updateData: editQuantity) => {};
  isAdjust: boolean;
}

export interface ActionProviderInterface {
  children: JSX.Element;
}

export interface ProductInterface {
  productId: string;
  productName: string;
  productDescription: string;
  productQuantity: number;
  mfd: string;
  exd: string;
  productAddDate: string;
}

export interface newProductInterface {
  productName: string;
  productQuantity: number;
  productDescription: string | null;
  mfd: Date | null;
  exd: Date | null;
}

export interface newUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface editQuantity {
  productId: string;
  quantity: number;
  transectionType: string;
}
