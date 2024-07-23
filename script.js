// FUNGSI UNTUK MENDAPATKAN INPUT DARI USER
function getInputUser() {
  const inputUsia = document.getElementById("iUsia").value;
  const umur = new Date().getFullYear() - Number(inputUsia.split("-")[0]);
  const inputBeratBadan = Number(document.getElementById("iBeratBadan").value);
  const inputTinggiBadan = Number(
    document.getElementById("iTinggiBadan").value
  );
  const inputNama = document.getElementById("iNama").value;
  const selectOptionA = selectOptions("iJenisAktivitas");
  const selectOptionK = selectOptions("iKelamin");

  validasiInput(
    inputNama,
    selectOptionK,
    umur,
    inputBeratBadan,
    inputTinggiBadan,
    selectOptionA
  );
}

// FUNGSI UNTUK MENGISI SELECT OPTION AKTIVITAS ATAU SELECT OPTION KELAMIN
function selectOptions(element) {
  const selectElement = document.getElementById(element);
  return selectElement.options.selectedIndex;
}

// FUNGSI UNTUK MEMERIKSA APAKAH USER MEMASUKKAN DATA YANG BENAR ATAU TIDAK
function validasiInput(
  nama,
  kelamin,
  usia,
  beratBadan,
  tinggiBadan,
  aktivitas
) {
  if (
    !nama ||
    kelamin < 1 ||
    !usia ||
    !beratBadan ||
    !tinggiBadan ||
    aktivitas < 1
  ) {
    displayError("Harap Masukkan Data Dengan Lengkap");
    return;
  }

  if (isNaN(usia) || isNaN(beratBadan) || isNaN(tinggiBadan)) {
    displayError(
      "Data yang dimasukkan tidak valid. Harap masukkan angka yang benar."
    );
    return;
  }

  calculateMacronutrition(
    nama,
    kelamin,
    usia,
    beratBadan,
    tinggiBadan,
    aktivitas
  );
}

// FUNGSI UNTUK MENGHITUNG KEBUTUHAN MAKRONUTRISI PENGGUNA
function calculateMacronutrition(
  nama,
  kelamin,
  usia,
  beratBadan,
  tinggiBadan,
  levelAktivitas
) {

  // MENGHITUNG KEBUTUHAN KALORI
  const bmr =
    kelamin === 1
      ? 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia + 5
      : 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia - 161;

  const faktorAktivitasK = [1.2, 1.375, 1.55, 1.725, 1.9];
  const levelAktivitasK = faktorAktivitasK[levelAktivitas - 1] || 1.9;
  const totalKalori = bmr * levelAktivitasK;

  // MENGHITUNG KEBUTUHAN PROTEIN
  const totalProtein = Math.round(
    beratBadan * [0.9, 1.1, 1.3, 1.6, 2.0][levelAktivitas - 1]
  );
  // MENGHITUNG KEBUTUHAN LEMAK
  const totalLemak = Math.round(
    (totalKalori * [0.25, 0.3, 0.35, 0.37, 0.4][levelAktivitas - 1]) / 9
  );
  //MENGHITUNG KEBUTUHAN LEMAK
  const totalKarbohidrat = Math.round(
    (totalKalori * [0.5, 0.55, 0.58, 0.6, 0.63][levelAktivitas - 1]) / 4
  );

  displayResult(nama, totalKalori,totalProtein, totalKarbohidrat, totalLemak);
}

// FUNGSI UNTUK MENAMPILKAN KEBUTUHAN KALORI PENGGUNA
function displayResult(nama, totalKalori,totalProtein, totalKarbohidrat, totalLemak) {
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
  const makronutrisi = [totalProtein, totalKarbohidrat, totalLemak];
  if (!document.getElementById("exampleModal")) {
    document.body.insertAdjacentHTML("beforeend", displayDetailNutrisi(makronutrisi));
  }
}

// FUNGSI UNTUK MENAMPILKAN KEBUTUHAN MAKRONUTRISI (PROTEIN,LEMAK DAN KARBOHIDRAT) PENGGUNA
function displayDetailNutrisi(makronutrisi) {
  const [protein,karbohidrat,lemak]= makronutrisi;
  return `    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Detail Nutrisi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ol class="list-group list-group-numbered">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Kebutuhan Protein</div>
                  ${protein} Gr.
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Kebutuhan Karbohidrat</div>
                  ${karbohidrat} Gr.
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Kebutuhan Lemak</div>
                  ${lemak} Gr.
                </div>
              </li>
            </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>`
}


document.getElementById('btn-simpan').addEventListener('click',getInputUser);
