import { useState, useEffect } from "react";

const Card = ({ title, apiUrl }) => {

  const [data, setData] = useState();
  
  const getData = async () => {
    try{
      const res = await axios.get(apiUrl)
      setData(res.data)
    }catch (error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="flex items-center justify-center h-screen mt-2">
      <div className="max-w-sm rounded overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>

          <div className="space-y-4">
            {Object.entries(data).map(([key, value], colIndex) => key !== 'id' && (
              <div key={colIndex}>
                <span className="text-sm text-gray-500 uppercase">{key}</span>
                <span className="block text-lg font-medium">{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
