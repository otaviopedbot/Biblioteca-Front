const Card = ({ title, children }) => {

  return (
    <div className="flex items-center justify-center h-screen m-4">
      <div className="max-w-sm rounded overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{title}</div>

          <div className="space-y-4">

            {children}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;