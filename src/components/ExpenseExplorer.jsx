import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Heading from './Heading';



const ExpenseExplorer = () => {
  const [ItemName, setItemName] = useState("");
  const [ItemCost, setItemCost] = useState("");
  const [ItemMonth, setItemMonth] = useState("");
  const [ItemYear, setItemYear] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [Expense, setExpense] = useState([]);
  const [Stuff, setStuff] = useState([]);
  const [Mesc, setMesc] = useState([]);
  const [Travel, setTravel] = useState([]);
  const [FilterMonth, setFilterMonth] = useState("");
  const [FilterYear, setFilterYear] = useState("");
  const IP="13.204.17.177:8080";



  const handleSubmit = async () => {
    if (ItemCategory.toLowerCase() === 'food') {
      const response = await fetch(
        `https://${IP}/addFood/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Food item added successfully!");
      } else {
        console.error("❌ Failed to add item.");
      }
    } else if (ItemCategory.toLowerCase() === 'mesc') {
      const response = await fetch(
        `https://${IP}/addMesc/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Food item added successfully!");
      } else {
        console.error("❌ Failed to add item.");
      }
    } else if (ItemCategory.toLowerCase() === 'stuff') {
      const response = await fetch(
        `https://${IP}/addStuff/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Food item added successfully!");
      } else {
        console.error("❌ Failed to add item.");
      }
    } else if (ItemCategory.toLowerCase() === 'travel') {
      const response = await fetch(
        `https://${IP}/addTravel/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Food item added successfully!");
      } else {
        console.error("❌ Failed to add item.");
      }
    }

    setItemCategory("");
    setItemCost("");
    setItemMonth("");
    setItemName("");
    setItemYear("");
  };

  const handleFetchFood = async () => {
    const response = await fetch(`https://${IP}/getFoodByYear/${FilterMonth}/${FilterYear}`);
    // const response = await fetch(`http://localhost:8080/getFoodByYear/${FilterMonth}/${FilterYear}`);
    const data = await response.json();
    console.log(data)
    setExpense(data);
  };

  const handleFetchStuff = async () => {
    const response = await fetch(`https://${IP}/getStuffByYear/${FilterMonth}/${FilterYear}`);
    // const response = await fetch(`http://localhost:8080/getStuffByYear/${FilterMonth}/${FilterYear}`);
    const data = await response.json();
    setStuff(data);
  };

  const handleFetchMesc = async () => {
    const response = await fetch(`https://${IP}/getMescByYear/${FilterMonth}/${FilterYear}`);
    // const response = await fetch(`http://localhost:8080/getMescByYear/${FilterMonth}/${FilterYear}`);
    const data = await response.json();
    setMesc(data);
  };

  const handleFetchTravel = async () => {
    const response = await fetch(`https://${IP}/getTravelByYear/${FilterMonth}/${FilterYear}`);
    // const response = await fetch(`http://localhost:8080/getTravelByYear/${FilterMonth}/${FilterYear}`);
    const data = await response.json();
    setTravel(data);
  };


  const handleDelete = async (item, id) => {
    const response = await fetch(`https://${IP}/deleteItem/${item}/${id}`, {
    // const response = await fetch(`http://localhost:8080/deleteItem/${item}/${id}`, {
      method: 'DELETE',
    });

  }

  const handleUpdate = (id, itemCost, itemName, category, month, year) => {
    setItemName(itemName);
    setItemCategory(category);
    setItemMonth(month);
    setItemYear(year);
    setItemCost(itemCost);

    handleDelete(category, id);
  }


  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleFetchFood();
    handleFetchStuff();
    handleFetchMesc();
    handleFetchTravel();
  }, [refresh, ItemName, ItemCost, ItemMonth, ItemYear, ItemCategory]);

  useEffect(() => {
    if (FilterMonth && FilterYear) {
      handleFetchFood();
      handleFetchStuff();
      handleFetchMesc();
      handleFetchTravel();
    }
  }, [FilterMonth, FilterYear]);



  console.log(Travel);


  const handleName = (e) => {
    setItemName(e.target.value);
  }

  const handleCost = (e) => {
    setItemCost(e.target.value);
  }

  const handleYear = (e) => {
    setItemYear(e.target.value);
  }

  const handleMonth = (e) => {
    setItemMonth(e.target.value);
  }

  const handleCategory = (e) => {
    setItemCategory(e.target.value);
  }




  return (

    <div>
      <Heading />
      <div className='flex gap-4 items-center justify-center bg-[#74964E]  min-h-screen  flex-wrap'>
        {/* Add data */}
        <div className='dataAddContainer text-black border-2 border-[#A72703] p-5 w-min-[300px] m-3 bg-[#FCB53B] flex gap-3 rounded-xl flex-col m-6'>

          <label htmlFor="ItemName" className='text-[#A72703] font-bold'>Item Name</label>
          <input type="text" value={ItemName} name="ItemName" className='border-[#A72703] border-1 rounded-xl px-2' onChange={handleName} />
          <label htmlFor="ItemCost" className='text-[#A72703] font-bold'>Item Cost</label>
          <input type="text" value={ItemCost} name="ItemCost" className='border-[#A72703] border-1 rounded-xl px-2' onChange={handleCost} />


          <select value={ItemCategory} name='Category' className='border-[#A72703] border-1 rounded-xl px-1 text-[#A72703] font-semibold  ' onChange={handleCategory}>
            <option value="">--Choose Category--</option>

            <option value="Food">Food</option>
            <option value="Stuff">Stuff</option>
            <option value="Mesc">Mesc</option>
            <option value="Travel">Travel</option>

          </select>


          <select name='Month' value={ItemMonth} className='border-[#A72703] border-1 rounded-xl px-1 text-[#A72703] font-semibold ' onChange={handleMonth}>
            <option value="">--Choose Month--</option>

            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>


          <select value={ItemYear} name="Year" className='border-[#A72703] border-1 rounded-xl px-1 text-[#A72703] font-semibold ' onChange={handleYear}>
            <option value="">--Choose Year--</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>


          <button onClick={handleSubmit} className='border-1 border-[#A72703] px-4 rounded-xl text-red-700 font-bold cursor-pointer'>Add</button>




          {/* Data Rows
      {data.map((food) => (
        <div key={food.id} className="flex gap-10 py-1 border-b border-gray-300">
        <div>{food.id}</div>
        <div>{food.itemName}</div>
        <div>₹{food.itemCost}</div>
        <div>{food.month?.month}</div>
        <div>{food.month?.yearId}</div>
        </div>
        ))} */}


        </div>
        {/* Display Data */}
        <div className='DataDisplayContainer flex flex-col rounded-2xl border-2 border-[#A72703] p-3 h-[400px] overflow-y-scroll mb-4 overflow-x-auto scrollbar-[1px] scrollbar-thumb-[#A72703] scrollbar-track-[#A72703]'>
          <div className='filter flex gap-6 flex-wrap'>

            <select name='Month' value={FilterMonth} className='border-[#A72703] border-2 px-1 text-black font-semibold ' onChange={(e) => { setFilterMonth(e.target.value); }}>
              <option value="">Month</option>

              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>


            <select value={FilterYear} name="Year" className='border-[#A72703] border-2 px-1 text-black font-semibold ' onChange={(e) => { setFilterYear(e.target.value); }}>
              <option value="">Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>

          </div>

          {/* food */}
          <div className='food border-2 border-black w-2xl my-5 bg-amber-300 flex-col justify-center items-center flex-wrap'>
            <div className="grid grid-cols-1 text-center border-b py-2 items-start bg-amber-200 font-bold text-2xl">
              <div>Food</div>

            </div>
            <div className="grid grid-cols-4 gap-4 text-center border-b py-2 items-start bg-amber-200">
              <div>ID</div>
              <div>Name</div>
              <div>Cost</div>
            </div>
            {

              Expense.map((item) => (
                <div key={item.food_id} className='grid grid-cols-4 gap-4 text-center border-b py-2'>

                  <div >{item.food_id}</div>
                  <div >{item.itemName}</div>
                  <div >{item.itemCost}</div>
                  <div className='flex gap-4'>
                    <button className='cursor-pointer w-fit' onClick={() => handleDelete("food", item.food_id)}><img src="/delete.png" alt="" width={20} /></button>
                    <button className='cursor-pointer w-fit' onClick={() => handleUpdate(item.food_id, item.itemCost, item.itemName, "food", item.month?.month, item.month?.yearId)}><img src="/edit.png" alt="" width={20} /></button>

                  </div>
                </div>
                //  <div>item.food_id</div>
              ))
            }


          </div>
          {/* stuff */}
          <div className='food border-2 border-black w-2xl my-5 bg-amber-300 flex-col justify-center items-center'>
            <div className="grid grid-cols-1 text-center border-b py-2 items-start bg-amber-200 font-bold text-2xl">
              <div>Stuff</div>

            </div>
            <div className="grid grid-cols-4 gap-4 text-center border-b py-2 items-start bg-amber-200">
              <div>ID</div>
              <div>Name</div>
              <div>Cost</div>
            </div>
            {

              Stuff.map((item) => (
                <div key={item.stuff_id} className='grid grid-cols-4 gap-4 text-center border-b py-2'>

                  <div >{item.stuff_id}</div>
                  <div >{item.itemName}</div>
                  <div >{item.itemCost}</div>
                  <div className='flex gap-4'>
                    <button className='cursor-pointer w-fit' onClick={() => handleDelete("stuff", item.stuff_id)}><img src="/delete.png" alt="" width={20} /></button>
                    <button className='cursor-pointer w-fit' onClick={() => handleUpdate(item.stuff_id, item.itemCost, item.itemName, "stuff", item.month?.month, item.month?.yearId)}><img src="/edit.png" alt="" width={20} /></button>

                  </div>
                </div>
                //  <div>item.food_id</div>
              ))
            }


          </div>
          {/* mesc */}
          <div className='food border-2 border-black w-2xl my-5 bg-amber-300 flex-col justify-center items-center'>
            <div className="grid grid-cols-1 text-center border-b py-2 items-start bg-amber-200 font-bold text-2xl">
              <div>Mesc</div>

            </div>
            <div className="grid grid-cols-4 gap-4 text-center border-b py-2 items-start bg-amber-200">
              <div>ID</div>
              <div>Name</div>
              <div>Cost</div>
            </div>
            {

              Mesc.map((item) => (
                <div key={item.mesc_id} className='grid grid-cols-4 gap-4 text-center border-b py-2'>

                  <div >{item.mesc_id}</div>
                  <div >{item.itemName}</div>
                  <div >{item.itemCost}</div>
                  <div className='flex gap-4'>
                    <button className='cursor-pointer w-fit' onClick={() => handleDelete("mesc", item.mesc_id)}><img src="/delete.png" alt="" width={20} /></button>
                    <button className='cursor-pointer w-fit' onClick={() => handleUpdate(item.mesc_id, item.itemCost, item.itemName, "mesc", item.month?.month, item.month?.yearId)}><img src="/edit.png" alt="" width={20} /></button>

                  </div>
                </div>
                //  <div>item.food_id</div>
              ))
            }


          </div>
          {/* Travel */}
          <div className='food border-2 border-black w-2xl my-5 bg-amber-300 flex-col justify-center items-center'>
            <div className="grid grid-cols-1 text-center border-b py-2 items-start bg-amber-200 font-bold text-2xl">
              <div>Travel</div>

            </div>
            <div className="grid grid-cols-4 gap-4 text-center border-b py-2 items-start bg-amber-200">
              <div>ID</div>
              <div>Name</div>
              <div>Cost</div>
            </div>
            {

              Travel.map((item) => (
                <div key={item.travel_id} className='grid grid-cols-4 gap-4 text-center border-b py-2'>

                  <div >{item.travel_id}</div>
                  <div >{item.itemName}</div>
                  <div >{item.itemCost}</div>
                  <div className='flex gap-4'>
                    <button className='cursor-pointer w-fit' onClick={() => handleDelete("travel", item.travel_id)}><img src="/delete.png" alt="" width={20} /></button>
                    <button className='cursor-pointer w-fit' onClick={() => handleUpdate(item.travel_id, item.itemCost, item.itemName, "travel", item.month?.month, item.month?.yearId)}><img src="/edit.png" alt="" width={20} /></button>

                  </div>
                </div>
                //  <div>item.food_id</div>
              ))
            }


          </div>


        </div>
      </div>
    </div>
  )
}

export default ExpenseExplorer