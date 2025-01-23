const URL = "https://meowfacts.herokuapp.com/?count=6";

async function fetchData() {
  let storedData = localStorage.getItem("new");
  if(storedData){
  console.log("Using stored data",JSON.parse(storedData));
  return;
  }
    try {
        let response = await fetch(URL);
        let apiData = await response.json();

        // Convert API data to a JSON string before storing it
        
        localStorage.setItem("new", JSON.stringify(apiData.data));
       console.log("Fetched new data ", apiData.data);

        // Retrieve stored data and parse it back into an array
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


const searchbox = document.getElementById("search-bar");
const dropdown = document.getElementById("dropdown");

// Retrieve and parse data from Local Storage
const storedData = localStorage.getItem("new");
const items = storedData ? JSON.parse(storedData) : []; // Convert to array

function filterResults() {
    let input = searchbox.value.toLowerCase();
    dropdown.innerHTML = ""; // Clear previous results

    if (input === "") {
        dropdown.style.display = "none";
        return;
    }

    // Filter items based on input
    let filteredItems = items.filter(item => item.toLowerCase().includes(input));

    if (filteredItems.length === 0) {
        dropdown.innerHTML = `<div>No Results Found</div>`;
    } else {
        filteredItems.forEach(item => {
            let div = document.createElement("div");
            div.textContent = item;
            div.onclick = () => {
                searchbox.value = item; // Select item on click
                dropdown.style.display = "none"; // Hide dropdown
            };
            dropdown.appendChild(div);
        });
    }

    dropdown.style.display = "block"; 
}

// Hide dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!searchbox.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
    }
});
