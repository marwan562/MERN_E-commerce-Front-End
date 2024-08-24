"use client";
import OrderItems from "@/components/OrderItems";
import CardsPaymentMethod from "@/components/PaymentCard";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/store";

const CheckoutOrdersPage = () => {
  const DISCOUNT = 50;
  const { cartItems, status } = useAppSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((act, item) => {
    const total = (item?.quantity ?? 0) * item.productId.price;
    return act + total;
  }, 0);

  return (
    <div className={cartItems ? "h-fit" : "h-screen"}>
      <main className="container mx-auto p-4 flex flex-col lg:flex-row mt-20  ">
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cartItems.length > 0 ? (
            cartItems.map(({ _id, productId, quantity }) => (
              <OrderItems key={_id} {...productId} quantity={quantity} />
            ))
          ) : (
            <div> Yout don{"'"}t have any proudct in Cart.</div>
          )}
          <div className="flex flex-row justify-between items-center">
            <ul className=" space-y-1">
              <li className="text-slate-500">Suptotal</li>
              <li className="text-slate-500">Discount</li>
              <li className=" font-semibold mt-1 text-2xl">Total</li>
            </ul>
            <ul className=" space-y-1">
              <li className="text-slate-500"> ${totalPrice}</li>
              <li className="text-slate-500">-${DISCOUNT}</li>
              <li className="mt-1">
                <Badge className=" text-lg">${totalPrice - DISCOUNT}</Badge>
              </li>
            </ul>
          </div>
        </section>

        <section className="lg:w-2/4 bg-white p-4 rounded-lg shadow-md ml-0 lg:ml-4 mt-4 lg:mt-0   h-fit">
          <CardsPaymentMethod />
        </section>
      </main>
    </div>
  );
};

export default CheckoutOrdersPage;
