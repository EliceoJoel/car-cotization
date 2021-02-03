//Quoter

function insurance(brand, year, type){
   this.brand = brand;
   this.year = year;
   this.type = type;
}

//All that is show
function Interface(){

}

const body = document.querySelector(".body");

//show errors in form
Interface.prototype.showMessage = function(message, type){
   const div = document.createElement('div');
   if(type === 'error'){
      div.classList.add('error', 'message');
   }else{
      div.classList.add('correct', 'message');
   }
   div.innerHTML = `${message}`;
   body.insertBefore(div, document.querySelector(".brand"));

   setTimeout(() => {
      document.querySelector(".message").remove();
   }, 3000);
}

//calculate quote
Interface.prototype.showSpinner = function(){
   const spiner = document.querySelector(".spiner");
   spiner.style.display = "block";
   setTimeout(() => {
      spiner.style.display = "none";
   }, 3000);
}



//Event listeners
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
   e.preventDefault();

   //get selected option of brand
   const brand = document.getElementById("brand");
   const selectedBrand = brand.options[brand.selectedIndex].value;

   //get year selected
   const year = document.getElementById("year");
   const selectedYear = year.options[year.selectedIndex].value;

   //get type checked
   const typeChecked = document.querySelector('input[name="insurance"]:checked').value;

   //create instance of interfaz
   const interface = new Interface();

   //cheack fields
   if(selectedBrand === "" || selectedYear === "" || typeChecked ===""){
      interface.showMessage("Missing datas", "error");
   }else{
      interface.showMessage("Making your quote...", "correct");
      interface.calculate();
      //make the quote
   }

});


//insert option in year select
const maxYear = new Date().getFullYear(),
      minYear = maxYear - 20;

const selectYears = document.getElementById("year");
for(let i=maxYear; i>=minYear; i--){
   let option = document.createElement('option');
   option.value = i;
   option.innerHTML = i;
   selectYears.appendChild(option);
}