function urunListele() {
    var id = window.sessionStorage.getItem("giris");
    var urunDiv = document.getElementById("urunler");
    urunDiv.innerHTML = "";
    $.ajax({
        url: "Default.aspx/UrunListele",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var data = JSON.parse(result.d);
            for (var i = 0; i < data.length; i++) {

                var urunDivtopla = "";

                // urunDivtopla += "<div class='UrunDiv' id='a' ><div class='urunBilgi'><img src='img/" + data[i].Resim + "' alt='Resim Yok' class='UrunResim' title='İncele' onclick='ResimIncele(" + data[i].id + ")'/><p>Kitap Adı:" + data[i].ad + "</p><p>Yazar:" + data[i].yazarAd + " " + data[i].yazarSoyad + "</p></div>";
                urunDivtopla += "<div class='UrunDiv' id='a' ><div class='urunBilgi'>";
                if (data[i].Resim != null && data[i].Resim != "") {
                    urunDivtopla += "<img src='img/" + data[i].Resim + "' alt='Resim Yok' class='UrunResim' title='İncele' onclick='ResimIncele(" + data[i].id + ")'/>";
                }
                else {
                    urunDivtopla += "<img src='img/null.png' alt='Resim Yok' class='UrunResim' title='İncele' onclick='ResimIncele(" + data[i].id + ")'/>";
                }

                urunDivtopla += "<p>Kitap Adı:" + data[i].ad + "</p><p>Yazar:" + data[i].yazarAd + " " + data[i].yazarSoyad + "</p></div>";
                if (window.sessionStorage.getItem("giris") != null) {

                    urunDivtopla += "<br><input type='button'  value='Sepete Ekle' id='SepeteEkle' class='sepetEkleButon' onclick='SepetEkle(" + data[i].id + ")'></div>"
                }
                else {

                    urunDivtopla += "<br><input type='button'  value='İncele' id='Incele' class='sepetEkleButon' onclick='ResimIncele(" + data[i].id + ")'></div>";
                }

                urunDiv.innerHTML += urunDivtopla;
                urunDivtopla = "";
            }
        },
        error: function () {
            alert("Bağlantı Hatası!!!");
        }
    })
}

function ResimIncele(id) {
    var modal = document.getElementById('resimIncele');
    var span = document.getElementsByClassName("close")[0];
    var inceleDetay = document.getElementById("resimInceleBody");

    $.ajax({
        url: "Default.aspx/UrunDetay",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: "{id:'" + id + "'}",
        success: function (result) {
            var urunDetayTopla = "";
            var data = JSON.parse(result.d);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Resim != null && data[i].Resim != "") {
                    urunDetayTopla += "<div class='UrunDetay'><img src='img/" + data[i].Resim + "' alt='Resim Yok' class='UrunResimDetay'/>";
                }
                else {
                    urunDetayTopla += "<div class='UrunDetay'><img src='img/null.png' alt='Resim Yok' class='UrunResimDetay'/>";
                }
                urunDetayTopla += "<p>ISBN Numarası:" + data[i].isbn + "</p><p>KitapAdı:" + data[i].ad + "</p><p>Sayfa Sayısı:" + data[i].sayfaSayisi + "</p><p>Yazar:" + data[i].yazarAd + " " + data[i].yazarSoyad + "</p><div id='ozet'>Kitap Özet:" + data[i].ozet + "</div></div>";
            }
            inceleDetay.innerHTML = urunDetayTopla;
        },
        error: function () {
            alert("Bağlantı Hatası");
        }
    })

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function SepetEkle(kitapId) {
    GirisBak();
    var uyeId = window.sessionStorage.getItem("giris");
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/SepeteEkle",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{kitapId:'" + kitapId + "',uyeId:'" + uyeId + "'}",
            success: function () {

            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        });
    }
    else {
        alert("Uye girişi Yapılmamış!!!");
        CikisYap();
    }
}

function SepetimUzunluk() {
    var uyeId = window.sessionStorage.getItem("giris");
    var sepetButon = document.getElementById("sepetimButton");
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/Sepetim",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{id:'" + uyeId + "'}",
            success: function (result) {
                var data = JSON.parse(result.d);
                var sepetButon = document.getElementById("sepetimButton");
                sepetButon.innerHTML = "Sepetim(<code>" + data.length + "<code>)";
            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        });
    }
    else {
        sepetButon.innerHTML = "Kitap Sepet";
        CikisYap();
    }
}

function Sepetim() {
    var uyeId = window.sessionStorage.getItem("giris");
    var sepetButon = document.getElementById("sepetimButton");
    var sepetDiv = document.getElementById("urunler");
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/Sepetim",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{id:'" + uyeId + "'}",
            success: function (result) {
                var data = JSON.parse(result.d);
                if (data.length > 0) {
                    var sepetTopla = "";
                    sepetTopla += "<table border=0 class='SepetimListe'><tr><td>Resim</td><td>Kitap ISBN</td><td>Kitap Adı</td><td>Sayfa Sayısı</td><td></td>";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Resim != null && data[i].Resim != "") {
                            sepetTopla += "<tr class='SepetUrun' id='"+data[i].KitapId+"' title='"+data[i].id+"'><td><img class='SepetResim' src='img/" + data[i].Resim + "' onclick='ResimIncele(" + data[i].KitapId + ")'/></td>";
                        }
                        else {
                            sepetTopla += "<tr class='SepetUrun' id='" + data[i].KitapId + "' title='" + data[i].id + "'><td><img class='SepetResim' src='img/null.png'onclick='ResimIncele(" + data[i].KitapId + ")'/></td>";
                        }
                        sepetTopla += "<td>" + data[i].isbn + "</td><td>" + data[i].ad + "</td><td>" + data[i].sayfaSayisi + "</td><td><img src='img/cikar.png' width='40' height='40' style='cursor:pointer;' title='Sepetten Çıkar' onclick='SepettenCikar(" + data[i].id + ")'></td></tr>"
                    }
                    sepetTopla += "<tr> <td colspan=5 style='height:75px;'><input type='button'  value='Hepsini Satın Al' id='SepetiAl' onclick='SatinAl()' style='margin-left:35%;' class='sepetEkleButon'></td> </tr></table>"
                    sepetDiv.innerHTML = sepetTopla;
                }
                else {
                    //alert("Sepetinizde Ürün Bulunmamaktadır.");
                    GirisBak();
                }
            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        });
    }
    else {
        sepetButon.innerHTML = "Kitap Sepet";
        CikisYap();
    }
}

function SepettenCikar(id) {
    var uyeId = window.sessionStorage.getItem("giris");
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/SepetUrunCikar",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{id:'" + id + "'}",
            success: function () {
                Sepetim();
                SepetimUzunluk();
            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        })
    }
    else {
        CikisYap();
    }
}

//ContentUye

$(document).ready(function () {
    GirisBak();
    Kategoriler();
    $("#btnFiltre").click(function () {
        var idler = ""
        var chec = document.getElementsByClassName("checkler");
        var secilenUzunluk = 0;
        var sayac = 0;
        for (var i = 0; i < chec.length; i++) {
            if (chec[i].checked) {
                secilenUzunluk++;
            }
        }
        for (var i = 0; i < chec.length; i++) {
            if (chec[i].checked) {
                sayac++;
                if (sayac == secilenUzunluk) {
                    idler += chec[i].value;
                }
                else {
                    idler += chec[i].value + ",";
                }
            }
        }
        if (secilenUzunluk > 0) {
            filtreliUrunler(idler);
        }
        else {
            urunListele();
        }
    });
    $("#btnAra").click(function () {
        AramaYap();
    });

});

function GirisBak() {
    var id = window.sessionStorage.getItem("giris");
    var yaz = document.getElementById("profil");
    var sepetButon = document.getElementById("sepetimButton");
    if (id != null) {
        $.ajax({
            url: "Default.aspx/GirisProfil",

            contentType: "application/json",
            dataType: "json",

            type: "post",
            data: "{id:'" + id + "'}",
            success: function (result) {
                var data = JSON.parse(result.d);
                var cikisButon = document.getElementById('cikisYap');
                var uyeGiris = document.getElementById('uyeGiris');
                var kitaplarim = document.getElementById('kitaplarim');
                var AramaNavigate = document.getElementById('AramaNavigate');
                var ProfilNavigate = document.getElementById('profilNavigate');
                var profilDiv = document.getElementById('UyeBilgileriDiv');
                ProfilNavigate.style.display = "flex";
                AramaNavigate.style.display = "flex";
                uyeGiris.style.display = "none";
                cikisButon.style.display = "flex";
                kitaplarim.style.display = "flex";
                profilDiv.innerHTML = "<p><span>Kullanıcı Adı:" + data[0].kulid + "<span></p><p><span>Ad Soyad:" + data[0].adSoyad + "<span></p>";
                urunListele();
                SepetimUzunluk();
            },
            error: function () {
                alert("Bağlantı Başarısız");
            }
        });
    }
    else { yaz.innerHTML = ""; urunListele(); sepetButon.innerHTML = "Kitap Sepet" }
}
function CikisYap() {
    var cikisButon = document.getElementById('cikisYap');
    var uyeGiris = document.getElementById('uyeGiris');
    var kitaplarim = document.getElementById('kitaplarim');
    var AramaNavigate = document.getElementById('AramaNavigate');
    var ProfilNavigate = document.getElementById('profilNavigate');
    ProfilNavigate.style.display = "none";
    AramaNavigate.style.display = "none";
    kitaplarim.style.display = "none";
    uyeGiris.style.display = "flex";
    cikisButon.style.display = "none";
    window.sessionStorage.removeItem("giris");
    GirisBak();
}
function Kategoriler() {
    $.ajax({
        url: "Default.aspx/Kategoriler",
        contentType: "application/json",
        type: "post",
        dataType: "json",
        success: function (result) {
            var kategoriDiv = document.getElementById("kategoriler");
            var data = JSON.parse(result.d);
            var kategoriOlustur = "";
            for (var i = 0; i < data.length; i++) {
                kategoriOlustur += "<input type='checkbox' name='check' value='" + data[i].katId + "' class='checkler' /><b>" + data[i].katAd + "</b><br />";
            }
            kategoriDiv.innerHTML = kategoriOlustur;
        },
        error: function () {
            alert("Bağlantı Başarısız");
        }
    })
}
function filtreliUrunler(idler) {
    var id = window.sessionStorage.getItem("giris");
    var urunDiv = document.getElementById("urunler");
    urunDiv.innerHTML = "";
    $.ajax({
        url: "Default.aspx/filtreliUrunler",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: "{idler:'" + idler + "'}",
        success: function (result) {
            var data = JSON.parse(result.d);
            for (var i = 0; i < data.length; i++) {

                var urunDivtopla = "";  
                urunDivtopla += "<div class='UrunDiv' id='a' ><div class='urunBilgi'>";
                if (data[i].Resim != null && data[i].Resim != "") {
                    urunDivtopla += "<img src='img/" + data[i].Resim + "' alt='Resim Yok' class='UrunResim' title='İncele' onclick='ResimIncele(" + data[i].id + ")'/>";
                }
                else {
                    urunDivtopla += "<img src='img/null.png' alt='Resim Yok' class='UrunResim' title='İncele' onclick='ResimIncele(" + data[i].id + ")'/>";
                }

                urunDivtopla += "<p>Kitap Adı:" + data[i].ad + "</p><p>Yazar:" + data[i].yazarAd + " " + data[i].yazarSoyad + "</p></div>";
                if (window.sessionStorage.getItem("giris") != null) {

                    urunDivtopla += "<br><input type='button'  value='Sepete Ekle' id='SepeteEkle' class='sepetEkleButon' onclick='SepetEkle(" + data[i].id + ")'></div>"
                }
                else {

                    urunDivtopla += "<br><input type='button'  value='İncele' id='Incele' class='sepetEkleButon' onclick='ResimIncele(" + data[i].id + ")'></div>";
                }

                urunDiv.innerHTML += urunDivtopla;
                urunDivtopla = "";
            }
        },
        error: function () {
            alert("Bağlantı Hatası!!!");
        }

    })
}

function SatinAl() {

    var id = window.sessionStorage.getItem("giris");
    var urun = document.getElementsByClassName("SepetUrun");
    if(id!=null){
        for (var i = 0; i < urun.length ; i++){
            var kitapId = urun[i].id;
            var sepetId = urun[i].title;
            SatinAlAjax(kitapId, id);
        }
        SepetTemizle();
        GirisBak();
    }
    else {
        alert("Lütfen Giriş Yapınız...");
    }
}

function SepetTemizle() {
    var uyeId = window.sessionStorage.getItem("giris");
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/SepetimTemizle",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{uyeId:'" + uyeId + "'}",
            success: function () {

            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        })
    }
    else {
        CikisYap();
    }
}

function SatinAlAjax(kid, uid) {
    $.ajax({
        url: "Default.aspx/SatinAl",
        contentType: "application/json",
        type: "post",
        dataType: "json",
        data: "{kitapId:'" + kid + "',uyeId:'" + uid + "'}",
        success: function () {

        },
        error: function () {
            alert("Bağlantı Hatası");
        }

    });
}

function Kitaplarim(aramaDurum,aranacak) {
    var uyeId = window.sessionStorage.getItem("giris");
    var sepetDiv = document.getElementById("urunler");
    sepetDiv.innerHTML = "";
    if (uyeId != null) {
        $.ajax({
            url: "Default.aspx/Kitaplarim",
            contentType: "application/json",
            type: "post",
            dataType: "json",
            data: "{uyeId:'" + uyeId + "',aramaDurum:'"+aramaDurum+"',aranacak:'"+aranacak+"'}",
            success: function (result) {
                var data = JSON.parse(result.d);
                if (data.length > 0) {
                    var sepetTopla = "";
                    sepetTopla += "<table border=0 class='SepetimListe' style='margin-left:0px'><tr><td>Resim</td><td>Kitap ISBN</td><td>Kitap Adı</td><td>Sayfa Sayısı</td><td>Yazar Ad Soyad</td><td>Alınma Tarihi</td>";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Resim != null && data[i].Resim != "") {
                            sepetTopla += "<tr class='SepetUrun' id='" + data[i].kitapId + "' title='" + data[i].id + "'><td><img class='SepetResim' src='img/" + data[i].Resim + "' onclick='ResimIncele(" + data[i].kitapId + ")'/></td>";
                        }
                        else {
                            sepetTopla += "<tr class='SepetUrun' id='" + data[i].kitapId + "' title='" + data[i].id + "'><td><img class='SepetResim' src='img/null.png'onclick='ResimIncele(" + data[i].kitapId + ")'/></td>";
                        }
                        sepetTopla += "<td>" + data[i].isbn + "</td><td>" + data[i].ad + "</td><td>" + data[i].sayfaSayisi + "</td><td>"+data[i].yazarAd+" "+data[i].yazarSoyad+"</td><td>"+data[i].alisTarihi+"</td> </tr>"
                    }
                    sepetTopla += "</table>"
                    sepetDiv.innerHTML = sepetTopla;
                }
                else {
                    //alert("Sepetinizde Ürün Bulunmamaktadır.");
                    GirisBak();
                }
            },
            error: function () {
                alert("Bağlantı Hatası");
            }
        });
    }
}

function AramaYap() {
    var combo = document.getElementById("AramaSecim").value;
    var txtAra = document.getElementById("txtAra").value;
    Kitaplarim(combo, txtAra);
}