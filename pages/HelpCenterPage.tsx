import React from 'react';
import { ChevronDownIcon } from '../components/icons/Icons';

const faqs = {
  'Untuk Pembeli': [
    {
      question: 'Bagaimana cara melacak pesanan saya?',
      answer: 'Anda dapat melacak pesanan Anda melalui halaman "Profil" > "Riwayat Transaksi". Klik pada pesanan yang ingin Anda lacak untuk melihat status pengiriman terkini.',
    },
    {
      question: 'Apa saja metode pembayaran yang diterima?',
      answer: 'Kami menerima pembayaran melalui Bank Transfer (Virtual Account) dan QRIS. Kami akan terus menambahkan metode pembayaran lainnya di masa mendatang.',
    },
    {
      question: 'Bagaimana cara mengajukan pengembalian dana?',
      answer: 'Jika produk yang Anda terima tidak sesuai, rusak, atau tidak lengkap, Anda dapat mengajukan pengembalian dana melalui pusat resolusi kami dalam waktu 2x24 jam setelah produk diterima. Hubungi Customer Service kami untuk bantuan lebih lanjut.',
    },
  ],
  'Untuk Penjual': [
    {
      question: 'Bagaimana cara mulai berjualan di INAMarket?',
      answer: 'Sangat mudah! Cukup daftar sebagai "Penjual", lengkapi profil toko Anda, dan Anda bisa langsung mulai mengunggah produk pertama Anda melalui Dasbor Penjual.',
    },
    {
      question: 'Bagaimana cara menarik dana penjualan?',
      answer: 'Dana dari penjualan yang telah selesai akan masuk ke Saldo Penjual Anda. Anda dapat mengajukan penarikan dana ke rekening bank yang terdaftar kapan saja melalui menu "Saldo" di Dasbor Penjual.',
    },
    {
        question: 'Apakah ada biaya atau komisi penjualan?',
        answer: 'Saat ini, INAMarket tidak membebankan biaya komisi untuk penjualan. Namun, mungkin ada biaya layanan yang dikenakan oleh penyedia pembayaran pihak ketiga. Kami akan selalu memberitahukan jika ada perubahan kebijakan.',
    },
  ],
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <details className="group border-b pb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-gray-800">
            {question}
            <ChevronDownIcon className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <p className="mt-2 text-gray-600 leading-relaxed">
            {answer}
        </p>
    </details>
);

const HelpCenterPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pusat Bantuan</h1>
            <p className="mt-4 text-lg text-gray-600">
                Kami siap membantu. Temukan jawaban atas pertanyaan Anda di sini.
            </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
            {Object.entries(faqs).map(([category, items]) => (
                <div key={category} className="mb-10">
                    <h2 className="text-2xl font-bold text-primary-dark mb-4 border-l-4 border-primary pl-3">{category}</h2>
                    <div className="space-y-4">
                        {items.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Tidak menemukan jawaban?</h3>
            <p className="mt-2 text-gray-600">
                Tim Customer Service kami siap membantu Anda.
            </p>
            <a href="mailto:support@inamarket.com" className="mt-4 inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition-colors">
                Hubungi Kami
            </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
