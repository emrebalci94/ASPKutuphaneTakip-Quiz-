/// <reference path="jquery-3.1.0.min.js" />
var navDurum = true;
$(document).ready(function () {
    $("#btnGirisYap").click(function () {

        var txtKuladi = document.getElementById("txtKuladi").value;
        var txtSifre = document.getElementById("txtSifre").value;
        $.ajax({
            url: "Default.aspx/GirisYap",

            contentType: "application/json",
            dataType: "json",

            type: "post",
            data: "{kuladi:'" + txtKuladi + "',sifre:'" + txtSifre + "'}",
            success: function (result) {
                var modal = document.getElementById('girisPanel');
                var data = JSON.parse(result.d);
                window.sessionStorage.setItem("giris", data[0].id);
                modal.style.display = "none";
                GirisBak();
            },
            error: function () {
                alert("Bağlantı Başarısız");
            }
        });
    });
})

function GirisPanel() {
    var modal = document.getElementById('girisPanel');
    var span = document.getElementById("girisPanelClose");
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
function openNav() {
    if(navDurum){
        document.getElementById("mySidenav").style.width = "250px";
        navDurum = false;
    }
    else {
        document.getElementById("mySidenav").style.width = "0";
        navDurum = true;
    }
   
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var aramaDurum = true;
function openArama() {
    if (aramaDurum) {
        document.getElementById("aramaSide").style.width = "250px";
        aramaDurum = false;
    }
    else {
        document.getElementById("aramaSide").style.width = "0";
        aramaDurum = true;
    }

}

function closeArama() {
    document.getElementById("aramaSide").style.width = "0";
}

var profilDurum = true;
function openProfil() {
    if (profilDurum) {
        document.getElementById("profilSide").style.width = "250px";
        profilDurum = false;
    }
    else {
        document.getElementById("profilSide").style.width = "0";
        profilDurum = true;
    }

}

function closeProfil() {
    document.getElementById("profilSide").style.width = "0";
}