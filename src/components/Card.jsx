const Card = ({ title, children, size }) => {

  const className = "grid grid-cols-1 grid-rows-1 h-screen mx-auto text-center mt-24 m-8 w-" + size

  return (

    !size ? (

      <div className="grid grid-cols-1 grid-rows-1 h-screen mx-auto text-center mt-24 m-8 w-2/6">

        <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-6 my-auto">

          <div className="font-bold text-xl mb-4">{title}</div>

          <div className="space-y-4">
            {children}
          </div>

        </div>

      </div>

    ) : (

      <div className={className}>

        <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-6 my-auto">

          <div className="font-bold text-xl mb-4">{title}</div>

          <div className="space-y-4">
            {children}
          </div>

        </div>

      </div>

    )


  );

};

export default Card;