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

  toggleIsAdjust: () => void;
  updateQuantity: (updateData: editQuantity) => {};
  isAdjust: boolean;

  toggleIsEdit: () => void;
  isEdit: boolean;
  editProduct: (editedProduct: editProductInterface) => {};

  removeProduct: () => {};
}

export interface ActionProviderInterface {
  children: JSX.Element;
}

export interface ProductInterface {
  productId: string;
  productName: string;
  productDescription: string | null;
  productQuantity: number;
  mfd: string | null;
  exd: string | null;
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

export interface editProductInterface {
  productId: string;
  productName: string;
  productDescription: string | null;
  mfd: Date | null;
  exd: Date | null;
}
