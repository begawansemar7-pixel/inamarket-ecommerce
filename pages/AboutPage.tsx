import React from 'react';
import { SparklesIcon, UserCircleIcon } from '../components/icons/Icons';

const teamMembers = [
  { name: 'Andi Pratama', role: 'Chief Executive Officer', imageUrl: 'https://picsum.photos/seed/team1/200/200' },
  { name: 'Siti Aminah', role: 'Chief Technology Officer', imageUrl: 'https://picsum.photos/seed/team2/200/200' },
  { name: 'Budi Santoso', role: 'Head of Marketing', imageUrl: 'https://picsum.photos/seed/team3/200/200' },
  { name: 'Dewi Lestari', role: 'Head of Operations', imageUrl: 'https://picsum.photos/seed/team4/200/200' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <img
          src="https://picsum.photos/seed/about-hero/1600/800"
          alt="UMKM Indonesia"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-step-in">Tentang INAMarket</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto animate-step-in" style={{ animationDelay: '0.2s' }}>
            Memberdayakan Usaha Mikro, Kecil, dan Menengah (UMKM) di seluruh Indonesia untuk tumbuh dan bersinar di panggung digital.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cerita Kami</h2>
            <p className="mt-6 text-gray-600">
              INAMarket lahir dari semangat untuk melihat produk-produk lokal Indonesia menjadi tuan rumah di negerinya sendiri. Kami melihat potensi luar biasa dari para pengrajin, produsen kuliner, dan penyedia jasa di seluruh pelosok negeri yang karyanya layak mendapatkan apresiasi lebih luas.
            </p>
            <p className="mt-4 text-gray-600">
              Oleh karena itu, kami membangun sebuah platform yang tidak hanya berfungsi sebagai marketplace, tetapi juga sebagai rumah bagi para pelaku UMKM. Sebuah tempat di mana mereka dapat dengan mudah memasarkan produk, berinteraksi dengan pelanggan, dan mengembangkan usaha mereka dengan dukungan teknologi terkini.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/seed/about-story/600/400" alt="Founder" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Misi Kami</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Kami berkomitmen untuk menjadi jembatan antara UMKM Indonesia dengan pasar yang lebih luas melalui tiga pilar utama.
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="p-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light/20 text-primary-dark mx-auto">
                          <SparklesIcon className="h-6 w-6"/>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-gray-900">Teknologi Inovatif</h3>
                      <p className="mt-2 text-gray-600">Menyediakan alat canggih seperti AI-powered Description Generator untuk memudahkan penjual membuat deskripsi produk yang menarik.</p>
                  </div>
                   <div className="p-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light/20 text-primary-dark mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                          </svg>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-gray-900">Komunitas & Dukungan</h3>
                      <p className="mt-2 text-gray-600">Membangun komunitas penjual yang solid dan menyediakan pusat bantuan untuk menjawab setiap tantangan yang dihadapi.</p>
                  </div>
                   <div className="p-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light/20 text-primary-dark mx-auto">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                          </svg>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-gray-900">Pertumbuhan Berkelanjutan</h3>
                      <p className="mt-2 text-gray-600">Mendorong pertumbuhan bisnis UMKM secara berkelanjutan agar dapat bersaing di pasar nasional maupun global.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Team Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tim Kami</h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Di balik INAMarket, ada tim yang bersemangat dan berdedikasi.
          </p>
          <div className="mt-12 grid gap-10 grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((person) => (
              <div key={person.name} className="text-center">
                <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt={person.name} />
                <h3 className="mt-4 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;