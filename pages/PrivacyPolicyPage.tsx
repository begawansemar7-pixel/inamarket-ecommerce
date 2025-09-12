import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Kebijakan Privasi</h1>
          <p className="mt-4 text-gray-500">Terakhir diperbarui: 2 Agustus 2024</p>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            Selamat datang di INAMarket. Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda saat Anda mengunjungi platform kami.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            Kami dapat mengumpulkan informasi tentang Anda dalam berbagai cara. Informasi yang dapat kami kumpulkan di Situs meliputi:
          </p>
          <ul>
            <li><strong>Data Pribadi:</strong> Informasi yang dapat diidentifikasi secara pribadi, seperti nama, alamat pengiriman, alamat email, dan nomor telepon, yang Anda berikan secara sukarela kepada kami saat mendaftar atau saat memilih untuk berpartisipasi dalam berbagai aktivitas yang berkaitan dengan Situs, seperti obrolan online dan papan pesan.</li>
            <li><strong>Data Derivatif:</strong> Informasi yang dikumpulkan server kami secara otomatis saat Anda mengakses Situs, seperti alamat IP Anda, jenis browser Anda, sistem operasi Anda, waktu akses Anda, dan halaman yang telah Anda lihat secara langsung sebelum dan sesudah mengakses Situs.</li>
            <li><strong>Data Keuangan:</strong> Informasi terkait keuangan, seperti data yang berkaitan dengan metode pembayaran Anda (misalnya nomor kartu kredit yang valid, merek kartu, tanggal kedaluwarsa) yang mungkin kami kumpulkan saat Anda membeli, memesan, mengembalikan, atau meminta informasi tentang layanan kami dari Situs. Kami hanya menyimpan sedikit, jika ada, informasi keuangan yang kami kumpulkan.</li>
          </ul>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>
            Memiliki informasi yang akurat tentang Anda memungkinkan kami untuk memberikan Anda pengalaman yang lancar, efisien, dan disesuaikan. Secara khusus, kami dapat menggunakan informasi yang dikumpulkan tentang Anda melalui Situs untuk:
          </p>
          <ul>
            <li>Membuat dan mengelola akun Anda.</li>
            <li>Memproses pembayaran dan pengembalian dana Anda.</li>
            <li>Mengirimkan email kepada Anda mengenai akun atau pesanan Anda.</li>
            <li>Memungkinkan komunikasi antar pengguna.</li>
            <li>Memantau dan menganalisis penggunaan dan tren untuk meningkatkan pengalaman Anda dengan Situs.</li>
          </ul>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">3. Keamanan Informasi Anda</h2>
          <p>
            Kami menggunakan langkah-langkah keamanan administratif, teknis, dan fisik untuk membantu melindungi informasi pribadi Anda. Meskipun kami telah mengambil langkah-langkah yang wajar untuk mengamankan informasi pribadi yang Anda berikan kepada kami, perlu diketahui bahwa terlepas dari upaya kami, tidak ada langkah-langkah keamanan yang sempurna atau tidak dapat ditembus, dan tidak ada metode transmisi data yang dapat dijamin terhadap intersepsi atau jenis penyalahgunaan lainnya.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">4. Perubahan pada Kebijakan Privasi Ini</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan, misalnya, perubahan pada praktik kami atau karena alasan operasional, hukum, atau peraturan lainnya. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.
          </p>
          
          <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">5. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini, silakan hubungi kami di:
            <a href="mailto:privacy@inamarket.com" className="text-primary hover:underline ml-2">privacy@inamarket.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
