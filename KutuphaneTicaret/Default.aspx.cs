using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KutuphaneTicaret
{
    public partial class Default1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        static SqlConnection baglanti = new SqlConnection(ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
        [WebMethod]
        public static string GirisProfil(string id)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("Select * From Uyeler Where id=@id", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            adtr.SelectCommand.Parameters.AddWithValue("id", id);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);

        }
        [WebMethod]
        public static string GirisYap(string kuladi, string sifre)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("Select id From Uyeler Where kulid=@kuladi and pw=@sifre", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            adtr.SelectCommand.Parameters.AddWithValue("kuladi", kuladi);
            adtr.SelectCommand.Parameters.AddWithValue("sifre", sifre);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                return JsonConvert.SerializeObject(dt, Formatting.Indented);
            }
            else
            {
                return "";
            }
        }
        [WebMethod]
        public static string UrunListele()
        {
            SqlDataAdapter adtr = new SqlDataAdapter("select k.id, k.isbn,k.ad,k.ozet,k.sayfaSayisi,k.Resim,y.yazarAd,y.yazarSoyad,y.biyografi From Kitap k join Yazar y on y.yazarId=k.yazarId", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }

        [WebMethod]
        public static string UrunDetay(string id)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("select k.id, k.isbn,k.ad,k.ozet,k.sayfaSayisi,k.Resim,y.yazarAd,y.yazarSoyad,y.biyografi From Kitap k join Yazar y on y.yazarId=k.yazarId where k.id=@id", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            adtr.SelectCommand.Parameters.AddWithValue("id", id);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }

        [WebMethod]
        public static void SepeteEkle(int kitapId, int uyeId)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("Insert Into Sepet Values(@kitapId,@uyeId)", baglanti);
            adtr.SelectCommand.Parameters.AddWithValue("kitapId", kitapId);
            adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
            baglanti.Open();
            adtr.SelectCommand.ExecuteNonQuery();
            baglanti.Close();
        }

        [WebMethod]
        public static string Sepetim(string id)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("select k.id as KitapId ,uyeId,s.id,isbn,ad,sayfaSayisi,Resim from Sepet s join Kitap k on k.id=s.kitapId  Where s.uyeId=@id", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            adtr.SelectCommand.Parameters.AddWithValue("id", id);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }

        [WebMethod]
        public static void SepetUrunCikar(int id)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("delete From Sepet Where id=@id", baglanti);
            adtr.SelectCommand.Parameters.AddWithValue("id", id);
            baglanti.Open();
            adtr.SelectCommand.ExecuteNonQuery();
            baglanti.Close();
        }


        [WebMethod]
        public static string Kategoriler()
        {
            SqlDataAdapter adtr = new SqlDataAdapter("Select * From Kategori", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }

        [WebMethod]
        public static string filtreliUrunler(string idler)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("Select * From Kitap k join yazar y on y.yazarId=k.yazarId Where kategoriId in(+"+idler+")", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }
        [WebMethod]

        public static void SatinAl(int kitapId,int uyeId)
        {
            SqlConnection bag = new SqlConnection(ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
            SqlDataAdapter adtr = new SqlDataAdapter("Insert Into SatinAl values(@kitapId,@uyeId,@tarih)", bag);
            adtr.SelectCommand.Parameters.AddWithValue("kitapId", kitapId);
            adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
            adtr.SelectCommand.Parameters.AddWithValue("tarih", DateTime.Now);
            bag.Open();
            adtr.SelectCommand.ExecuteNonQuery();
            bag.Close();
         //   SepetUrunCikar(sepetId);
        }

        [WebMethod]
        public static string Kitaplarim(int uyeId , int aramaDurum,string aranacak)
        {
            SqlDataAdapter adtr;
            switch (aramaDurum)
            {
                case 1:
                    adtr = new SqlDataAdapter("Select * From SatinAl s Join Kitap k on k.id=s.kitapId Join Yazar y on y.yazarId=k.yazarId Where s.uyeId=@uyeId and k.ad like('%"+aranacak+"%')", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
                    adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
                    break;
                case 2:
                    adtr = new SqlDataAdapter("Select * From SatinAl s Join Kitap k on k.id=s.kitapId Join Yazar y on y.yazarId=k.yazarId Where s.uyeId=@uyeId and y.yazarAd like('%" + aranacak + "%')", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
                    adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
                    break;
                case 3:
                    adtr = new SqlDataAdapter("Select * From SatinAl s Join Kitap k on k.id=s.kitapId Join Yazar y on y.yazarId=k.yazarId Where s.uyeId=@uyeId and k.isbn like('%" + aranacak + "%')", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
                    adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
                    break;
                default:
                    adtr = new SqlDataAdapter("Select * From SatinAl s Join Kitap k on k.id=s.kitapId Join Yazar y on y.yazarId=k.yazarId Where s.uyeId=@uyeId", ConfigurationManager.ConnectionStrings["baglanti"].ConnectionString);
                    adtr.SelectCommand.Parameters.AddWithValue("uyeId", uyeId);
                    break;
            }           
            DataTable dt = new DataTable();
            adtr.Fill(dt);
            return JsonConvert.SerializeObject(dt, Formatting.Indented);
        }

        [WebMethod]
        public static void SepetimTemizle(int uyeId)
        {
            SqlDataAdapter adtr = new SqlDataAdapter("delete From Sepet Where uyeId=@id", baglanti);
            adtr.SelectCommand.Parameters.AddWithValue("id", uyeId);
            baglanti.Open();
            adtr.SelectCommand.ExecuteNonQuery();
            baglanti.Close();
        }
    }
}