

function CartItem(props) {
  const {product, children} = props
  return (
    <div>
      <div className="flex my-8 space-x-4">
        <img className="w-20" src={product.url}></img>
        <div>
          <h1>{product.item}</h1>
          <p>${product.price}</p>
          {children}
          
        </div>
      </div>
    </div>
  );
}

export { CartItem };
