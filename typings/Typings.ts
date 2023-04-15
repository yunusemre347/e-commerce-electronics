interface Banner {
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
  
  interface Product {
    image: any;
    name: string;
    slug: string;
    price: number;
    details: string;
  }
  
  interface HomeProps {
    products: Product[];
    bannerData: Banner[];
  }

  interface ContextValues {
    showCart: any;
    cartItems: any;
    totalPrice: number;
    totalQuantities: any;
    qty: number;
    incQty: any;
    decQty: any;
  }