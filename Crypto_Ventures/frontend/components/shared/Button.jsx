export const BtnPrimary = ({
  children,
  onClick = () => console.log("A button was clicked. "),
}) => {
  return (
    <button
      onClick={onClick}
      className="px-28 py-2  text-white bg-blue-600 rounded-lg shadow-sm  w-full"
    >
      {children}
    </button>
  );
};

export const BtnGreen = ({
  children,
  onClick = () => console.log("A button was clicked. "),
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-block px-6 py-2.5 
      bg-green-600 text-white font-medium
       text-xs leading-tight uppercase rounded
        shadow-md hover:bg-green-700 hover:shadow-lg  active:bg-green-800 
        active:shadow-lg transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};
