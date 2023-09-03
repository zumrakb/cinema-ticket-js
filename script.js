const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected"); //seçili eleman içerisinde selected class varsa siler, yoksa ekler,, toggle sayesinde.
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatArray = [];
  const seatArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatArray.push(seat);
  });

  seats.forEach(function (seat) {
    seatArr.push(seat);
  });

  // [1,3,5]... 38 eleman içinden seçileniş yani selected olanı 38in içinde kaçıncı index oldugunu verir.

  let selectedSeatIndexs = selectedSeatArray.map(function (seat) {
    return seatArr.indexOf(seat);
  });

  console.log(selectedSeatIndexs);

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  savedToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if ((selectedSeats != null) & (selectedSeats.length > 0)) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function savedToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
