import { useState, useRef, useEffect } from "react";
function App() {
  const [countryDate, setCountryDate] = useState([
    {
      city: "NEW YORK",
      timeZone: "America/New_York",
    },
    {
      city: "LONDON",
      timeZone: "Europe/London",
    },
    {
      city: "BANGKOK",
      timeZone: "Asia/Bangkok",
    },
    {
      city: "TAIWAN",
      timeZone: "Asia/Taipei",
    },
    {
      city: "SYDNEY",
      timeZone: "Australia/Sydney",
    },
  ]);
  const newCountryList = useRef([]);
  const getDate = (data) => {
    const list = [];
    // options: 設定時區參數的物件，要有 timeZone 這個參數，才能顯示其他國家的日期和時間!
    Object.values(data).forEach((item) => {
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: item.timeZone,
      };
      let date = new Date().toLocaleString("en-us", options).split(", ");
      const newCountryDate = {};
      newCountryDate.city = item.city;
      newCountryDate.timeZone = item.timeZone;
      newCountryDate.date = `${date[0].substring(4, 6)} ${date[0].substring(
        0,
        3
      )}. ${date[1].substring(0, 4)}`;
      newCountryDate.time = date[2];
      list.push(newCountryDate);
      newCountryList.current = list;
    });
  };
  const timeId = useRef(null);

  useEffect(() => {
    getDate(countryDate);
    timeId.current = setInterval(() => {
      setCountryDate(newCountryList.current);
    }, 1000);
    return () => {
      clearInterval(timeId.current);
      timeId.current = null;
    };
  }, [countryDate]);
  return (
    <>
      <div className="container">
        <h1>WORLD CLOCK</h1>
        {Object.keys(countryDate[0]).includes('date') ? (
          <ul className="card">
            {countryDate.map((item) => (
              <li key={item.city}>
                <div>
                  <h2>{item.city}</h2>
                  <p>{item.date}</p>
                </div>
                <div className="time">{item.time}</div>
              </li>
            ))}
          </ul>
        ) : <h3>載入中...請稍等</h3>}
      </div>
    </>
  );
}

export default App;
