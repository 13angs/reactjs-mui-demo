import * as React from 'react';

export default function ListSetting()
{
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/v2/settings/products?query=type&type=wholesale&name=bars&limit=5&sort=asc&psid=1fb4a3da-d499-4319-8f7a-ad10c2567bdd');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [])
  return (
    <div>
      <h1>
        From setting page
      </h1>
      {
        data.length > 0 && data.map(item => (
          <p key={item?.id}>{item?.setting_name}</p>
        ))
      }
    </div>
  )
}