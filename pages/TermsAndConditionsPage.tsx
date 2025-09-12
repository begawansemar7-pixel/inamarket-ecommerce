import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Syarat & Ketentuan</h1>
          <p className="mt-4 text-gray-500">Terakhir diperbarui: 2 Agustus 2024</p>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            Selamat datang di INAMarket. Syarat dan Ketentuan ("Ketentuan") ini mengatur penggunaan Anda atas situs web, layanan, dan aplikasi kami (secara kolektif disebut "Platform"). Dengan mengakses atau menggunakan Platform, Anda setuju untuk terikat oleh Ketentuan ini.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">1. Penerimaan Persyaratan</h2>
          <p>
            Dengan membuat akun atau menggunakan Platform kami, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh semua Ketentuan ini. Jika Anda tidak setuju dengan semua Ketentuan ini, maka Anda secara tegas dilarang menggunakan Platform dan Anda harus menghentikan penggunaan segera.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">2. Akun Pengguna</h2>
          <p>
            Untuk mengakses beberapa fitur Platform, Anda harus mendaftar untuk sebuah akun. Saat Anda mendaftar, Anda setuju untuk memberikan informasi yang akurat, terkini, dan lengkap. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">3. Kewajiban Penjual dan Pembeli</h2>
            <h3 className="font-semibold text-xl mt-4 mb-2 text-gray-800">Untuk Penjual:</h3>
            <ul>
                <li>Anda setuju untuk memberikan informasi produk yang akurat dan tidak menyesatkan.</li>
                <li>Anda bertanggung jawab untuk memenuhi pesanan secara tepat waktu.</li>
                <li>Anda harus mematuhi semua hukum dan peraturan yang berlaku terkait dengan penjualan produk Anda.</li>
            </ul>
            <h3 className="font-semibold text-xl mt-4 mb-2 text-gray-800">Untuk Pembeli:</h3>
            <ul>
                <li>Anda setuju untuk memberikan informasi pembayaran dan pengiriman yang valid.</li>
                <li>Anda bertanggung jawab untuk melakukan pembayaran penuh untuk produk yang Anda beli.</li>
            </ul>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">4. Konten Pengguna</h2>
          <p>
            Anda dapat memposting konten, seperti ulasan produk, komentar, dan foto ("Konten Pengguna"). Anda sepenuhnya bertanggung jawab atas Konten Pengguna yang Anda posting. Dengan memposting Konten Pengguna, Anda memberi kami lisensi non-eksklusif, bebas royalti, di seluruh dunia, untuk menggunakan, mereproduksi, dan mendistribusikan Konten Pengguna Anda sehubungan dengan pengoperasian Platform.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">5. Batasan Tanggung Jawab</h2>
          <p>
            Sejauh diizinkan oleh hukum yang berlaku, INAMarket tidak akan bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, konsekuensial, atau hukuman, atau kehilangan keuntungan atau pendapatan, baik yang terjadi secara langsung maupun tidak langsung, atau kehilangan data, penggunaan, niat baik, atau kerugian tidak berwujud lainnya, yang diakibatkan oleh (i) akses Anda ke atau penggunaan atau ketidakmampuan untuk mengakses atau menggunakan layanan; (ii) setiap perilaku atau konten dari pihak ketiga mana pun pada layanan.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">6. Hukum yang Berlaku</h2>
          <p>
            Ketentuan ini akan diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia, tanpa memperhatikan pertentangan ketentuan hukumnya.
          </p>

           <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">7. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Ketentuan ini, silakan hubungi kami di:
            <a href="mailto:legal@inamarket.com" className="text-primary hover:underline ml-2">legal@inamarket.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
