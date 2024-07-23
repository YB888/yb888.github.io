function getInputUser() {
  // Mengambil Input Dari User
  // Input Usia
  const inputUsia = document.getElementById("iUsia");
  let date = new Date();
  let umur = Number(date.getFullYear()) - Number(inputUsia.value.split("-")[0]);

  //Input Berat Badan
  const inputBeratBedan = document.getElementById("iBeratBadan").value;

  //Input Tinggi Badan
  const inputTinggiBadan = document.getElementById("iTinggiBadan").value;

  //Input Nama
  const inputNama = document.getElementById("iNama").value;

  //Input Level Aktivitas
  const selectOptionA = selectOptions("iJenisAktivitas");

  // Input Kelamin
  const selectOptionK = selectOptions("iKelamin");

  // Memanggil Fungsi Menghitung Nutrisi
  // calculateMacronutrition(
  //   inputNama,
  //   selectOptionK,
  //   umur,
  //   inputBeratBedan,
  //   inputTinggiBadan,
  //   selectOptionA
  // );
  validasiInput(
    inputNama,
    selectOptionK,
    umur,
    inputBeratBedan,
    inputTinggiBadan,
    selectOptionA
  );

  clearForm();
}

function selectOptions(element) {
  const selectElement = document.getElementById(element);
  let selectValue = selectElement.options.selectedIndex;
  return selectValue;
}

// Memeriksa Apakah User Memasukkan Data Lengkap Atau Tidak
// Memeriksa Apakah User Memasukkan Data Lengkap Atau Tidak
function validasiInput(
  nama,
  kelamin,
  usia,
  beratBadan,
  tinggiBadan,
  aktivitas
) {
  if (!nama || !kelamin || !usia || !beratBadan || !tinggiBadan || !aktivitas) {
    displayError("Harap Masukkan Data Dengan Lengkap");
    return;
  }

  // Mengonversi input ke tipe yang sesuai jika perlu
  usia = Number(usia);
  beratBadan = Number(beratBadan);
  tinggiBadan = Number(tinggiBadan);

  // Validasi konversi yang berhasil
  if (isNaN(usia) || isNaN(beratBadan) || isNaN(tinggiBadan)) {
    displayError(
      "Data yang dimasukkan tidak valid. Harap masukkan angka yang benar."
    );
    return;
  }

  // Panggil fungsi untuk menghitung makronutrisi jika semua input valid
  calculateMacronutrition([
    nama,
    kelamin,
    usia,
    beratBadan,
    tinggiBadan,
    aktivitas,
  ]);
}

function calculateMacronutrition(value) {
  let [nama, kelamin, usia, beratBadan, tinggiBadan, levelAktivitas] = value;
  /*
  Catatan:
  > Keterangan Kode Kelamin
    Laki-Laki = 1
    Perempuan = 2
  > Keterangan Level Activitas
    Sedentary = 1
    Ligthly = 2
    Moderately = 3
    Very Active = 4
    Super Active = 5
  */

  // Menghitung BMR
  let bmr = 0;
  if (kelamin === 1) {
    let calculateBmr = 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia + 5;
    bmr = calculateBmr;
  } else {
    let calculateBmr = 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia - 161;
    bmr = calculateBmr;
  }

  // Mendapatkan Level Aktivitas

  // Array untuk menyimpan faktor aktivitas berdasarkan levelAktivitas
  // Untuk Menghitung Kalori
  const faktorAktivitasK = [1.2, 1.375, 1.55, 1.725, 1.9];

  // Menentukan faktor aktivitas berdasarkan levelAktivitas
  // Untuk Menghitung Kalori
  const levelAktivitasK = faktorAktivitasK[levelAktivitas - 1] || 1.9;

  // Menghitung Total Kebutuhan Kalori
  const totalKalori = bmr * levelAktivitasK;

  // Total Kebutuhan Protein
  const totalProtein = kebutuhanProtein(beratBadan, levelAktivitas);

  // Total Kebutuhan Lemak
  const totalLemak = kebutuhanLemak(totalKalori, levelAktivitas);

  // Total Kebutuhan Karbohidrat
  const totalKarbohidrat = kebutuhanKarbo(totalKalori, levelAktivitas);

  displayResult(nama, totalKalori);
  displayDetailNutrisi();
}

// Menghitung MakroNutrisi
function kebutuhanProtein(beratBadan, levelAktivitas) {
  // Array untuk faktor aktivitas protein berdasarkan level aktivitas
  const faktorAktivitasP = [0.9, 1.1, 1.3, 1.6, 2.0];
  // Menentukan faktor aktivitas protein berdasarkan levelAktivitas
  // Tanpa validasi tambahan, asumsikan levelAktivitas sudah valid dan dalam rentang 1-5
  const levelAktivitasP = faktorAktivitasP[levelAktivitas - 1];
  // Mengembalikan Hasil Hitung Kebutuhan Protein Perhari
  return Math.round(beratBadan * levelAktivitasP);
}

function kebutuhanLemak(totalKalori, levelAktivitas) {
  // Array untuk faktor aktivitas lemak berdasarkan level aktivitas
  const faktorAktivitasL = [0.25, 0.3, 0.35, 0.37, 0.4];
  // Menentukan faktor aktivitas Lemak berdasarkan levelAktivitas
  // Tanpa validasi tambahan, asumsikan levelAktivitas sudah valid dan dalam rentang 1-5
  const levelAktivitasL = faktorAktivitasL[levelAktivitas - 1];
  // Mengembalikan Hasil Hitung dari Kebutuhan Lemak Perhari
  return Math.round((totalKalori * levelAktivitasL) / 9);
}

function kebutuhanKarbo(totalKalori, levelAktivitas) {
  // Array untuk faktor aktivitas Karbohidrat berdasarkan level aktivitas
  const faktorAktivitasK = [0.5, 0.55, 0.58, 0.6, 0.63];
  // Menentukan faktor aktivitas Karbohidrat berdasarkan levelAktivitas
  // Tanpa validasi tambahan, asumsikan levelAktivitas sudah valid dan dalam rentang 1-5
  const levelAktivitasK = faktorAktivitasK[levelAktivitas - 1];
  // Mengembalikan Hasil Hitung dari Kebutuhan Karbohidrat Perhari
  return Math.round((totalKalori * levelAktivitasK) / 4);
}

// Display Result
function displayResult(nama, totalKalori) {
  const elementResult = document.getElementById("result");
  elementResult.innerHTML = `      
      <div class="container">
        <div class="alert alert-secondary" role="alert">
          <p>Halo ${nama}, Kebutuhan Kalori Anda Adalah <strong>${totalKalori}<strong></p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        </div>
      </div>`;

  // Tambahkan modal ke DOM jika belum ada
  if (!document.getElementById("exampleModal")) {
    const body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", displayDetailNutrisi());
  }
}

// Display Detail Nutrisi
function displayDetailNutrisi() {
  return `
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
}

// Display Error
function displayError(error) {
  const elementError = document.getElementById("error");
  elementError.innerHTML = `<div
                              class=" container alert alert-danger alert-dismissible"
                              role="alert">
                              <strong>${error}</strong>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                id="btn-close"
                              ></button>
                            </div>`;
  document.getElementById("error").classList.remove("d-none");
  document.getElementById("error").classList.add("d-flex");

  setTimeout(() => {
    let errorElement = document.getElementById("error");
    errorElement.classList.remove("d-flex");
    errorElement.classList.add("d-none");
  }, 2000);
}

function clearForm() {
  const inputUsia = document.getElementById("iUsia");
  inputUsia.value = "";
  //Input Berat Badan
  const inputBeratBedan = document.getElementById("iBeratBadan");
  inputBeratBedan.value = "";
  //Input Tinggi Badan
  const inputTinggiBadan = document.getElementById("iTinggiBadan");
  inputTinggiBadan.value = "";
  //Input Nama
  const inputNama = document.getElementById("iNama");
  inputNama.value = "";

  let selectElementA = document.getElementById("iJenisAktivitas");
  selectElementA.selectedIndex = 0;
  let selectElementK = document.getElementById("iKelamin");
  selectElementK.selectedIndex = 0;
}

document.getElementById("btn-simpan").addEventListener("click", getInputUser);
