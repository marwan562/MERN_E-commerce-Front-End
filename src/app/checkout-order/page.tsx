"use client";
import OrderItems from "@/components/OrderItems";
import { CardsPaymentMethod } from "@/components/PaymentCard";
import { useAppSelector } from "@/lib/store";

const CheckoutOrdersPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className={cartItems ? "h-[50vw]" : "h-screen"}>
      <main className="container mx-auto p-4 flex flex-col lg:flex-row mt-20  ">
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map(({ _id, productId, quantity }) => (
              <OrderItems key={_id} {...productId} quantity={quantity} />
            ))
          ) : (
            <div> Yout don't have any proudct in Cart.</div>
          )}
        </section>

        <section className="lg:w-1/3 bg-white p-4 rounded-lg shadow-md ml-0 lg:ml-4 mt-4 lg:mt-0   h-fit">
          <CardsPaymentMethod />
        </section>
      </main>
    </div>
  );
};

export default CheckoutOrdersPage;
