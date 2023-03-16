export default function CartModal(props) {
    
  const { cart, getTotalAmount ,handleProceed} = props;

  
  return (
    <div
      id="modal"
      className="invisible w-full h-full grid place-items-center bg-transparent absolute top-0"
    >
      <div className="w-1/2 relative border-2 border-blue-800 bg-white">
        <h1>YOUR BAG</h1>
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-around items-center my-4"
          >
            <p className="basis-1/2">{product.item}</p>
            <img
              className="w-10"
              src={product.url}
              alt=""
            />
            <p>{product.toBuy}</p>
          </div>
        ))}
        <div className="flex justify-between">
          <p>Total : ${getTotalAmount()}</p>
          <button onClick={handlePurchase} className="bg-green-500 p-2">
            Contact Seller
          </button>
        </div>
        <button onClick={handleProceed} className="absolute top-0 right-0">
          Close
        </button>
      </div>
    </div>
  );

  function handlePurchase() {
    console.log("ogog");
  }
}
