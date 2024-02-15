const Card = ({ title, children }) => {

  return (

    <div className="flex items-center justify-center h-screen m-24">
      <div className="w-2/6 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white my-8">
        <div className="p-6 text-center">
          <div className="font-bold text-xl mb-4">{title}</div>

          <div className="space-y-4">
            {children}
          </div>

        </div>
      </div>
    </div>
    
  );

};

export default Card;