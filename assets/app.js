//Quoter

function Insurance(brand, year, type){
   this.brand = brand;
   this.year = year;
   this.type = type;
}

Insurance.prototype.quoteInsurance = function(insurance){
   /**
    * 1 = american 1.15
    * 2 = asian 1.05
    * 3 = european 1.35
    */
   let quantity;
   const base = 2000;
   switch (this.brand) {
      case '1':
         quantity = base * 1.15;
         break;
      case '2':
         quantity = base * 1.05;
         break;
      case '3':
         quantity = base * 1.35;
         break;
   }

   //read year
   const diference = new Date().getFullYear() - this.year;
   //Each year difference, reduce 3% of the insurance value
   quantity -= ((diference * 3) * quantity) / 100;
   /**
    * basic = 30%+
    * completo = 50+
    */
   if(this.type === 'basic'){
      quantity *= 1.30;
   }else{
      quantity *= 1.50;
   }

   return quantity;
}

//All that is show
function Interface(){

}

const body = document.querySelector(".body");

//show errors in form
Interface.prototype.showMessage = function(type){
   if(type === 'error'){
      body.children[0].style.display = "block";
   }else{
      body.children[1].style.display = "block";
   }
   setTimeout(()=>{
      body.children[1].style.display = "none";
   }, 2000);
}

//calculate quote
Interface.prototype.showSpinner = function(){
   const spiner = document.querySelector(".spiner");
   spiner.style.display = "block";
   setTimeout(() => {
      spiner.style.display = "none";
   }, 2000);
}
const resumen = document.querySelector(".resumen")
Interface.prototype.showResult = function(insurance, total){ 
   
   let brand;
   switch (insurance.brand) {
      case '1':
         brand = "American";
         break;
      case '2':
         brand = "Asian";
         break;
      case '1':
         brand = "European";
         break;
   }
   resumen.innerHTML += `
   <div class="body-resumen">
      <p><b>Brand: </b>${brand}</p>
      <p><b>Year: </b>${insurance.year}</p>
      <p><b>Type: </b>${insurance.type}</p>
      <p><b>Total: </b> <b>$${total}</b></p>
   </div>`
   this.showSpinner()
   setTimeout(() => {
      resumen.style.display = "block"
   }, 2000);   

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
      interface.showMessage("error");
   }else{
      //clear previous results
      if(resumen.children[1] !== undefined){
         resumen.children[1].remove();
         body.children[6].style.display = "none";
      }
      //make the quote
      const insurance = new Insurance(selectedBrand, selectedYear, typeChecked);
      const quantity = insurance.quoteInsurance(insurance);
      interface.showMessage("correct");
      //show result
      interface.showResult(insurance, quantity);
   }

});


//clear error message and result
form.addEventListener('click', (e)=>{
   let name = e.target.name;
   if(name === "brand" || name === "year" || name === "insurance"){
      body.children[0].style.display = "none";
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