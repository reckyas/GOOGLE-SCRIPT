// Tanggal isi Otomatis
document.getElementById('tgl_transaksi').value = '04-12-2020';
const disclaimer = 'DevTool Injector By Recky';

// Data JSON/Obj toko
const dataToko = {
    "toko1": {
        "nama": 'CATERING MATAHARI',
        "alamat" : 'JL. SUYUDONO NO.1 BADEGAN'
    },
    "toko2": {
        "nama": 'IDAH PUTRA CATERING',
        "alamat": 'JL. LET. JEND. SOEPRAPTO, RONOWIJAYAN'
    },"toko3": {
        "nama": 'SUMBER MAKMUR',
        "alamat": 'JL. DIPONEGORO'
    },"toko4": {
        "nama": 'TB NURANI JAYA',
        "alamat": 'MBOGO - TANJUNG GUNUNG - BADEGAN - PONOROGO'
    },"toko5": {
        "nama": 'QUEENCOM',
        "alamat": 'DUKUH SUKOSARI RT.002 RW.002, KEL/DESA KAPURAN, KE. BADEGAN, KAB . PONOROGO'
    },"toko6": {
        "nama": 'REOG TEFA TKJ SKIBA',
        "alamat": 'JL. SUYUDONO NO.1 BADEGAN'
    },"toko7": {
        "nama": 'PRO MEKANIK GLOBALINDO',
        "alamat": 'JL. LAWU NO.5A JATEN PALUR - KARANGANYAR'
    },"toko8": {
        "nama": 'SPBU Pertamina Badegan',
        "alamat": 'Jl. Raya Badegan Kec. Sampung'
    }, "toko9": {
        "nama": 'Revolution Computer & Laptop',
        "alamat": 'Jl. Parikesit No.32, RT.01/RW.01, Krajan, Kepatihan, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63416, Indonesia'
    }, "toko10": {
        "nama": 'CV. ANUGRAH CIPTA MANDIRI',
        "alamat": 'Dusun 1, Bungu, Kec. Mayong, Kabupaten Jepara, Jawa Tengah 59465, Indonesia'
    }, "toko11": {
        "nama": 'CAHYA INTERIOR',
        "alamat": 'MADIUN'
    }, "toko12": {
        "nama": 'UD. DADI WANGI',
        "alamat": 'JL. Semeru, RT/RW 04/02, GLINGANG, KAB. PONOROGO'
    }, "toko13": {
        "nama": 'RASWO INTERNASIONAL',
        "alamat": 'KP DANUKUSUMAN - KOTA SURAKARTA'
    }, "toko14": {
        "nama": 'JATI MULYA',
        "alamat": 'DUKUH BROTO RT/RW: 02/01, BROTO KAB. PONOROGO'
    }
    
}

// Buat Element untuk inject
let container = document.createElement('div');
let node = document.createElement('div');
let att = document.createAttribute('id');
let attc = document.createAttribute('id');
let h3 = document.createElement('h3');
h3.innerText = disclaimer;
attc.value = 'containerUtama';
att.value = 'injectContent';
container.setAttributeNode(attc);
node.setAttributeNode(att);
node.innerHTML=`<button id="inject">inject</button>`;


let wrapToko = document.createElement('ul');
let attToko = document.createAttribute('id');
attToko.value = "warpToko";
wrapToko.setAttributeNode(attToko);

// Inject ELement
document.body.appendChild(container);
container.appendChild(h3);
container.appendChild(wrapToko);
container.appendChild(node);
// Deklarasi varibel yg di perlukan
let nama_toko = document.getElementById('nama_toko');
let alamat_toko = document.getElementById('alamat');
let btbIn = document.getElementById('inject');
let tempatListToko = document.getElementById('warpToko');
var listToko = ``;

// Proses
btbIn.addEventListener('click', (e) => {
    const sisa_volume = document.getElementById('sisa_volume').value;
    const harga_satuan = document.getElementById('harga_maksimal').value;
    console.log(no_bukti);
    document.getElementById('harga_realisasi').value = harga_satuan;
    document.getElementById('volume').value = sisa_volume;
    document.getElementById('total').value = harga_satuan*sisa_volume;
    document.getElementById('totalBKU').value = harga_satuan*sisa_volume;
    nama_toko.value = dataToko[tokoDipilih()].nama;
    alamat_toko.value = dataToko[tokoDipilih()].alamat;
})

for (var key in dataToko) {
    // skip loop if the property is from prototype
    if (!dataToko.hasOwnProperty(key)) continue;

    var obj = dataToko[key];
    listToko += `<li><input type="radio" name="toko" id="`+key+`" value="`+key+`"><label for=`+key+`>`+obj['nama']+`</label></li>`;
    
}
tempatListToko.innerHTML=listToko;
function tokoDipilih() { 
    var ele = document.getElementsByName('toko'); 
      
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        return ele[i].value;
    } 
} 
