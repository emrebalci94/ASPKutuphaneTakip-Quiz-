<%@ Page Title="" Language="C#" MasterPageFile="~/Default.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="KutuphaneTicaret.Default1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="scripts/jquery-3.1.0.min.js"></script>
    <link href="css/stiller.css" rel="stylesheet" />
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="iceri" runat="server">

     <script src="scripts/jquery-3.1.0.min.js"></script>
    <script src="scripts/ajax.js"></script>
       <script>

           // ÜRün Satın Alma Kısmı Yapılacak Üye Satın Aldığı ürünleri Görüntüleyebilecek.
       </script>
   <div id="ic">
       <%-- Filtrele Navigate --%>
     <div id="navigate" title="Kitap Filtrele">
       <span class="openNav" onclick="openNav()">&#9776; </span>
       <div id="mySidenav" class="sidenav">
      
         <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

         <h2 style="color: #0b6283;">Filtrele</h2>
           <hr style="width:150px;float:left" /><br />
           <div id="kategoriler">
              
           </div>
           <br /><input type="button" name="button" value="Filtrele" id="btnFiltre" class="filtreButon" />
        </div>
     </div>

       <div id="urunler">

       </div>
               <%-- Arama Navigate --%>
      <div id="AramaNavigate" style="display:none" title="Kitaplarımda Arama Yap">
       <span class="openNav" onclick="openArama()">&#9899; </span>
       <div id="aramaSide" class="sidenav">
      
         <a href="javascript:void(0)" class="closebtn" onclick="closeArama()">&times;</a>

         <h2 style="color: #0b6283;">Arama Yap</h2>
           <hr style="width:150px;float:left" /><br />
            <select id="AramaSecim"> 
                <option value="1">Kitap Adına Göre</option>
                <option value="2">Yazar Adına Göre</option>
                <option value="3">ISBN Numarasına Göre</option>
            </select>
           <input type="text" name="" value="" placeholder="Arama" id="txtAra" />
           <br /><input type="button" name="button" value="Ara" id="btnAra" class="filtreButon" />
        </div>
     </div>
          <%-- Profil Navigate --%>
      <div id="profilNavigate" title="Profil Bilgilerim" style="display:none">
       <span class="openNav" onclick="openProfil()">&#9865; </span>
       <div id="profilSide" class="sidenav">
      
         <a href="javascript:void(0)" class="closebtn" onclick="closeProfil()">&times;</a>

         <h2 style="color: #0b6283;">Bilgilerim</h2>
           <hr style="width:150px;float:left" /><br />
           <div id="UyeBilgileriDiv">
              
           </div>
         
        </div>
     </div>
   </div>

     <div id="resimIncele" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <span class="close">×</span>
              <h2>Ürün İnceleme</h2>
            </div>
            <div class="modal-body" id="resimInceleBody">
                                          
            </div>    
          </div>
        </div>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentUye" runat="server">

    <script src="scripts/jquery-3.1.0.min.js"></script>

    <div id="profil">
        
    </div>
</asp:Content>


