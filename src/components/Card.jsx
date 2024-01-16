const Card = ({ title, data }) => {


  return (
    <div className="flex items-center justify-center h-screen mt-2">
      <div className="max-w-sm rounded overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>

          <div className="space-y-4">
            <p>
              aaaaaaaaaaa
              {/* {data.name} */}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
