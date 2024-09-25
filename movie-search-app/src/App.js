import React, { useState, useEffect } from 'react'; // React bileşenleri ve hook'lar import ediliyor
import { Routes, Route } from 'react-router-dom'; // Sayfa yönlendirmesi için gerekli bileşenler
import Navbar from './components/Navbar'; // Navbar bileşeni
import MovieList from './components/MovieList'; // Film listesi bileşeni
import MovieDetail from './components/MovieDetail'; // Film detayı bileşeni
import SearchBar from './components/SearchBar'; // Arama çubuğu bileşeni
import Pagination from './components/Pagination'; // Sayfalama bileşeni
import './App.css'; // Uygulama CSS dosyası
import axios from 'axios'; // HTTP istekleri için axios kütüphanesi

// App bileşeni, uygulamanın ana bileşeni
const App = () => {
  // Filmler, sayfa numarası ve toplam sonuç sayısı için state'ler
  const [movies, setMovies] = useState([]); // Filmleri tutacak state
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa numarası
  const [totalResults, setTotalResults] = useState(0); // Toplam film sayısı
  const moviesPerPage = 12; // Sayfa başına gösterilecek film sayısı

  // API'den film verilerini getiren asenkron fonksiyon
  const fetchMovies = async (query, page = 1) => {
    const apiKey = '2f9f632a'; // OMDb API anahtarı
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie&page=${page}`; // API URL'si

    try {
      const response = await axios.get(url); // Axios ile GET isteği
      if (response.data.Response === 'True') { // Eğer cevap başarılıysa
        // Filmlerin yılı sayıya dönüştürülüyor ve yeni bir dizi oluşturuluyor
        const moviesWithYear = response.data.Search.map(movie => ({
          ...movie,
          Year: parseInt(movie.Year), // Yılı sayıya çevir
        }));

        // Filmleri yayın tarihine göre sıralıyoruz (yeni filmler önce gelecek şekilde)
        const sortedMovies = moviesWithYear.sort((a, b) => b.Year - a.Year);
        setMovies(sortedMovies); // Sıralanmış filmleri state'e kaydet
        setTotalResults(parseInt(response.data.totalResults, 10)); // Toplam sonuç sayısını güncelle
      } else {
        setMovies([]); // Eğer sonuç bulunamazsa boş dizi ayarla
      }
    } catch (error) {
      console.error("Film arama hatası: ", error); // Hata mesajı konsola yazdırılıyor
    }
  };

  // Sayfa yüklendiğinde ve currentPage değiştiğinde çalışacak useEffect
  useEffect(() => {
    fetchMovies('movie', currentPage); // Varsayılan olarak 'movie' kelimesiyle film araması yapılıyor
  }, [currentPage]); // currentPage her değiştiğinde useEffect çalışacak

  const totalPages = Math.ceil(totalResults / moviesPerPage); // Toplam sayfa sayısını hesapla

  return (
    <div className="app">
      <Navbar /> {/* Navigasyon çubuğu */}
      <SearchBar onSearch={(query) => fetchMovies(query)} /> {/* Arama çubuğu */}
      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} /> {/* Film listesi rotası */}
        <Route path="/film/:imdbID" element={<MovieDetail />} /> {/* Film detayları rotası */}
      </Routes>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      /> {/* Sayfalama bileşeni */}
    </div>
  );
};

export default App;
