export interface Banner {
  image: any;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
}
export interface ProductProps {
  details: string;
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  slug: { current: string; _type: string };
}
export interface HomeProps {
  products: ProductProps[];
  bannerData: Banner[];
}

export interface ContextValues {
  showCart: boolean;
  cartItems: ProductProps[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductProps, quantity: number) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>; // Include setShowCart function
  toggleCartItemQuantity: (id: number, value: string) => void; // Include toggleCartItemQuantity function
  onRemove: (id: number, product: ProductProps) => void; // Include toggleCartItemQuantity function
  setCartItems: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

export interface HeroBannerProps {
  smallText: string;
  midText: string;
  largeText1: string;
  image: any;
  product: string;
  buttonText: string;
  desc: string;
}

export interface FooterBannerProps {
  discount: string;
  largeText1: string;
  largeText2: string;
  saleTime: string;
  smallText: string;
  midText: string;
  product: string;
  buttonText: string;
  image: any;
  desc: string;
}
