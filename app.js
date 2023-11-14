window.addEventListener("load", () => {
    gelirler = +localStorage.getItem("gelirler") || 0
    gelirinizTd.textContent = gelirler
    tarihInput.valueAsDate = new Date()
    harcamaListesi = JSON.parse(localStorage.getItem("harcama")) || []
})


//* selector

const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")

//* variables

let gelirler = 0
let harcamaListesi = []

//* hesap tablosu

const gelirinizTd = document.getElementById("geliriniz")
const giderinizTd = document.getElementById("gideriniz")
const kalanTd = document.getElementById("kalan")
const kalanTh = document.getElementById("kalanTh")

//* harcama formu

const harcamaFormu = document.getElementById("harcama-formu")
const tarihInput = document.getElementById("tarih")
const miktarInput = document.getElementById("miktar")
const harcamaAlaniInput = document.getElementById("harcama-alani")

//* harcama tablosu
const harcamaBody = document.getElementById("harcama-body")
const temizleBtn = document.getElementById("temizle-btn")

//* ekle formu

ekleFormu.addEventListener("submit", (e) => {
    e.preventDefault()
    gelirler += Number(gelirInput.value)
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.textContent = gelirler
    ekleFormu.reset()
})

//* harcama formu fonksiyonu

harcamaFormu.addEventListener("submit", (e) => {
    e.preventDefault()
    const yeniHarcama = {
        id: new Date().getTime(),
        tarih: tarihInput.value,
        miktar: miktarInput.value,
        alan: harcamaAlaniInput.value,
    }
    harcamaListesi.push(yeniHarcama)
    tarihInput.valueAsDate = new Date()
    localStorage.setItem("harcama", JSON.stringify(harcamaListesi))
    harcamaFormu.reset()
    harcamayiDomaYaz(yeniHarcama)
})

//* harcamayı dom'a yazdır

const harcamayiDomaYaz = ({id, tarih, alan, miktar}) => {
    const tr = document.createElement("tr")

    const appendTd = (content) => {
        const td = document.createElement("td")
        td.textContent = content
        return td
    }

    const appendLastTd = () => {
        const td = document.createElement("td")
        const iElement = document.createElement("i")
        iElement.id = id
        iElement.className = "fa-solid fa-trash-can text-danger"
        iElement.type = "button"
        td.appendChild(iElement)
        return td
    }

    tr.append(
        appendTd(tarih),
        appendTd(alan),
        appendTd(miktar),
        appendLastTd()
    )

    harcamaBody.append(tr)
}
