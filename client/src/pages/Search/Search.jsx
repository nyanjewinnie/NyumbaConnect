import "./Search.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";

function Search() {

  const { houses } = useContext(HouseContext);

  const [county, setCounty] = useState("");
  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");


  const locations = {

    Nairobi: [
      "Kasarani",
      "Embakasi",
      "Westlands",
      "South C",
      "Kilimani"
    ],

    Kiambu: [
      "Ruiru",
      "Kiambu Town",
      "Githurai",
      "Juja"
    ]

  };


  const sublocations = {

    Ruiru: [
      "Mwihoko",
      "Membley"
    ],

    "Kiambu Town": [
      "Kiambu Central"
    ],

    Githurai: [
      "Githurai 45"
    ],

    Juja: [
      "Juja Farm"
    ],

    Kasarani: [
      "Mwiki"
    ],

    Embakasi: [
      "Imara Daima"
    ],

    "South C": [
      "South C Estate"
    ],

    Westlands: [
      "Westlands Central"
    ],

    Kilimani: [
      "Kilimani Estate"
    ]

  };


  const filteredHouses = houses.filter((house)=>{

    return (

      (county === "" ||
        house.county === county)

      &&

      (location === "" ||
        house.location === location)

      &&

      (sublocation === "" ||
        house.sublocation === sublocation)

      &&

      (type === "" ||
        house.type === type)

      &&

      (status === "" ||
        house.status === status)

      &&

      (
        budget === "" ||

        (budget === "below10000" &&
          house.rent < 10000)

        ||

        (budget === "10000-20000" &&
          house.rent >=10000 &&
          house.rent <=20000)

        ||

        (budget === "20000-50000" &&
          house.rent >20000 &&
          house.rent <=50000)

        ||

        (budget === "above50000" &&
          house.rent >50000)

      )

    );

  });



return (

<section className="search-page">


<h1>Search Houses</h1>


<div className="search-filters">


<select
value={county}
onChange={(e)=>{
setCounty(e.target.value);
setLocation("");
setSublocation("");
}}
>

<option value="">
Select County
</option>

<option>
Nairobi
</option>

<option>
Kiambu
</option>

</select>



<select
value={location}
onChange={(e)=>{
setLocation(e.target.value);
setSublocation("");
}}
>

<option value="">
Select Location
</option>

{
county &&
locations[county].map((loc)=>(
<option key={loc}>
{loc}
</option>
))
}

</select>



<select
value={sublocation}
onChange={(e)=>setSublocation(e.target.value)}
>

<option value="">
Select Sub-location
</option>

{
location &&
sublocations[location].map((sub)=>(
<option key={sub}>
{sub}
</option>
))
}

</select>



<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="">
House Type
</option>

<option>Single Room</option>
<option>Bedsitter</option>
<option>Studio Apartment</option>
<option>One Bedroom</option>
<option>Two Bedroom</option>
<option>Three Bedroom</option>
<option>Apartment</option>
<option>Maisonette</option>

</select>



<select
value={budget}
onChange={(e)=>setBudget(e.target.value)}
>

<option value="">
Budget
</option>

<option value="below10000">
Below 10,000
</option>

<option value="10000-20000">
10,000 - 20,000
</option>

<option value="20000-50000">
20,000 - 50,000
</option>

<option value="above50000">
Above 50,000
</option>


</select>



<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="">
Status
</option>

<option>
Available
</option>

<option>
Occupied
</option>

</select>


</div>



<div className="search-results">


{
filteredHouses.length === 0 ? (

<p>
No houses found.
</p>

)

:

filteredHouses.map((house)=>(

<div
className="result-card"
key={house._id || house.id}
>


<img
src={house.images?.[0] || house.image}
alt={house.type}
/>


<h3>
{house.title}
</h3>


<p>
Type: {house.type}
</p>


<p>
Location: {house.location}, {house.sublocation}
</p>


<p>
Rent: KSh {house.rent.toLocaleString()}
</p>


<p>
Status: {house.status}
</p>


<Link to={`/property/${house._id || house.id}`}>

<button>
View Details
</button>

</Link>


</div>

))

}


</div>


</section>

);


}


export default Search;